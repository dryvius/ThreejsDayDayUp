<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue'
import LessonSidebar from '@/components/layout/LessonSidebar.vue'
import { useHorizontalSplit } from '@/composables/useHorizontalSplit'

const { isDragging, bodyStyle, startDrag } = useHorizontalSplit({
  initialWidth: 340,
  minWidth: 240,
  minRightWidth: 320
})
</script>

<template>
  <div class="main-layout">
    <AppHeader />
    <div
      class="main-layout__body"
      :class="{ 'is-dragging': isDragging }"
      :style="bodyStyle"
    >
      <LessonSidebar class="main-layout__sidebar" />

      <div
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
}

.main-layout__body {
  display: grid;
  grid-template-columns: var(--sidebar-width) 6px minmax(0, 1fr);
  flex: 1;
  min-height: 0;
  height: calc(100vh - var(--header-height));
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
  background: var(--bg-demo);
}

@media (max-width: 900px) {
  .main-layout__body {
    grid-template-columns: 1fr !important;
    grid-template-rows: minmax(240px, 38vh) 0 minmax(0, 1fr);
    height: auto;
    min-height: calc(100vh - var(--header-height));
  }

  .main-layout__splitter {
    display: none;
  }

  .main-layout__sidebar {
    border-bottom: 1px solid var(--border);
  }
}
</style>
