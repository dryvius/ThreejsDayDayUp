import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
  type CSSProperties,
  type Ref
} from 'vue'

export interface HorizontalSplitOptions {
  initialWidth?: number
  minWidth?: number
  minRightWidth?: number
  splitterWidth?: number
  stackBreakpoint?: number
  storageKey?: string
}

interface HorizontalSplitReturn {
  sidebarWidth: Ref<number>
  isDragging: Ref<boolean>
  isStacked: Ref<boolean>
  bodyStyle: Ref<CSSProperties>
  startDrag: (event: PointerEvent) => void
}

function readStoredWidth(storageKey: string | undefined, fallback: number): number {
  if (!storageKey || typeof window === 'undefined') {
    return fallback
  }

  const raw = window.localStorage.getItem(storageKey)
  const parsed = raw === null ? Number.NaN : Number(raw)

  return Number.isFinite(parsed) ? parsed : fallback
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

function notifyLayoutResize(): void {
  window.dispatchEvent(new Event('resize'))
}

export function useHorizontalSplit(
  options: HorizontalSplitOptions = {}
): HorizontalSplitReturn {
  const {
    initialWidth = 340,
    minWidth = 240,
    minRightWidth = 320,
    splitterWidth = 6,
    stackBreakpoint = 900,
    storageKey = 'threejs-day-day-up:sidebar-width'
  } = options

  const sidebarWidth = ref<number>(readStoredWidth(storageKey, initialWidth))
  const isDragging = ref<boolean>(false)
  const isStacked = ref<boolean>(false)

  const bodyStyle = computed<CSSProperties>(() => {
    if (isStacked.value) {
      return {}
    }

    return {
      gridTemplateColumns: `${sidebarWidth.value}px ${splitterWidth}px minmax(0, 1fr)`
    }
  })

  let activePointerId: number | null = null
  let containerLeft = 0
  let containerWidth = 0
  let mediaQuery: MediaQueryList | null = null

  function persistWidth(width: number): void {
    if (!storageKey) {
      return
    }

    window.localStorage.setItem(storageKey, String(Math.round(width)))
  }

  function getMaxSidebarWidth(totalWidth: number): number {
    return Math.max(minWidth, totalWidth - minRightWidth - splitterWidth)
  }

  function clampSidebarWidth(totalWidth = window.innerWidth): void {
    if (isStacked.value) {
      return
    }

    const nextWidth = clamp(sidebarWidth.value, minWidth, getMaxSidebarWidth(totalWidth))

    if (nextWidth !== sidebarWidth.value) {
      sidebarWidth.value = nextWidth
      notifyLayoutResize()
    }
  }

  function updateWidth(clientX: number): void {
    const nextWidth = clamp(
      clientX - containerLeft,
      minWidth,
      getMaxSidebarWidth(containerWidth)
    )

    if (nextWidth === sidebarWidth.value) {
      return
    }

    sidebarWidth.value = nextWidth
    notifyLayoutResize()
  }

  function stopDrag(event?: PointerEvent): void {
    if (!isDragging.value) {
      return
    }

    if (
      event &&
      activePointerId !== null &&
      event.pointerId !== activePointerId
    ) {
      return
    }

    isDragging.value = false
    activePointerId = null
    document.body.style.cursor = ''
    document.body.style.userSelect = ''

    window.removeEventListener('pointermove', handlePointerMove)
    window.removeEventListener('pointerup', handlePointerUp)
    window.removeEventListener('pointercancel', handlePointerUp)

    persistWidth(sidebarWidth.value)
    notifyLayoutResize()
  }

  function handlePointerMove(event: PointerEvent): void {
    if (!isDragging.value || event.pointerId !== activePointerId) {
      return
    }

    updateWidth(event.clientX)
  }

  function handlePointerUp(event: PointerEvent): void {
    stopDrag(event)
  }

  function startDrag(event: PointerEvent): void {
    if (isStacked.value || event.button !== 0) {
      return
    }

    const target = event.currentTarget
    if (!(target instanceof HTMLElement)) {
      return
    }

    const body = target.parentElement
    if (!body) {
      return
    }

    const rect = body.getBoundingClientRect()
    containerLeft = rect.left
    containerWidth = rect.width
    activePointerId = event.pointerId
    isDragging.value = true

    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)
    window.addEventListener('pointercancel', handlePointerUp)

    target.setPointerCapture(event.pointerId)
    updateWidth(event.clientX)
  }

  function syncStackedState(): void {
    const nextStacked = window.innerWidth <= stackBreakpoint

    if (nextStacked === isStacked.value) {
      if (!nextStacked) {
        clampSidebarWidth(window.innerWidth)
      }
      return
    }

    isStacked.value = nextStacked

    if (nextStacked) {
      stopDrag()
    } else {
      clampSidebarWidth(window.innerWidth)
    }

    notifyLayoutResize()
  }

  function handleWindowResize(): void {
    syncStackedState()
    clampSidebarWidth(window.innerWidth)
  }

  function handleMediaChange(): void {
    syncStackedState()
  }

  onMounted((): void => {
    mediaQuery = window.matchMedia(`(max-width: ${stackBreakpoint}px)`)
    syncStackedState()
    clampSidebarWidth(window.innerWidth)

    window.addEventListener('resize', handleWindowResize)
    mediaQuery.addEventListener('change', handleMediaChange)
  })

  onBeforeUnmount((): void => {
    stopDrag()
    window.removeEventListener('resize', handleWindowResize)
    mediaQuery?.removeEventListener('change', handleMediaChange)
  })

  return {
    sidebarWidth,
    isDragging,
    isStacked,
    bodyStyle,
    startDrag
  }
}
