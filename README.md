# Three.js Day Day Up

168 天 Three.js 系统进阶训练营。目标不是只会创建几个几何体、加灯光、加载 GLB，而是真正理解 3D 图形学原理、渲染管线、场景管理、材质、动画、交互、性能优化与工程化架构，并最终具备在 **Vue 3 + TypeScript** 项目中独立设计、开发和维护 Three.js 模块的能力。

| 项目 | 说明 |
| --- | --- |
| 预计周期 | 24 周（约 6 个月） |
| 预计投入 | 约 288 小时（每周约 12 小时） |
| 学习天数 | 168 天（D01 → D168） |
| 核心阶段 | 8 个阶段：从基础到工程实战 |
| 技术栈 | Vue 3 · TypeScript · Vite · Three.js · vue-router |
| 辅助能力 | Blender 入门基础（用于模型制作与资源导出） |

---

## 快速开始

```bash
pnpm install
pnpm dev
```

浏览器打开本地开发地址后：

- **左侧**：课程列表；点击条目切换 Demo；点击箭头同时打开文档并切换 Demo
- **右侧**：当天 Three.js 渲染效果
- **中间分隔条**：可拖动调整左右宽度

新增一天课程时，按下面流程维护：

1. 在 `docs/` 新增当天 Markdown 文档
2. 在 `src/views/demos/` 新增对应 Demo 组件
3. 在 `src/constants/lessons.ts` 课程注册表中登记一条

---

## 项目结构

```text
ThreejsDayDayUp/
├── docs/                      # 每日课程文档（D01、D02…）
├── src/
│   ├── components/            # 布局与文档组件
│   ├── composables/           # 可复用逻辑（如左右分栏拖拽）
│   ├── constants/lessons.ts   # 课程注册表（手动维护）
│   ├── layouts/               # 主布局
│   ├── router/                # 路由
│   ├── views/demos/           # 每日 Demo 组件
│   └── ...
├── package.json
└── README.md
```

---

## 学习方法

本仓库把 Three.js 当作一个完整的技术进阶项目来推进，而不是零散刷 API：

| 方式 | 说明 |
| --- | --- |
| 理论学习 | 理解概念、原理与 API |
| 代码实践 | 每个知识点尽量配套可运行 Demo |
| 原理剖析 | 不只讲怎么用，也解释为什么这么用 |
| 项目驱动 | 每个阶段都有独立成果，最终完成综合 3D 项目 |
| 工程化训练 | 最终能在 Vue 3 + TypeScript 工程中独立维护 Three.js 模块 |

### 每周时间安排

| 时间 | 投入 | 内容 |
| --- | --- | --- |
| 周一至周五 | 30 分钟/天 | 概念学习 + 小型代码练习 |
| 周六、周日 | 3–4 小时/天 | 深入实践 + 阶段项目 + 复盘 |

按每周 12 小时估算，24 周约 288 小时；考虑周末弹性，实际总投入大约在 **264–312 小时**。

### 为什么是 24 周？

Three.js 是 WebGL 的高级封装，真正掌握它还需要大量计算机图形学知识。如果只花一个月背 API，常见结果是：简单场景能做，复杂项目却搞不定相机、坐标、材质、动画、性能和空间关系。24 周兼顾系统性与实际开发能力。

---

## 一、整体学习规划

```text
阶段 1  基础与 3D 数学          第 1–3 周
阶段 2  几何体、模型与场景构建    第 4–6 周
阶段 3  材质、纹理与光照         第 7–9 周
阶段 4  动画、交互与空间计算      第 10–12 周
阶段 5  高级渲染与视觉效果        第 13–15 周
阶段 6  性能优化与工程化         第 16–18 周
阶段 7  Three.js 与 Vue 3 结合  第 19–21 周
阶段 8  综合项目开发            第 22–24 周
```

---

## 二、八个阶段总览

| 阶段 | 主题 | 周次 | 核心内容 |
| --- | --- | --- | --- |
| 1 | Three.js 基础与 3D 数学 | 1–3 | 场景、相机、渲染器、坐标系、向量、矩阵、四元数 |
| 2 | 几何体、模型与场景构建 | 4–6 | Geometry、BufferGeometry、顶点、索引、法线、模型加载、层级结构 |
| 3 | 材质、纹理与光照 | 7–9 | Material、Texture、PBR、光照模型、阴影、环境贴图 |
| 4 | 动画、交互与空间计算 | 10–12 | AnimationMixer、关键帧、Raycaster、碰撞、轨迹、物理引擎 |
| 5 | 高级渲染与视觉效果 | 13–15 | Shader、GLSL、后期处理、粒子系统、实例化渲染、点云 |
| 6 | 性能优化与工程化 | 16–18 | Draw Call、LOD、Frustum Culling、资源管理、Web Worker、项目架构 |
| 7 | Three.js 与 Vue 3 深度结合 | 19–21 | 响应式封装、组件化、状态管理、事件通信、动态场景、实时数据 |
| 8 | 综合项目开发 | 22–24 | 数字孪生场景、模型管理、实时数据、交互控制、性能验收与交付 |

---

## 三、各阶段学习内容与验收

### 阶段 1：Three.js 基础与 3D 数学（第 1–3 周）

整套体系的基础阶段。

| 知识模块 | 具体知识点 |
| --- | --- |
| Three.js 基础 | Three.js 是什么、WebGL、渲染原理、安装方式、模块导入 |
| 核心三要素 | Scene、Camera、Renderer |
| 场景管理 | Scene、Object3D、Group、Scene Graph |
| 相机系统 | PerspectiveCamera、OrthographicCamera、视锥体 |
| 坐标系统 | 世界坐标、本地坐标、屏幕坐标、NDC |
| 变换系统 | Position、Rotation、Scale、Euler |
| 3D 数学 | Vector2、Vector3、Vector4、Matrix3、Matrix4 |
| 旋转原理 | 欧拉角、Quaternion、旋转顺序 |
| 辅助工具 | AxesHelper、GridHelper、CameraHelper |
| 动画循环 | requestAnimationFrame、Clock、时间增量 |

**阶段验收：3D 基础观察器**

- 创建完整 3D 场景
- 支持透视 / 正交相机切换
- 支持旋转、缩放、平移
- 可动态控制物体位置、旋转、缩放
- 能解释世界坐标与局部坐标的区别

### 阶段 2：几何体、模型与场景构建（第 4–6 周）

从使用现成几何体，进阶到自己构建三维模型。

| 知识模块 | 具体知识点 |
| --- | --- |
| 基础几何体 | BoxGeometry、SphereGeometry、PlaneGeometry、CylinderGeometry 等 |
| 高级几何体 | ExtrudeGeometry、LatheGeometry、TubeGeometry、ShapeGeometry |
| BufferGeometry | position、normal、uv、color、index |
| 顶点系统 | 顶点、三角形、面、索引缓冲区 |
| 法线 | Vertex Normal、Face Normal、法线计算 |
| UV | UV 坐标、展开、贴图映射 |
| 曲线系统 | Curve、CatmullRomCurve3、BezierCurve3 |
| 对象管理 | Mesh、Group、层级结构、父子变换 |
| 模型加载 | GLTFLoader、FBXLoader、OBJLoader |
| 模型结构 | Scene、Mesh、Bone、SkinnedMesh |
| 模型导出 | GLTFExporter、模型资源组织 |

**阶段验收：程序化低模园区**

- 用代码生成道路、地面、建筑、树木
- 支持批量创建模型
- 使用 Group 组织场景
- 支持加载 Blender 导出的 GLB
- 可点击建筑并获取模型信息

### 阶段 3：材质、纹理与光照（第 7–9 周）

决定场景是否具备真实质感的关键阶段。重点不是只会调几个材质参数，而是真正理解 **PBR**。

| 知识模块 | 具体知识点 |
| --- | --- |
| 材质基础 | Material、MeshBasicMaterial、MeshStandardMaterial |
| 材质进阶 | MeshPhongMaterial、MeshPhysicalMaterial、MeshToonMaterial |
| 材质参数 | Color、Roughness、Metalness、Opacity、Side |
| 纹理基础 | Texture、TextureLoader、UV |
| 纹理类型 | Map、NormalMap、RoughnessMap、MetalnessMap、AOMap |
| 纹理进阶 | Repeat、Offset、Rotation、Wrapping、Filtering、Mipmaps |
| 光照基础 | AmbientLight、DirectionalLight、PointLight |
| 光照进阶 | SpotLight、HemisphereLight、RectAreaLight、LightProbe |
| 阴影 | ShadowMap、CastShadow、ReceiveShadow |
| 环境光 | HDR、EnvironmentMap、PMREMGenerator |
| 色彩管理 | ColorSpace、ToneMapping、曝光、Gamma |

**阶段验收：半写实建筑展示**

- 使用 GLB + PBR 材质与多种纹理
- 使用 HDR 环境光
- 实现动态光照与阴影
- 支持材质实时切换

### 阶段 4：动画、交互与空间计算（第 10–12 周）

从静态展示进入交互式 3D 应用。

| 知识模块 | 具体知识点 |
| --- | --- |
| 基础动画 | requestAnimationFrame、DeltaTime、Clock |
| 缓动动画 | 插值、Lerp、Slerp、Tween |
| 动画系统 | AnimationClip、AnimationMixer、AnimationAction |
| 模型动画 | 骨骼动画、蒙皮、Morph Targets |
| 鼠标交互 | Raycaster、射线投射、物体拾取 |
| 拖拽控制 | DragControls、TransformControls |
| 相机控制 | OrbitControls、MapControls、FirstPersonControls |
| 空间计算 | Box3、Sphere、Ray、Plane、Frustum |
| 碰撞检测 | AABB、OBB、射线检测、碰撞体 |
| 物理引擎 | Rapier、Ammo.js、Jolt |
| 路径运动 | Curve、路径采样、切线和朝向 |

**阶段验收：3D 交互编辑器**

- 鼠标选择物体
- 支持移动、旋转、缩放
- 支持空间关系判断与基础碰撞
- 支持模型动画播放、暂停、切换

### 阶段 5：高级渲染与视觉效果（第 13–15 周）

从 Three.js 使用者进阶到 3D 可视化开发者。

| 知识模块 | 具体知识点 |
| --- | --- |
| Shader 基础 | GPU、顶点着色器、片元着色器 |
| GLSL | Attribute、Uniform、Varying |
| 着色器 | ShaderMaterial、RawShaderMaterial |
| 着色原理 | UV、坐标变换、法线、片元颜色 |
| 后期处理 | EffectComposer、RenderPass、ShaderPass |
| 常用效果 | Bloom、Outline、FXAA、SMAA、SSAO、SSR |
| 粒子系统 | Points、PointsMaterial、BufferGeometry |
| 点云 | 点云生成、模型采样、粒子动画 |
| 线条系统 | Line、LineSegments、Line2 |
| GPU 计算 | GPUComputationRenderer、计算纹理 |
| 高级效果 | 水面、烟雾、火焰、全息投影 |

**阶段验收：全息人体点云展示**

- 加载人体模型并转换为点云
- 用 Shader 控制点大小、颜色、透明度
- 添加扫描线、辉光与粒子运动
- 使用后期处理实现全息视觉效果

### 阶段 6：性能优化与工程化（第 16–18 周）

让漂亮场景也能稳定跑在真实业务项目里。

| 知识模块 | 具体知识点 |
| --- | --- |
| 渲染性能 | Draw Call、FPS、GPU、CPU 瓶颈 |
| 渲染优化 | InstancedMesh、BatchedMesh |
| 几何优化 | 合并几何体、减少顶点、索引优化 |
| 可见性 | Frustum Culling、Occlusion Culling |
| LOD | Level of Detail、动态模型切换 |
| 资源优化 | Draco、Meshopt、KTX2、纹理压缩 |
| 资源管理 | LoadingManager、资源缓存、引用计数 |
| 内存管理 | dispose、纹理释放、GPU 资源回收 |
| 异步计算 | Web Worker、OffscreenCanvas |
| 场景分块 | 空间分区、分块加载、渐进式加载 |
| 调试 | Stats、renderer.info、Spector.js |
| 工程架构 | 生命周期、模块拆分、错误处理 |

**阶段验收：大型 3D 场景性能优化**

- 创建大量建筑、树木和动态对象
- 使用 InstancedMesh 降低 Draw Call
- 使用 LOD 与视锥体剔除
- 实现按需加载与完整资源释放
- 优化前后做性能对比

### 阶段 7：Three.js 与 Vue 3 深度结合（第 19–21 周）

从技术学习过渡到前端工程实践。

| 知识模块 | 具体知识点 |
| --- | --- |
| Vue 集成 | Vue 3 + TypeScript + Three.js |
| 生命周期 | onMounted、onBeforeUnmount |
| 渲染封装 | useThree、ThreeManager |
| 组件架构 | Scene、Camera、Model、Light 模块 |
| 状态管理 | Pinia 与 3D 场景状态同步 |
| 事件系统 | Three.js 事件与 Vue 事件通信 |
| 数据驱动 | API 数据驱动 3D 场景 |
| 实时通信 | SSE、WebSocket |
| 动态渲染 | 动态创建、删除、更新 3D 对象 |
| UI 联动 | HTML 面板、CSS2DRenderer、CSS3DRenderer |
| 业务交互 | 物体选中、信息弹窗、属性编辑 |
| 工程规范 | 类型设计、资源管理、错误处理 |

**阶段验收：Vue 3 + Three.js 数字孪生平台**

- 场景与页面职责分离
- Pinia 管理业务状态
- 实时数据更新
- 点击建筑查看属性
- 设备状态驱动模型颜色变化
- 多场景模块可复用

### 阶段 8：综合项目实战（第 22–24 周）

最终项目建议：**基于 Vue 3 + TypeScript + Three.js 的 3D 数字孪生平台**。

需要整合并交付：

1. 3D 园区场景构建
2. Blender 模型导入与资源管理
3. 正交 / 透视相机切换
4. 建筑、设备、人员的选择与交互
5. 模型旋转、移动、缩放
6. PBR 材质与动态光照
7. 人员、车辆等动态动画
8. SSE / WebSocket 实时数据驱动
9. 点云与粒子效果
10. 后期处理与科技风视觉效果
11. 场景性能优化
12. 完整的 Vue 3 工程化架构

---

## 四、168 天逐日学习安排

工作日节奏建议：

| 星期 | 侧重点 |
| --- | --- |
| 周一 | 概念和原理 |
| 周二 | API 和参数 |
| 周三 | 代码实践 |
| 周四 | 深入理解和对比 |
| 周五 | 知识复盘和小测验 |
| 周六 | 3–4 小时专题实践 |
| 周日 | 3–4 小时项目实践和验收 |

### 第 1 周：Three.js 入门与环境搭建

| 日期 | 学习内容 | 当日目标 |
| --- | --- | --- |
| D01 周一 | Three.js 是什么、WebGL 与 Three.js 的关系 | 理解技术定位 |
| D02 周二 | Three.js 的运行原理和渲染流程 | 理解基本渲染过程 |
| D03 周三 | 安装 Three.js、Vite、TypeScript | 搭建项目 |
| D04 周四 | Scene、Camera、Renderer | 理解三大核心对象 |
| D05 周五 | 创建第一个 3D 场景 | 完成知识复盘 |
| D06 周六 | 深入场景、相机、渲染器配置；创建立方体、添加辅助工具 | 独立创建完整场景 |
| D07 周日 | 实现旋转立方体、调整相机和渲染尺寸；整理项目结构 | 完成第一个 Demo |

**本周成果：** 可运行、可旋转、可调整视角的 3D 场景。

### 第 2 周：相机系统与坐标变换

| 日期 | 学习内容 | 当日目标 |
| --- | --- | --- |
| D08 周一 | PerspectiveCamera 透视相机 | 理解透视投影 |
| D09 周二 | OrthographicCamera 正交相机 | 理解正交投影 |
| D10 周三 | Camera 的 position、lookAt | 控制观察位置 |
| D11 周四 | FOV、Aspect、Near、Far | 理解相机参数 |
| D12 周五 | 两种相机对比和复习 | 能够选择相机 |
| D13 周六 | 实现透视/正交相机切换；学习 OrbitControls | 完成相机控制器 |
| D14 周日 | 实现旋转、缩放、平移；添加坐标轴和网格辅助 | 完成 3D 观察器 |

**本周成果：** 支持透视和正交模式的 3D 观察器。

### 第 3 周：3D 数学基础

| 日期 | 学习内容 | 当日目标 |
| --- | --- | --- |
| D15 周一 | Vector2、Vector3 | 理解向量 |
| D16 周二 | 向量加减、长度、归一化 | 掌握向量运算 |
| D17 周三 | 点积、叉积 | 理解方向和夹角 |
| D18 周四 | Euler、Quaternion | 理解旋转 |
| D19 周五 | Matrix3、Matrix4 | 理解矩阵作用 |
| D20 周六 | 世界坐标、本地坐标、父子对象变换；矩阵变换实践 | 掌握坐标转换 |
| D21 周日 | 实现父子物体旋转、世界坐标获取、本地坐标转换 | 完成坐标系统 Demo |

**本周成果：** 能解释物体位置、方向和旋转是如何计算出来的。

### 第 4 周：基础几何体

| 日期 | 学习内容 | 当日目标 |
| --- | --- | --- |
| D22 周一 | Geometry 和 Mesh 的关系 | 理解几何体 |
| D23 周二 | BoxGeometry、SphereGeometry | 创建基础模型 |
| D24 周三 | PlaneGeometry、CircleGeometry | 创建平面 |
| D25 周四 | CylinderGeometry、ConeGeometry、TorusGeometry | 创建复杂基础形状 |
| D26 周五 | 几何体参数和构造方式复习 | 掌握常见 API |
| D27 周六 | 学习常见基础几何体，建立几何体展示库 | 创建模型展览 |
| D28 周日 | 实现参数化几何体控制面板 | 动态调整几何体参数 |

### 第 5 周：BufferGeometry 深入学习

| 日期 | 学习内容 | 当日目标 |
| --- | --- | --- |
| D29 周一 | BufferGeometry 的基本结构 | 理解底层数据 |
| D30 周二 | BufferAttribute、Float32BufferAttribute | 理解顶点属性 |
| D31 周三 | position 顶点坐标 | 手动创建顶点 |
| D32 周四 | index 索引和三角形组织 | 理解面片 |
| D33 周五 | normal、computeVertexNormals | 理解法线 |
| D34 周六 | 手动创建立方体、三角形、平面 | 实现自定义几何体 |
| D35 周日 | 创建一个程序化低模建筑生成器 | 掌握 BufferGeometry |

### 第 6 周：模型层级与外部模型加载

| 日期 | 学习内容 | 当日目标 |
| --- | --- | --- |
| D36 周一 | Object3D、Group | 理解场景树 |
| D37 周二 | Mesh、Layers、父子关系 | 掌握对象管理 |
| D38 周三 | GLTFLoader、GLB | 学习主流模型加载 |
| D39 周四 | FBXLoader、OBJLoader | 了解其他格式 |
| D40 周五 | LoadingManager、加载进度和错误处理 | 掌握资源加载 |
| D41 周六 | 加载 Blender 导出的 GLB、FBX，分析模型层级 | 掌握外部模型处理 |
| D42 周日 | 实现模型加载器：进度、替换、场景清理 | 完成模型管理 Demo |

### 第 7 周：材质系统

| 日期 | 学习内容 | 当日目标 |
| --- | --- | --- |
| D43 周一 | Material 基础 | 理解材质对象 |
| D44 周二 | MeshBasicMaterial | 理解不受光照影响的材质 |
| D45 周三 | MeshLambertMaterial、MeshPhongMaterial | 理解传统光照材质 |
| D46 周四 | MeshStandardMaterial | 理解 PBR 材质 |
| D47 周五 | MeshPhysicalMaterial | 理解高级物理材质 |
| D48 周六 | 对比材质视觉差异，研究 Roughness、Metalness | 掌握材质参数 |
| D49 周日 | 实现材质编辑器，动态调整物体材质 | 完成材质展示项目 |

### 第 8 周：纹理系统

| 日期 | 学习内容 | 当日目标 |
| --- | --- | --- |
| D50 周一 | Texture、TextureLoader | 加载纹理 |
| D51 周二 | UV 坐标 | 理解纹理映射 |
| D52 周三 | Map、NormalMap | 学习基础纹理贴图 |
| D53 周四 | RoughnessMap、MetalnessMap、AOMap | 学习 PBR 纹理 |
| D54 周五 | Repeat、Offset、Rotation、Wrapping | 掌握纹理变换 |
| D55 周六 | 纹理采样、过滤、Mipmaps、色彩空间 | 理解纹理渲染 |
| D56 周日 | 制作带有多种贴图的建筑模型 | 完成纹理展示项目 |

### 第 9 周：光照与阴影

| 日期 | 学习内容 | 当日目标 |
| --- | --- | --- |
| D57 周一 | AmbientLight、HemisphereLight | 理解环境光 |
| D58 周二 | DirectionalLight | 理解方向光 |
| D59 周三 | PointLight、SpotLight | 理解点光源和聚光灯 |
| D60 周四 | RectAreaLight、LightProbe | 了解高级光照 |
| D61 周五 | ShadowMap、CastShadow、ReceiveShadow | 理解阴影 |
| D62 周六 | HDR 环境贴图、PMREM、PBR 光照 | 掌握环境光照 |
| D63 周日 | 完整建筑展示场景：光照、阴影、环境切换 | 完成写实场景 |

### 第 10 周：动画系统

| 日期 | 学习内容 | 当日目标 |
| --- | --- | --- |
| D64 周一 | requestAnimationFrame | 理解动画循环 |
| D65 周二 | Clock、DeltaTime | 理解时间管理 |
| D66 周三 | Position、Rotation、Scale 动画 | 实现基础动画 |
| D67 周四 | Lerp、Slerp、插值 | 理解平滑运动 |
| D68 周五 | Tween 动画思想与动画复盘 | 理解缓动 |
| D69 周六 | AnimationClip、AnimationMixer、AnimationAction | 掌握动画系统 |
| D70 周日 | 加载带动画 GLB，实现播放、暂停、切换动作 | 完成动画播放器 |

### 第 11 周：交互系统

| 日期 | 学习内容 | 当日目标 |
| --- | --- | --- |
| D71 周一 | Raycaster 射线投射 | 理解拾取原理 |
| D72 周二 | 鼠标坐标转换与 NDC | 理解屏幕到 3D 的转换 |
| D73 周三 | 物体点击和悬停 | 实现选择 |
| D74 周四 | DragControls、TransformControls | 实现编辑操作 |
| D75 周五 | OrbitControls、MapControls 对比 | 理解控制器 |
| D76 周六 | 物体选中、高亮、拖拽、移动、旋转 | 完成交互编辑器 |
| D77 周日 | 对象属性面板，联动 Vue / HTML UI | 完成交互管理 Demo |

### 第 12 周：空间计算与物理引擎

| 日期 | 学习内容 | 当日目标 |
| --- | --- | --- |
| D78 周一 | Box3、Sphere | 理解包围体 |
| D79 周二 | Ray、Plane、Triangle | 理解空间几何 |
| D80 周三 | Frustum、视锥体检测 | 理解可见性判断 |
| D81 周四 | AABB、OBB | 理解碰撞边界 |
| D82 周五 | 碰撞检测原理与适用场景 | 复盘空间计算 |
| D83 周六 | 学习 Rapier：刚体、碰撞体、重力 | 接入物理引擎 |
| D84 周日 | 可交互物理场景：掉落与碰撞 | 完成物理 Demo |

### 第 13 周：Shader 与 GLSL

| 日期 | 学习内容 | 当日目标 |
| --- | --- | --- |
| D85 周一 | GPU、CPU、渲染管线 | 理解 GPU 渲染 |
| D86 周二 | Vertex Shader | 理解顶点着色器 |
| D87 周三 | Fragment Shader | 理解片元着色器 |
| D88 周四 | Uniform、Attribute、Varying | 理解着色器数据传递 |
| D89 周五 | ShaderMaterial、RawShaderMaterial | 理解 Three.js Shader 接口 |
| D90 周六 | 编写 GLSL：颜色、位置、UV 动态变化 | 完成自定义 Shader |
| D91 周日 | 扫描线、渐变、流动、基础全息材质 | 完成 Shader 效果库 |

### 第 14 周：后期处理

| 日期 | 学习内容 | 当日目标 |
| --- | --- | --- |
| D92 周一 | 什么是 Post Processing | 理解后期处理 |
| D93 周二 | EffectComposer | 理解后期处理管线 |
| D94 周三 | RenderPass、ShaderPass | 理解渲染通道 |
| D95 周四 | UnrealBloomPass | 实现辉光 |
| D96 周五 | OutlinePass、FXAA、SMAA | 实现轮廓和抗锯齿 |
| D97 周六 | SSAO、SSR、景深等效果原理与实践 | 掌握高级视觉效果 |
| D98 周日 | 科技风 3D 展示场景，组合多种后期效果 | 完成后期处理 Demo |

### 第 15 周：粒子系统与点云

| 日期 | 学习内容 | 当日目标 |
| --- | --- | --- |
| D99 周一 | Points、PointsMaterial | 理解点渲染 |
| D100 周二 | BufferGeometry 创建粒子 | 理解粒子数据结构 |
| D101 周三 | 粒子位置和颜色动态更新 | 实现粒子动画 |
| D102 周四 | Line、LineSegments、Line2 | 理解线条系统 |
| D103 周五 | MeshSurfaceSampler、模型表面采样 | 理解点云生成 |
| D104 周六 | GLB 人体模型转点云，研究采样密度与分布 | 完成人体点云 |
| D105 周日 | 粒子聚合、扩散、扫描、流动和辉光 | 完成全息点云展示 |

### 第 16 周：渲染性能优化

| 日期 | 学习内容 | 当日目标 |
| --- | --- | --- |
| D106 周一 | Draw Call、渲染批次 | 理解性能瓶颈 |
| D107 周二 | InstancedMesh | 理解实例化渲染 |
| D108 周三 | 合并几何体、BatchedMesh | 理解批量渲染 |
| D109 周四 | Frustum Culling | 理解视锥体剔除 |
| D110 周五 | LOD | 理解细节层次 |
| D111 周六 | 大量建筑/树木：普通 Mesh vs InstancedMesh | 进行性能对比 |
| D112 周日 | 动态 LOD、视锥体剔除和场景性能监控 | 完成优化 Demo |

### 第 17 周：模型和资源优化

| 日期 | 学习内容 | 当日目标 |
| --- | --- | --- |
| D113 周一 | GLB 模型结构和资源体积分析 | 理解模型优化 |
| D114 周二 | Draco、Meshopt | 学习几何压缩 |
| D115 周三 | KTX2、Basis 纹理压缩 | 学习纹理压缩 |
| D116 周四 | 纹理分辨率、贴图数量和显存 | 理解纹理成本 |
| D117 周五 | 模型优化工作流 | 建立优化思路 |
| D118 周六 | Blender 减面、贴图优化、GLB 导出 | 完成资源优化 |
| D119 周日 | Three.js 加载优化，建立压缩模型资源管线 | 完成资源加载系统 |

### 第 18 周：工程架构与内存管理

| 日期 | 学习内容 | 当日目标 |
| --- | --- | --- |
| D120 周一 | Three.js 对象生命周期 | 理解资源生命周期 |
| D121 周二 | Geometry、Material、Texture 的 dispose | 掌握资源释放 |
| D122 周三 | LoadingManager、资源缓存和复用 | 理解资源管理 |
| D123 周四 | renderer.info、Stats、Spector.js | 学习性能调试 |
| D124 周五 | 内存泄漏、事件监听、动画循环清理 | 理解常见问题 |
| D125 周六 | 设计 SceneManager、ModelManager、ResourceManager | 设计项目架构 |
| D126 周日 | 场景初始化、销毁、释放和重新加载 | 完成工程化 Demo |

### 第 19 周：Vue 3 + Three.js 集成

| 日期 | 学习内容 | 当日目标 |
| --- | --- | --- |
| D127 周一 | Vue 3 与 Three.js 的职责边界 | 设计技术架构 |
| D128 周二 | onMounted、onBeforeUnmount | 管理生命周期 |
| D129 周三 | 封装 useThree、ThreeManager | 建立基础封装 |
| D130 周四 | Vue 组件与 Three.js 场景对象通信 | 建立通信机制 |
| D131 周五 | TypeScript 类型设计 | 规范类型系统 |
| D132 周六 | 创建项目骨架，拆分场景、相机、灯光、模型模块 | 建立项目架构 |
| D133 周日 | Vue 组件化封装和资源释放 | 完成基础框架 |

### 第 20 周：业务数据与 3D 场景联动

| 日期 | 学习内容 | 当日目标 |
| --- | --- | --- |
| D134 周一 | Pinia 与 Three.js 状态同步 | 理解状态管理 |
| D135 周二 | API 数据驱动模型 | 实现数据绑定 |
| D136 周三 | WebSocket、SSE 数据接入 | 理解实时通信 |
| D137 周四 | 动态创建、更新和销毁模型 | 实现动态场景 |
| D138 周五 | CSS2DRenderer、CSS3DRenderer | 实现 3D 标签 |
| D139 周六 | 设备状态、人员位置、建筑信息实时联动 | 完成数据驱动场景 |
| D140 周日 | 物体选中、属性面板、状态变化与业务事件通信 | 完成数字孪生基础模块 |

### 第 21 周：高级能力扩展

| 日期 | 学习内容 | 当日目标 |
| --- | --- | --- |
| D141 周一 | WebXR、VR、AR 基础 | 了解 XR |
| D142 周二 | Three.js Audio、AudioListener | 理解空间音频 |
| D143 周三 | GLTFExporter、模型导出 | 实现模型导出 |
| D144 周四 | RenderTarget、离屏渲染 | 理解离屏渲染 |
| D145 周五 | WebGPU、WebGPURenderer、TSL | 理解新渲染体系 |
| D146 周六 | WebGPU 与 WebGL 对比，运行官方示例 | 理解渲染技术演进 |
| D147 周日 | 高级功能实验集合：离屏渲染、音频、导出或 XR | 完成扩展能力实验 |

### 第 22 周：综合项目——场景构建

| 日期 | 学习内容 | 当日目标 |
| --- | --- | --- |
| D148 周一 | 项目需求分析和模块划分 | 完成需求文档 |
| D149 周二 | 场景坐标与模型规范 | 建立坐标规范 |
| D150 周三 | 园区地形、道路和建筑 | 构建基础场景 |
| D151 周四 | 模型加载与资源管理 | 接入外部模型 |
| D152 周五 | 相机、控制器和场景交互 | 完成基础交互 |
| D153 周六 | 构建完整园区 3D 场景 | 完成场景主体 |
| D154 周日 | 模型层级、对象管理、场景初始化与销毁 | 完成场景架构 |

### 第 23 周：综合项目——业务和视觉效果

| 日期 | 学习内容 | 当日目标 |
| --- | --- | --- |
| D155 周一 | 业务对象选中与信息展示 | 完成对象拾取 |
| D156 周二 | 实时数据与模型状态映射 | 完成状态绑定 |
| D157 周三 | 人员、车辆动态效果 | 完成动态对象 |
| D158 周四 | 点云、粒子、Shader | 增强视觉效果 |
| D159 周五 | 后期处理、灯光、材质优化 | 完成视觉调优 |
| D160 周六 | 集成业务 API、SSE/WebSocket、Pinia | 完成数据联动 |
| D161 周日 | 场景交互、动画和视觉效果集成 | 完成项目主要功能 |

### 第 24 周：综合项目——优化与交付

| 日期 | 学习内容 | 当日目标 |
| --- | --- | --- |
| D162 周一 | Draw Call 和模型性能分析 | 定位性能问题 |
| D163 周二 | 模型、纹理和资源优化 | 减少资源开销 |
| D164 周三 | 场景销毁和内存管理 | 解决资源泄漏 |
| D165 周四 | 不同屏幕尺寸和分辨率适配 | 完成适配 |
| D166 周五 | 功能回归、异常处理和测试 | 完成测试 |
| D167 周六 | 性能调优、代码重构和文档整理 | 完成项目优化 |
| D168 周日 | 项目验收、知识体系复盘、总结技术架构 | 完成最终交付 |

---

## 五、每天怎么学？

### 工作日：30 分钟

| 时段 | 时长 | 内容 |
| --- | --- | --- |
| 概念讲解 | 10 分钟 | 理解概念、原理、应用场景 |
| 代码实践 | 10 分钟 | 写一个小 Demo，理解 API |
| 复盘思考 | 10 分钟 | 回答问题、记录笔记、整理知识 |

### 周六：3–4 小时

1. 回顾本周知识点
2. 深入研究重要 API 和底层原理
3. 编写完整实践代码
4. 修改参数、观察效果
5. 解决实际开发中可能遇到的问题

### 周日：3–4 小时

1. 独立完成本周项目
2. 把本周知识点串联起来
3. 检查代码是否符合工程化要求
4. 完成阶段验收
5. 总结本周知识体系

---

## 六、单日课程结构

每天文档建议固定包含以下 8 个部分：

| 模块 | 内容 |
| --- | --- |
| 1. 学习目标 | 今天需要掌握什么 |
| 2. 基础概念 | 详细解释核心知识 |
| 3. 底层原理 | 解释 Three.js 为什么这样设计 |
| 4. API 讲解 | 介绍 API、参数、返回值和使用方式 |
| 5. 实战代码 | 提供 Vue 3 + TypeScript 示例 |
| 6. 代码解析 | 逐段解释代码 |
| 7. 常见问题 | 分析容易出现的错误和误区 |
| 8. 课后练习 | 布置任务，并给出验收标准 |

额外坚持三条教学要求：

1. **不能只教 API**  
   例如学 `Vector3`，还要理解为什么需要向量、向量和坐标的区别、点积/叉积用途，以及在相机控制、旋转、碰撞中如何应用。
2. **代码尽量可直接运行**  
   以 Vue 3 + TypeScript + Vite 为主要实战环境。
3. **每周必须有验收**  
   看完课程不等于学会，要能独立实现并解释原理。

---

## 七、推荐学习资料

以官方资料为主，其他资料作补充。

| 资料 | 用途 | 链接 |
| --- | --- | --- |
| Three.js Docs | API、类、方法、属性、继承关系 | [threejs.org/docs](https://threejs.org/docs/) |
| Three.js Manual | 基础原理、场景、材质、相机、渲染流程 | [threejs.org/manual](https://threejs.org/manual/) |
| Three.js Examples | 模型加载、动画、Shader、粒子、后期、性能等示例 | [threejs.org/examples](https://threejs.org/examples/) |
| Three.js GitHub | 源码、内部实现、版本变化 | [github.com/mrdoob/three.js](https://github.com/mrdoob/three.js) |

> 特别提醒：Three.js API 与渲染体系持续演进。本计划先掌握成熟的 **WebGL** 渲染体系，再进入 WebGPU / TSL，不在一开始混学。

---

## 八、最终验收标准

24 周结束后，期望达到：

| 能力 | 最终要求 |
| --- | --- |
| 基础概念 | 能解释 Three.js 核心对象和渲染流程 |
| 3D 数学 | 能独立处理向量、矩阵、旋转和坐标转换 |
| 几何体 | 能创建和修改 BufferGeometry |
| 模型 | 能处理 GLB、GLTF、FBX 等模型 |
| 材质光照 | 能独立构建 PBR 场景 |
| 动画 | 能实现模型动画和自定义动画 |
| 交互 | 能实现拾取、拖拽、空间计算 |
| Shader | 能编写基础 GLSL 效果 |
| 粒子点云 | 能实现模型点云和粒子效果 |
| 性能 | 能分析和优化复杂 3D 场景 |
| 工程化 | 能设计可维护的 Three.js 模块 |
| Vue 集成 | 能独立开发 Vue 3 + Three.js 应用 |

说明：Three.js 全部 API、所有扩展和不断演进的图形学技术，不可能在 24 周内全部精通。目标是覆盖核心知识体系、掌握主流 API，并建立持续自学高级能力的基础。

---

## 九、学习执行规则

1. **推进方式**：按 D01 → D168 推进；可根据掌握程度微调，但不跳过阶段验收。
2. **讲解深度**：原理、API、实战并重，关键知识点尽量讲清设计动机。
3. **最终项目**：默认目标为 3D 数字孪生平台；也可调整为场景编辑器或 Web 游戏方向。
4. **开发环境**：Vue 3 + TypeScript + Vite；Mac / Windows 双平台均可。
5. **成果沉淀**：每天文档进 `docs/`，Demo 进 `src/views/demos/`，每周尽量提交一次，形成可展示的技术成长记录。

目标不是会写几个 Demo，而是最终能够独立负责一个完整的 Web 3D 项目。
