<script setup lang="ts">
</script>

<template>
  <header class="app-header">
    <div class="app-header__brand">
      <span class="app-header__mark" aria-hidden="true" />
      <div>
        <p class="app-header__title">Three.js Day Day Up</p>
        <p class="app-header__subtitle">168 天 Web 3D 学习工作台</p>
      </div>
    </div>
    <div class="app-header__meta">
      <span>Vue 3 · TypeScript · Three.js</span>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  height: var(--header-height);
  padding: 0 24px;
  border-bottom: 1px solid var(--border);
  background: rgba(255, 250, 242, 0.9);
  backdrop-filter: blur(10px);
}

.app-header__brand {
  display: flex;
  align-items: center;
  gap: 14px;
}

.app-header__mark {
  width: 14px;
  height: 36px;
  border-radius: 999px;
  background: linear-gradient(180deg, #1aa58c 0%, #0f6b5c 100%);
  box-shadow: 0 8px 18px rgba(15, 107, 92, 0.28);
}

.app-header__title {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.app-header__subtitle {
  margin: 2px 0 0;
  color: var(--text-muted);
  font-size: 13px;
}

.app-header__meta {
  color: var(--text-muted);
  font-size: 13px;
}

@media (max-width: 720px) {
  .app-header__meta {
    display: none;
  }
}
</style>
