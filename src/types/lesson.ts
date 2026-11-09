import type { Component } from 'vue'

export interface LessonMeta {
  day: number
  slug: string
  title: string
  summary: string
  doc: () => Promise<string>
  demo: () => Promise<{ default: Component }>
}
