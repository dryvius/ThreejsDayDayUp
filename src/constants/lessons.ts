import type { LessonMeta } from "@/types/lesson";

/**
 * 课程注册表
 * 新增一天时：补文档、补 Demo 组件、再在此登记
 */
export const LESSONS: LessonMeta[] = [
    {
        day: 1,
        slug: "d01",
        title: "认识Three.js",
        summary: "WebGL 与 Three.js 的关系，以及 Web 3D 渲染的基本原理",
        doc: async (): Promise<string> => {
            const module = await import("../../docs/D01-认识Threejs.md?raw");
            return module.default;
        },
        demo: () => import("@/views/demos/D01Demo.vue"),
    },
    {
        day: 2,
        slug: "d01",
        title: "Three.js渲染原理与场景树",
        summary: "从 Scene Graph 到 GPU：理解一个 3D 场景是如何被组织和绘制的",
        doc: async (): Promise<string> => {
            const module = await import("../../docs/D02-Three.js渲染原理与场景树.md?raw");
            return module.default;
        },
        demo: () => import("@/views/demos/D01Demo.vue"),
    },
];

export function getLessonByDay(day: number): LessonMeta | undefined {
    return LESSONS.find(lesson => lesson.day === day);
}

export function getLessonBySlug(slug: string): LessonMeta | undefined {
    return LESSONS.find(lesson => lesson.slug === slug);
}
