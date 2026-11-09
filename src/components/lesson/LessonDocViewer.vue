<script setup lang="ts">
import { marked } from 'marked'
import { onMounted, ref, watch } from 'vue'

const props = defineProps<{
  loader: () => Promise<string>
}>()

const html = ref<string>('')
const loading = ref<boolean>(false)
const errorMessage = ref<string>('')

async function loadDoc(): Promise<void> {
  loading.value = true
  errorMessage.value = ''

  try {
    const markdown = await props.loader()
    html.value = await marked.parse(markdown)
  } catch (error: unknown) {
    errorMessage.value = error instanceof Error ? error.message : '文档加载失败'
    html.value = ''
  } finally {
    loading.value = false
  }
}

onMounted((): void => {
  void loadDoc()
})

watch(
  () => props.loader,
  (): void => {
    void loadDoc()
  }
)
</script>

<template>
  <div class="doc-viewer">
    <p v-if="loading" class="doc-viewer__state">正在加载文档…</p>
    <p v-else-if="errorMessage" class="doc-viewer__state is-error">{{ errorMessage }}</p>
    <article v-else class="doc-viewer__content markdown-body" v-html="html" />
  </div>
</template>

<style scoped>
.doc-viewer {
  flex: 1;
  min-height: 0;
  overflow: auto;
  padding: 0 16px 24px;
}

.doc-viewer__state {
  margin: 24px 0 0;
  color: var(--text-muted);
  font-size: 13px;
}

.doc-viewer__state.is-error {
  color: #9a3412;
}

.doc-viewer__content {
  color: var(--text);
  font-size: 13px;
  line-height: 1.7;
}

.doc-viewer__content :deep(h1),
.doc-viewer__content :deep(h2),
.doc-viewer__content :deep(h3),
.doc-viewer__content :deep(h4) {
  margin: 1.4em 0 0.6em;
  line-height: 1.35;
}

.doc-viewer__content :deep(h1) {
  font-size: 1.45rem;
}

.doc-viewer__content :deep(h2) {
  font-size: 1.2rem;
}

.doc-viewer__content :deep(h3) {
  font-size: 1.05rem;
}

.doc-viewer__content :deep(p),
.doc-viewer__content :deep(ul),
.doc-viewer__content :deep(ol),
.doc-viewer__content :deep(table),
.doc-viewer__content :deep(pre),
.doc-viewer__content :deep(blockquote) {
  margin: 0.75em 0;
}

.doc-viewer__content :deep(ul),
.doc-viewer__content :deep(ol) {
  padding-left: 1.25em;
}

.doc-viewer__content :deep(a) {
  color: var(--accent);
}

.doc-viewer__content :deep(code) {
  padding: 0.1em 0.35em;
  border-radius: 6px;
  background: var(--bg-panel-muted);
  font-size: 0.92em;
}

.doc-viewer__content :deep(pre) {
  overflow: auto;
  padding: 12px 14px;
  border-radius: 10px;
  background: #1c232b;
  color: #e8eef5;
}

.doc-viewer__content :deep(pre code) {
  padding: 0;
  background: transparent;
  color: inherit;
}

.doc-viewer__content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: 10px;
}

.doc-viewer__content :deep(th),
.doc-viewer__content :deep(td) {
  padding: 8px 10px;
  border-bottom: 1px solid var(--border);
  text-align: left;
  vertical-align: top;
}

.doc-viewer__content :deep(th) {
  background: var(--bg-panel-muted);
}

.doc-viewer__content :deep(blockquote) {
  margin-left: 0;
  padding: 8px 12px;
  border-left: 3px solid var(--accent);
  background: rgba(15, 107, 92, 0.06);
}

.doc-viewer__content :deep(hr) {
  border: none;
  border-top: 1px solid var(--border);
  margin: 1.5em 0;
}
</style>
