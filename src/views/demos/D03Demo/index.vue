<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from "vue";
import * as THREE from "three";
import { ThreeManager } from "@/three/core/ThreeManager";

const container = ref<HTMLElement | null>(null);
let manager: ThreeManager | null = null;
let cube: THREE.Mesh | null = null;

onMounted(() => {
    if (!container.value) return;
    // 创建 Three.js 管理器
    manager = new ThreeManager(container.value);
    // 创建几何体
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    // 创建材质
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // 创建 Mesh
    cube = new THREE.Mesh(geometry, material);
    // 添加到场景
    manager.add(cube);
    // 开始渲染
    manager.start();
});

onBeforeUnmount(() => {
    manager?.dispose();
    manager = null;
    cube = null;
});
</script>

<template>
    <div ref="container" class="three-container"></div>
</template>

<style scoped>
.three-viewport {
    width: 100%;
    height: 500px;
    overflow: hidden;
}

.three-viewport :deep(canvas) {
    display: block;
    width: 100%;
    height: 100%;
}
</style>
