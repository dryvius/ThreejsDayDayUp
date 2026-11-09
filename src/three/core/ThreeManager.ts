/**
 * 核心模块，主要负责管理：
 * - Scene
 * - Camera
 * - Renderer
 * - 动画循环
 * - 尺寸变化
 * - 资源销毁
 *
 * 通过使用该核心模块，就不需要 Vue 组件直接管理所有底层细节
 */

import * as THREE from "three";

export class ThreeManager {
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;

    private animationId = 0;
    private resizeObserver: ResizeObserver | null = null;
    private container: HTMLElement;

    // 是否已销毁
    private isDisposed = false;

    constructor(container: HTMLElement) {
        this.container = container;

        const width = container.clientWidth;
        const height = container.clientHeight;
        if (!width || !height) {
            throw new Error("Three js 容器尺寸不能为 0");
        }

        // 1. 场景
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x17212b);

        // 2. 相机
        this.camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
        this.camera.position.set(3, 3, 5);
        this.camera.lookAt(0, 0, 0);

        // 3. 渲染器
        this.renderer = new THREE.WebGLRenderer({
            antialias: true, // 开启抗锯齿
        });
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setSize(width, height);

        // 4. 添加渲染器 DOM 元素到容器
        this.container.appendChild(this.renderer.domElement);

        // 5. 添加监听器
        this.resizeObserver = new ResizeObserver(() => this.resize());
        this.resizeObserver.observe(this.container);
    }

    // 添加对象到场景
    add(object: THREE.Object3D) {
        this.scene.add(object);
    }

    // 调整场景尺寸
    resize() {
        if (this.isDisposed) return;

        const width = this.container.clientWidth;
        const height = this.container.clientHeight;
        if (!width || !height) return;

        // 更新相机纵横比
        this.camera.aspect = width / height;
        // 修改 PerspectiveCamera 的 aspect 后，需要更新相机投影矩阵，否则新宽高比不会正确应用到相机投影中
        this.camera.updateProjectionMatrix();

        // 更新渲染器尺寸
        this.renderer.setSize(width, height);
    }

    // 启动动画循环
    start() {
        if (this.isDisposed) return;

        const animate = () => {
            if (this.isDisposed) return;
            this.animationId = requestAnimationFrame(animate);
            this.renderer.render(this.scene, this.camera);
        };
        animate();
    }

    // 销毁 Three js 实例
    dispose() {
        if (this.isDisposed) return;
        this.isDisposed = true;

        cancelAnimationFrame(this.animationId);
        this.resizeObserver?.disconnect();
        this.resizeObserver = null;

        this.scene.traverse(child => {
            if (child instanceof THREE.Mesh) {
                child.geometry.dispose();
                const materials = Array.isArray(child.material) ? child.material : [child.material];
                materials.forEach(material => {
                    if (material instanceof THREE.Material) {
                        material.dispose();
                    }
                });
            }
        });

        this.renderer.dispose();
        (this, this.renderer.domElement.remove());
    }
}
