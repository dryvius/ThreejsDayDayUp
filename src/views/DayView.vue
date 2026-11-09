<script setup lang="ts">
import { computed, defineAsyncComponent, shallowRef, watch, type Component } from 'vue'
import { getLessonByDay } from '@/constants/lessons'

const props = defineProps<{
  day: string | number
}>()

const lesson = computed(() => {
  const dayNumber = Number(props.day)
  return Number.isFinite(dayNumber) ? getLessonByDay(dayNumber) : undefined
})

const demoComponent = shallowRef<Component | null>(null)

watch(
  lesson,
  (currentLesson): void => {
    if (!currentLesson) {
      demoComponent.value = null
      return
    }

    demoComponent.value = defineAsyncComponent(currentLesson.demo)
  },
  { immediate: true }
)
</script>

<template>
  <section class="day-view">
    <div v-if="!lesson" class="day-view__empty">
      <h2>未找到对应课程</h2>
      <p>请检查课程注册表或路由参数。</p>
    </div>

    <component :is="demoComponent" v-else class="day-view__demo" />
  </section>
</template>

<style scoped>
.day-view {
  width: 100%;
  height: 100%;
  min-height: 0;
}

.day-view__demo {
  width: 100%;
  height: 100%;
}

.day-view__empty {
  display: grid;
  place-content: center;
  height: 100%;
  padding: 24px;
  color: #d7dee7;
  text-align: center;
}

.day-view__empty h2 {
  margin: 0 0 8px;
  font-size: 20px;
}

.day-view__empty p {
  margin: 0;
  color: #93a0ae;
}
</style>
