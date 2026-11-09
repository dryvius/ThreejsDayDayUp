<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue'
import LessonSidebar from '@/components/layout/LessonSidebar.vue'
import { useHorizontalSplit } from '@/composables/useHorizontalSplit'

const { isDragging, isStacked, bodyStyle, startDrag } = useHorizontalSplit({
  initialWidth: 340,
  minWidth: 240,
  minRightWidth: 320,
  stackBreakpoint: 900
})
</script>

<template>
  <div class="main-layout">
    <AppHeader />
    <div
      class="main-layout__body"
      :class="{
        'is-dragging': isDragging,
        'is-stacked': isStacked
      }"
      :style="bodyStyle"
    >
      <LessonSidebar class="main-layout__sidebar" />

      <div
        v-show="!isStacked"
        class="main-layout__splitter"
        role="separator"
        aria-orientation="vertical"
        aria-label="调整左右栏宽度"
        tabindex="0"
        @pointerdown="startDrag"
      >
        <span class="main-layout__splitter-grip" aria-hidden="true" />
      </div>

      <main class="main-layout__content">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped>
.main-layout {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  overflow: hidden;
}

.main-layout__body {
  display: grid;
  grid-template-columns: var(--sidebar-width) 6px minmax(0, 1fr);
  flex: 1;
  min-width: 0;
  min-height: 0;
  height: calc(100vh - var(--header-height));
  overflow: hidden;
}

.main-layout__body.is-dragging {
  cursor: col-resize;
}

.main-layout__body.is-dragging .main-layout__content {
  pointer-events: none;
}

.main-layout__sidebar {
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  background: rgba(255, 250, 242, 0.92);
  backdrop-filter: blur(8px);
}

.main-layout__splitter {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 6px;
  margin: 0;
  border: none;
  border-left: 1px solid var(--border);
  border-right: 1px solid transparent;
  background: rgba(255, 250, 242, 0.92);
  cursor: col-resize;
  touch-action: none;
  transition: background 0.15s ease, border-color 0.15s ease;
}

.main-layout__splitter:hover,
.main-layout__splitter:focus-visible,
.main-layout__body.is-dragging .main-layout__splitter {
  border-right-color: rgba(15, 107, 92, 0.35);
  background: var(--accent-soft);
  outline: none;
}

.main-layout__splitter-grip {
  width: 2px;
  height: 28px;
  border-radius: 999px;
  background: rgba(15, 107, 92, 0.45);
}

.main-layout__content {
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  background: var(--bg-demo);
}

/* 窄屏：上下堆叠，两侧都保持在视口内可见 */
.main-layout__body.is-stacked {
  grid-template-columns: 1fr;
  grid-template-rows: minmax(220px, 38%) minmax(280px, 62%);
}

.main-layout__body.is-stacked .main-layout__sidebar {
  border-bottom: 1px solid var(--border);
}
</style>
