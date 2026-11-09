<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from "vue";
import * as THREE from "three";

const container = ref<HTMLDivElement | null>(null);

let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;

let buildingGroup: THREE.Group;
let roadGroup: THREE.Group;
let vehicleGroup: THREE.Group;

let animationId = 0;

// 创建建筑物工厂函数
function createBuilding(x: number, z: number, height: number, color: number) {
    const geometry = new THREE.BoxGeometry(2, height, 2);
    const material = new THREE.MeshBasicMaterial({
        color,
    });

    const building = new THREE.Mesh(geometry, material);
    // 由于 BoxGeometry 默认以自身中心为原点，如果高度为 4，则中心点在 2 处，所以需要设置为 height / 2，保证底部正好位于地面 y = 0 处
    building.position.set(x, height / 2, z);

    return building;
}

// 创建道路工厂函数
function createRoad(x: number, z: number, width: number, height: number, depth: number, color: number) {
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshBasicMaterial({
        color,
    });

    const road = new THREE.Mesh(geometry, material);
    road.position.set(x, height / 2, z);

    return road;
}

function initThree() {
    if (!container.value) return;

    const width = container.value.clientWidth;
    const height = container.value.clientHeight;

    // 1. 创建场景
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x17212b);

    // 2. 创建相机
    camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(12, 10, 16);
    camera.lookAt(0, 0, 0);

    // 3. 创建渲染器
    renderer = new THREE.WebGLRenderer({
        antialias: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.value.appendChild(renderer.domElement);

    // 4. 创建地面
    const groundGeometry = new THREE.BoxGeometry(20, 0.2, 20);
    const groundMaterial = new THREE.MeshBasicMaterial({
        color: 0x34495e,
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.position.y = -0.1;
    scene.add(ground);

    // 5. 创建建筑分组
    buildingGroup = new THREE.Group();
    buildingGroup.name = "BuildingGroup";
    buildingGroup.add(
        createBuilding(-4, -3, 4, 0x3498db),
        createBuilding(0, -3, 7, 0x2ecc71),
        createBuilding(4, -3, 5, 0xe67e22),
    );
    scene.add(buildingGroup);

    // 6. 创建道路分组
    roadGroup = new THREE.Group();
    roadGroup.name = "RoadGroup";
    roadGroup.add(createRoad(0, 0, 20, 0.2, 1, 0x808080), createRoad(2, 0, 1, 0.2, 20, 0x800000));
    scene.add(roadGroup);

    // 7. 创建车辆分组
    vehicleGroup = new THREE.Group();
    vehicleGroup.name = "VehicleGroup";
    const carBody = new THREE.Mesh(
        new THREE.BoxGeometry(2, 0.2, 1),
        new THREE.MeshBasicMaterial({
            color: 0xff4757,
        }),
    );
    carBody.position.y = 0.4;
    vehicleGroup.add(carBody);
    vehicleGroup.position.set(0, 0, 3);
    scene.add(vehicleGroup);

    // 8. 创建辅助坐标轴
    const axes = new THREE.AxesHelper(5);
    scene.add(axes);

    // 9. 输出场景树信息
    console.log("Scene:", scene);
    console.log("Building parent:", buildingGroup.parent);
    console.log("Building children:", buildingGroup.children);

    // 10. 遍历整个场景（非常重要，未来加载 glb 模型时，经常需要遍历整个模型层级）
    scene.traverse(object => {
        console.log("对象名称:", object.name, "对象类型:", object.type);
    });

    animate();
}

function animate() {
    animationId = requestAnimationFrame(animate);
    // 建筑群整体缓慢旋转
    buildingGroup.rotation.y += 0.002;
    // 汽车沿 X 轴移动
    vehicleGroup.position.x = Math.sin(performance.now() * 0.001) * 4;
    renderer.render(scene, camera);
}

function handleResize() {
    if (!container.value) return;

    const width = container.value.clientWidth;
    const height = container.value.clientHeight;
    if (!width || !height) return;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
}

onMounted(() => {
    initThree();
    window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
    window.removeEventListener("resize", handleResize);
    cancelAnimationFrame(animationId);

    // 递归遍历对象及其后代（销毁资源非常重要，特别是 Three.js 的 Geometry、Material 和 Texture 等资源，不能简单认为删除 Mesh 就会自动释放所有 GPU 资源）
    scene.traverse(object => {
        if (object instanceof THREE.Mesh) {
            object.geometry.dispose();
            const materials = Array.isArray(object.material) ? object.material : [object.material];
            materials.forEach(material => material.dispose());
        }
    });

    renderer.dispose();
    renderer.domElement.remove();
});
</script>

<template>
    <div ref="container" class="three-container"></div>
</template>

<style scoped>
.three-container {
    width: 100%;
    height: 500px;
    overflow: hidden;
}

.three-container :deep(canvas) {
    display: block;
    width: 100%;
    height: 100%;
}
</style>
