import type { LessonMeta } from "@/types/lesson";

/**
 * 课程注册表
 * 新增一天时：补文档、补 Demo 组件、再在此登记
 */
export const LESSONS: LessonMeta[] = [
    {
        day: 1,
        slug: "d01",
        title: "认识 Three.js",
        summary: "WebGL 与 Three.js 的关系，以及 Web 3D 渲染的基本原理",
        doc: async (): Promise<string> => {
            const module = await import("../../docs/D01-认识Threejs.md?raw");
            return module.default;
        },
        demo: () => import("@/views/demos/D01Demo/index.vue"),
    },
    {
        day: 2,
        slug: "d02",
        title: "Three.js 渲染原理与场景树",
        summary: "从 Scene Graph 到 GPU：理解一个 3D 场景是如何被组织和绘制的",
        doc: async (): Promise<string> => {
            const module = await import("../../docs/D02-Three.js渲染原理与场景树.md?raw");
            return module.default;
        },
        demo: () => import("@/views/demos/D02Demo/index.vue"),
    },
    {
        day: 3,
        slug: "d03",
        title: "Three.js 项目初始化与开发环境",
        summary: "从零搭建 Vue 3 + TypeScript + Vite + Three.js 工程",
        doc: async (): Promise<string> => {
            const module = await import("../../docs/D03-Threejs项目初始化与开发环境.md?raw");
            return module.default;
        },
        demo: () => import("@/views/demos/D03Demo/index.vue"),
    },
];

export function getLessonByDay(day: number): LessonMeta | undefined {
    return LESSONS.find(lesson => lesson.day === day);
}

export function getLessonBySlug(slug: string): LessonMeta | undefined {
    return LESSONS.find(lesson => lesson.slug === slug);
}
