<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import * as THREE from "three";

const container = ref<HTMLDivElement | null>(null);

let scene: THREE.Scene | null = null;
let camera: THREE.PerspectiveCamera | null = null;
let renderer: THREE.WebGLRenderer | null = null;
let cube: THREE.Mesh | null = null;

let animationId = 0;

function initThree(): void {
    if (!container.value) {
        return;
    }

    const width = container.value.clientWidth;
    const height = container.value.clientHeight;

    // 创建场景
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x14191f);

    // 创建相机
    camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.set(0, 0, 5);

    // 创建渲染器
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.value.appendChild(renderer.domElement);

    // 创建几何体
    const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    // 创建材质
    const material = new THREE.MeshBasicMaterial({ color: 0x00aaff });
    // 创建网格
    cube = new THREE.Mesh(geometry, material);

    // 添加到场景
    scene.add(cube);

    // 开始渲染（动画）
    animate();
}

function animate(): void {
    if (!renderer || !scene || !camera || !cube) {
        return;
    }

    animationId = requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    // 渲染
    renderer.render(scene, camera);
}

function handleResize(): void {
    if (!container.value || !camera || !renderer) {
        return;
    }

    const width = container.value.clientWidth;
    const height = container.value.clientHeight;

    if (!width || !height) {
        return;
    }

    camera.aspect = width / height;
    // 更新相机投影矩阵
    camera.updateProjectionMatrix();
    // 设置渲染器大小
    renderer.setSize(width, height);
}

onMounted((): void => {
    initThree();
    window.addEventListener("resize", handleResize);
});

// 资源释放（卸载组件时）
onBeforeUnmount((): void => {
    window.removeEventListener("resize", handleResize);
    cancelAnimationFrame(animationId);

    if (cube) {
        cube.geometry.dispose();
        const material = cube.material;
        if (!Array.isArray(material)) {
            material.dispose();
        }
        scene?.remove(cube);
    }

    renderer?.dispose();
    renderer?.domElement.remove();

    renderer = null;
    scene = null;
    camera = null;
    cube = null;
});
</script>

<template>
    <div ref="container" class="demo-canvas" />
</template>

<style scoped>
.demo-canvas {
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.demo-canvas :deep(canvas) {
    display: block;
    width: 100%;
    height: 100%;
}
</style>
