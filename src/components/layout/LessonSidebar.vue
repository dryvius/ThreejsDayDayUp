<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { LESSONS, getLessonByDay } from '@/constants/lessons'
import type { LessonMeta } from '@/types/lesson'
import LessonDocViewer from '@/components/lesson/LessonDocViewer.vue'

type SidebarMode = 'list' | 'doc'

const route = useRoute()
const router = useRouter()

const mode = ref<SidebarMode>('list')
const docLesson = ref<LessonMeta | null>(null)

const currentDay = computed<number>(() => {
  const raw = Number(route.params.day)
  return Number.isFinite(raw) ? raw : LESSONS[0]?.day ?? 1
})

function selectLesson(lesson: LessonMeta): void {
  mode.value = 'list'
  docLesson.value = null
  void router.push({ name: 'day', params: { day: String(lesson.day) } })
}

function openDoc(lesson: LessonMeta, event: MouseEvent): void {
  event.stopPropagation()
  docLesson.value = lesson
  mode.value = 'doc'
  void router.push({ name: 'day', params: { day: String(lesson.day) } })
}

function backToList(): void {
  mode.value = 'list'
  docLesson.value = null
}

function formatDay(day: number): string {
  return `D${String(day).padStart(2, '0')}`
}

const activeLesson = computed<LessonMeta | undefined>(() => getLessonByDay(currentDay.value))
</script>

<template>
  <aside class="lesson-sidebar">
    <div v-show="mode === 'list'" class="lesson-sidebar__list-panel">
      <div class="lesson-sidebar__heading">
        <h2>学习列表</h2>
        <p>点击条目切换右侧 Demo；点击箭头同时打开文档并切换 Demo</p>
      </div>

      <ul class="lesson-list">
        <li
          v-for="lesson in LESSONS"
          :key="lesson.slug"
          class="lesson-list__item"
          :class="{ 'is-active': lesson.day === currentDay }"
        >
          <button
            type="button"
            class="lesson-list__main"
            @click="selectLesson(lesson)"
          >
            <span class="lesson-list__day">{{ formatDay(lesson.day) }}</span>
            <span class="lesson-list__copy">
              <span class="lesson-list__title">{{ lesson.title }}</span>
              <span class="lesson-list__summary">{{ lesson.summary }}</span>
            </span>
          </button>

          <button
            type="button"
            class="lesson-list__arrow"
            :aria-label="`打开 ${formatDay(lesson.day)} 文档`"
            @click="openDoc(lesson, $event)"
          >
            <span aria-hidden="true">›</span>
          </button>
        </li>
      </ul>

      <p v-if="activeLesson" class="lesson-sidebar__hint">
        当前选中：{{ formatDay(activeLesson.day) }} · {{ activeLesson.title }}
      </p>
    </div>

    <div v-if="mode === 'doc' && docLesson" class="lesson-sidebar__doc-panel">
      <div class="lesson-sidebar__doc-toolbar">
        <button type="button" class="back-button" @click="backToList">
          ← 返回列表
        </button>
        <div class="lesson-sidebar__doc-meta">
          <strong>{{ formatDay(docLesson.day) }}</strong>
          <span>{{ docLesson.title }}</span>
        </div>
      </div>
      <LessonDocViewer :loader="docLesson.doc" />
    </div>
  </aside>
</template>

<style scoped>
.lesson-sidebar {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
}

.lesson-sidebar__list-panel,
.lesson-sidebar__doc-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
}

.lesson-sidebar__heading {
  padding: 20px 20px 12px;
}

.lesson-sidebar__heading h2 {
  margin: 0;
  font-size: 16px;
}

.lesson-sidebar__heading p {
  margin: 6px 0 0;
  color: var(--text-muted);
  font-size: 12px;
  line-height: 1.5;
}

.lesson-list {
  list-style: none;
  margin: 0;
  padding: 0 12px 16px;
  overflow: auto;
  flex: 1;
}

.lesson-list__item {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 40px;
  gap: 4px;
  margin-bottom: 8px;
  padding: 4px;
  border: 1px solid transparent;
  border-radius: 12px;
  transition: background 0.2s ease, border-color 0.2s ease;
}

.lesson-list__item.is-active {
  border-color: rgba(15, 107, 92, 0.28);
  background: var(--accent-soft);
}

.lesson-list__main {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  width: 100%;
  padding: 10px 10px 10px 12px;
  border: none;
  border-radius: 10px;
  background: transparent;
  text-align: left;
  color: inherit;
}

.lesson-list__main:hover {
  background: rgba(28, 25, 21, 0.04);
}

.lesson-list__day {
  flex: none;
  min-width: 42px;
  color: var(--accent);
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 500;
  line-height: 1.4;
}

.lesson-list__copy {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.lesson-list__title {
  font-size: 14px;
  font-weight: 600;
}

.lesson-list__summary {
  color: var(--text-muted);
  font-size: 12px;
  line-height: 1.45;
}

.lesson-list__arrow {
  display: grid;
  place-items: center;
  width: 40px;
  border: none;
  border-radius: 10px;
  background: transparent;
  color: var(--text-muted);
  font-size: 22px;
  line-height: 1;
  transition: background 0.2s ease, color 0.2s ease;
}

.lesson-list__arrow:hover {
  background: rgba(15, 107, 92, 0.12);
  color: var(--accent);
}

.lesson-sidebar__hint {
  margin: 0;
  padding: 12px 20px 18px;
  border-top: 1px solid var(--border);
  color: var(--text-muted);
  font-size: 12px;
}

.lesson-sidebar__doc-toolbar {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px 16px 12px;
  border-bottom: 1px solid var(--border);
}

.back-button {
  width: fit-content;
  padding: 6px 10px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--bg-panel);
  color: var(--text);
}

.back-button:hover {
  border-color: rgba(15, 107, 92, 0.35);
  background: var(--accent-soft);
}

.lesson-sidebar__doc-meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.lesson-sidebar__doc-meta strong {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--accent);
}

.lesson-sidebar__doc-meta span {
  font-size: 14px;
  font-weight: 600;
}
</style>
