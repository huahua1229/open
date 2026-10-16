/**
 * Studio Content Data
 * 
 * This file contains all content items for the Studio monitor tower.
 * Each item will be displayed on a monitor in the tower.
 * 
 * Platforms: 'youtube', 'blog', 'tiktok'
 * 
 * POLARIS 版：内容已去重；每条配有对应的中文屏幕纹理（/textures/studio/polaris/）；
 * 跳转分类：视频/短视频类 → 对应主题的 B 站视频；项目/论文类 → PDF / Polaris 小站；学习网站 → 各站点；纯展示类不跳转。
 */

export const PLATFORM_CONFIG = {
    youtube: {
        color: '#FF0000',
        accentColor: '#cc0000',
        icon: '▶',
        label: '视频',
        shape: 'tv', // Wide CRT style
    },
    blog: {
        color: '#4A90D9',
        accentColor: '#2d6cb5',
        icon: '文',
        label: '手记',
        shape: 'monitor', // Thin desktop monitor
    },
    tiktok: {
        color: '#00F2EA',
        accentColor: '#FF0050',
        icon: '♪',
        label: '短视频',
        shape: 'phone', // Vertical phone
    },
    instagram: {
        color: '#E1306C',
        accentColor: '#C13584',
        icon: '图',
        label: 'Instagram',
        shape: 'phone',
    },
    x: {
        color: '#000000',
        accentColor: '#14171A',
        icon: 'X',
        label: 'X (Twitter)',
        shape: 'monitor',
    },
    linkedin: {
        color: '#0077B5',
        accentColor: '#005E93',
        icon: 'in',
        label: 'LinkedIn',
        shape: 'monitor',
    },
    codrops: {
        color: '#0099FF',
        accentColor: '#0077CC',
        icon: '网',
        label: 'Codrops',
        shape: 'monitor',
    },
};

// 每条内容对应的中文屏幕纹理（Polaris 版，画面与内容严格对应）
// 双版本机制：X_sketch = 素描态（默认，纸白淡墨）；X_painted = 上色态（悬停才显色）
const POLARIS_TEXTURES = {
    'yt-001': '/open/textures/studio/polaris/polaris_yt001_sketch.png',
    'yt-003': '/open/textures/studio/polaris/polaris_yt003_sketch.png',
    'yt-004': '/open/textures/studio/polaris/polaris_yt004_sketch.png',
    'yt-005': '/open/textures/studio/polaris/polaris_yt005_sketch.png',
    'yt-006': '/open/textures/studio/polaris/polaris_yt006_sketch.png',
    'yt-008': '/open/textures/studio/polaris/polaris_yt008_sketch.png',
    'blog-001': '/open/textures/studio/polaris/polaris_blog001_sketch.png',
    'blog-paper-teddy': '/open/textures/studio/polaris/polaris_blogpaper1_sketch.png',
    'blog-paper-cumcm': '/open/textures/studio/polaris/polaris_blogpaper2_sketch.png',
    'blog-005': '/open/textures/studio/polaris/polaris_blog005_sketch.png',
    'web-examcrafts': '/open/textures/studio/polaris/polaris_webexamcrafts_sketch.png',
    'web-runoob': '/open/textures/studio/polaris/polaris_webrunoob_sketch.png',
    'web-w3school': '/open/textures/studio/polaris/polaris_webw3school_sketch.png',
    'web-mdn': '/open/textures/studio/polaris/polaris_webmdn_sketch.png',
    'tt-001': '/open/textures/studio/polaris/polaris_tt001_sketch.png',
    'tt-002': '/open/textures/studio/polaris/polaris_tt002_sketch.png',
    'tt-003': '/open/textures/studio/polaris/polaris_tt003_sketch.png',
    'tt-004': '/open/textures/studio/polaris/polaris_tt004_sketch.png',
    'tt-006': '/open/textures/studio/polaris/polaris_tt006_sketch.png',
    'tt-007': '/open/textures/studio/polaris/polaris_tt007_sketch.png',
    'tt-009': '/open/textures/studio/polaris/polaris_tt009_sketch.png',
    'tt-012': '/open/textures/studio/polaris/polaris_tt012_sketch.png',
};

// 上色态纹理（悬停时由 revealMaterial 显出）
const POLARIS_TEXTURES_PAINTED = {
    'yt-001': '/open/textures/studio/polaris/polaris_yt001_painted.png',
    'yt-003': '/open/textures/studio/polaris/polaris_yt003_painted.png',
    'yt-004': '/open/textures/studio/polaris/polaris_yt004_painted.png',
    'yt-005': '/open/textures/studio/polaris/polaris_yt005_painted.png',
    'yt-006': '/open/textures/studio/polaris/polaris_yt006_painted.png',
    'yt-008': '/open/textures/studio/polaris/polaris_yt008_painted.png',
    'blog-001': '/open/textures/studio/polaris/polaris_blog001_painted.png',
    'blog-paper-teddy': '/open/textures/studio/polaris/polaris_blogpaper1_painted.png',
    'blog-paper-cumcm': '/open/textures/studio/polaris/polaris_blogpaper2_painted.png',
    'blog-005': '/open/textures/studio/polaris/polaris_blog005_painted.png',
    'web-examcrafts': '/open/textures/studio/polaris/polaris_webexamcrafts_painted.png',
    'web-runoob': '/open/textures/studio/polaris/polaris_webrunoob_painted.png',
    'web-w3school': '/open/textures/studio/polaris/polaris_webw3school_painted.png',
    'web-mdn': '/open/textures/studio/polaris/polaris_webmdn_painted.png',
    'tt-001': '/open/textures/studio/polaris/polaris_tt001_painted.png',
    'tt-002': '/open/textures/studio/polaris/polaris_tt002_painted.png',
    'tt-003': '/open/textures/studio/polaris/polaris_tt003_painted.png',
    'tt-004': '/open/textures/studio/polaris/polaris_tt004_painted.png',
    'tt-006': '/open/textures/studio/polaris/polaris_tt006_painted.png',
    'tt-007': '/open/textures/studio/polaris/polaris_tt007_painted.png',
    'tt-009': '/open/textures/studio/polaris/polaris_tt009_painted.png',
    'tt-012': '/open/textures/studio/polaris/polaris_tt012_painted.png',
};

// 跳转目标：项目/论文去 Polaris 小站；纯展示为空；视频类逐条指向对应主题的 B 站视频
const POLARIS_URL = 'https://huahua1229.github.io/open';

// Sample content data - replace with real content later
const RAW_CONTENT_DATA = [
    // ============ 视频 / 演示（youtube 平台，电视屏） ============
    {
        id: 'yt-001',
        platform: 'youtube',
        title: '泰迪杯 · 秦直道路线规划 项目演示',
        description: '2026 年（第 14 届）泰迪杯数据挖掘挑战赛获奖作品演示：用数据挖掘算法为秦直道规划最优路线。',
        frontTexture: null,
        paintedFrontTexture: null,
        thumbnail: null,
        url: 'https://www.bilibili.com/video/BV1L2QMByE4T',
        date: '2026-06-20',
        views: '3.2K',
        duration: '12:30',
    },
    {
        id: 'yt-003',
        platform: 'youtube',
        title: 'Polaris 个人网站开发全过程',
        description: '从零搭建自己的个人小站：布局、配色、夜间模式、留言板、音乐库，一步一个脚印。',
        frontTexture: null,
        paintedFrontTexture: null,
        thumbnail: null,
        url: 'https://www.bilibili.com/video/BV1HhJmzKESW',
        date: '2026-08-30',
        views: '5.4K',
        duration: '22:18',
    },
    {
        id: 'yt-004',
        platform: 'youtube',
        title: 'Python 数据分析实战系列',
        description: '用 Pandas 清洗数据、做可视化，把竞赛数据吃透的实战记录。',
        frontTexture: null,
        paintedFrontTexture: null,
        thumbnail: null,
        url: 'https://www.bilibili.com/video/BV1qWHS6xE2U',
        date: '2026-07-22',
        views: '1.8K',
        duration: '15:47',
    },
    {
        id: 'yt-005',
        platform: 'youtube',
        title: '大模型应用入门笔记',
        description: '大模型应用专业学习日常：提示词、微调、RAG，边学边做项目。',
        frontTexture: null,
        paintedFrontTexture: null,
        thumbnail: null,
        url: 'https://www.bilibili.com/video/BV1cfE96MEVQ',
        date: '2026-06-10',
        views: '2.7K',
        duration: '16:20',
    },
    {
        id: 'yt-006',
        platform: 'youtube',
        title: '爬虫实战：小说文本采集',
        description: '用 requests + lxml 采集小说文本，jieba 分词做词频分析，好玩又实用。',
        frontTexture: null,
        paintedFrontTexture: null,
        thumbnail: null,
        url: 'https://www.bilibili.com/video/BV1BitHzLEXg',
        date: '2026-05-18',
        views: '3.9K',
        duration: '14:55',
    },
    {
        id: 'yt-008',
        platform: 'youtube',
        title: 'AI 图像创作探索',
        description: '用 AI 生成龙族主题壁纸和插画，把热爱变成网站上的装饰。',
        frontTexture: null,
        paintedFrontTexture: null,
        thumbnail: null,
        url: 'https://www.bilibili.com/video/BV1hW3LzGE64',
        date: '2026-03-30',
        views: '1.5K',
        duration: '11:36',
    },

    // ============ 项目 / 经历（blog 平台，显示器） ============
    {
        id: 'blog-001',
        platform: 'blog',
        title: '泰迪杯双料获奖 🏆',
        description: '2026 年（第 14 届）泰迪杯数据挖掘挑战赛，作品《「秦直道」的路线规划》获全国专科组三等奖、广东省专科组二等奖。',
        frontTexture: null,
        paintedFrontTexture: null,
        thumbnail: null,
        url: POLARIS_URL,
        date: '2026-06-25',
        readTime: '5 min',
    },
    {
        id: 'blog-paper-teddy',
        platform: 'blog',
        title: '论文：基于 GIS 空间分析与熵权法的秦直道路线规划与历史合理性研究',
        description: '一次泰迪杯的数学建模竞赛成果：综合 GIS 空间分析、多目标优化算法与熵权法，对秦直道地形特征、规划原则、最优路径及历史合理性进行全链条定量研究。',
        frontTexture: null,
        paintedFrontTexture: null,
        thumbnail: null,
        url: './papers/gis-qinzhidao-paper.pdf',
        date: '2026-06-25',
        readTime: '12 min',
    },
    {
        id: 'blog-paper-cumcm',
        platform: 'blog',
        title: '论文：基于分层识别与混合整数规划的 SEM 广告投放策略优化模型',
        description: '一次全国大学生数学建模竞赛成果：构建三层识别框架与分层二维分位分箱模型，用 0-1 混合整数线性规划与两阶段随机规划优化 SEM 广告投放策略。',
        frontTexture: null,
        paintedFrontTexture: null,
        thumbnail: null,
        url: './papers/sem-ad-paper.pdf',
        date: '2026-09-18',
        readTime: '14 min',
    },
    {
        id: 'blog-005',
        platform: 'blog',
        title: '大模型应用专业 · 我的专业',
        description: '就读于广东科学技术职业学院大模型应用专业，热爱人工智能与数据挖掘技术。',
        frontTexture: null,
        paintedFrontTexture: null,
        thumbnail: null,
        url: '',
        date: '2026-09-01',
        readTime: '3 min',
    },

    // ============ 学习网站收藏（blog 平台，显示器） ============
    {
        id: 'web-examcrafts',
        platform: 'blog',
        title: 'ExamCrafts · 考试练习平台',
        description: '在线刷题练习网站，覆盖高考、大学考试、考研、公务员、学科竞赛，以及英语四六级、专四专八等科目，支持按题型专项训练。',
        frontTexture: null,
        paintedFrontTexture: null,
        thumbnail: null,
        url: 'https://examcrafts.com/subjects',
        date: '2026-10-10',
        readTime: '—',
    },
    {
        id: 'web-runoob',
        platform: 'blog',
        title: '菜鸟教程（菜鸟编程）',
        description: '编程入门首选学习网站，提供 HTML/CSS、JavaScript、Python、Java、SQL 等海量教程与在线实例，边看边练。',
        frontTexture: null,
        paintedFrontTexture: null,
        thumbnail: null,
        url: 'https://www.runoob.com',
        date: '2026-10-10',
        readTime: '—',
    },
    {
        id: 'web-w3school',
        platform: 'blog',
        title: 'W3School 中文教程',
        description: 'Web 技术入门教程站，覆盖 HTML、CSS、JavaScript、PHP、SQL 等，适合新手系统学习网页开发。',
        frontTexture: null,
        paintedFrontTexture: null,
        thumbnail: null,
        url: 'https://www.w3school.com.cn',
        date: '2026-10-10',
        readTime: '—',
    },
    {
        id: 'web-mdn',
        platform: 'blog',
        title: 'MDN Web Docs',
        description: 'Mozilla 出品的 Web 权威开发文档，HTML/CSS/JavaScript 的 API 最全最准，进阶必查。',
        frontTexture: null,
        paintedFrontTexture: null,
        thumbnail: null,
        url: 'https://developer.mozilla.org',
        date: '2026-10-10',
        readTime: '—',
    },

    // ============ 短内容（tiktok 平台，手机屏） ============
    {
        id: 'tt-001',
        platform: 'tiktok',
        title: '泰迪杯赛前一夜 🌙',
        description: '提交截止前的最后一晚，大家都在卷什么',
        frontTexture: null,
        paintedFrontTexture: null,
        thumbnail: null,
        url: 'https://www.bilibili.com/video/BV1sb9aBwEgZ',
        date: '2026-06-24',
        views: '15.2K',
        likes: '1.2K',
    },
    {
        id: 'tt-002',
        platform: 'tiktok',
        title: '模型跑通的那一刻 🎉',
        description: '训练 loss 终于降下去，整个人都亮了',
        frontTexture: null,
        paintedFrontTexture: null,
        thumbnail: null,
        url: 'https://www.bilibili.com/video/BV1TBLQ6AEeV',
        date: '2026-06-20',
        views: '22.1K',
        likes: '3.4K',
    },
    {
        id: 'tt-003',
        platform: 'tiktok',
        title: '数据可视化炫酷瞬间 ✨',
        description: 'Pandas + ECharts，把数据画出花',
        frontTexture: null,
        paintedFrontTexture: null,
        thumbnail: null,
        url: 'https://www.bilibili.com/video/BV1jmwQzFEt2',
        date: '2026-06-15',
        views: '12.3K',
        likes: '1.1K',
    },
    {
        id: 'tt-004',
        platform: 'tiktok',
        title: 'Python 一行代码 🐍',
        description: '那些看起来很酷的一行式',
        frontTexture: null,
        paintedFrontTexture: null,
        thumbnail: null,
        url: 'https://www.bilibili.com/video/BV1wTNWzeEJ6',
        date: '2026-06-08',
        views: '18.7K',
        likes: '2.1K',
    },
    {
        id: 'tt-006',
        platform: 'tiktok',
        title: '听歌写代码 🎵',
        description: '耳机一戴，谁都不爱',
        frontTexture: null,
        paintedFrontTexture: null,
        thumbnail: null,
        url: 'https://www.bilibili.com/video/BV1vhGx6cExp',
        date: '2026-05-18',
        views: '19.3K',
        likes: '2.4K',
    },
    {
        id: 'tt-007',
        platform: 'tiktok',
        title: '网站上线了！🚀',
        description: 'Polaris 小站第一版上线的快乐',
        frontTexture: null,
        paintedFrontTexture: null,
        thumbnail: null,
        url: 'https://www.bilibili.com/video/BV1nepezqEHk',
        date: '2026-05-10',
        views: '33.4K',
        likes: '4.2K',
    },
    {
        id: 'tt-009',
        platform: 'tiktok',
        title: '前端调样式崩溃现场 😅',
        description: '为什么这个 div 就是不居中',
        frontTexture: null,
        paintedFrontTexture: null,
        thumbnail: null,
        url: 'https://www.bilibili.com/video/BV1cbCuBqE7L',
        date: '2026-04-15',
        views: '45.2K',
        likes: '5.8K',
    },
    {
        id: 'tt-012',
        platform: 'tiktok',
        title: '给网站加樱花特效 🌸',
        description: '让花瓣飘起来，小站更有味道',
        frontTexture: null,
        paintedFrontTexture: null,
        thumbnail: null,
        url: 'https://www.bilibili.com/video/BV1LW41197Ca',
        date: '2026-03-20',
        views: '26.7K',
        likes: '3.3K',
    },
];

export const CONTENT_DATA = RAW_CONTENT_DATA.map((item) => {
    const sketchTex = POLARIS_TEXTURES[item.id];
    const paintedTex = POLARIS_TEXTURES_PAINTED[item.id];
    return {
        ...item,
        // 素描态默认显示；悬停时 revealMaterial 渐显上色态
        frontTexture: sketchTex || item.frontTexture,
        paintedFrontTexture: paintedTex || sketchTex || item.paintedFrontTexture,
    };
});

// Helper to get content by platform
export const getContentByPlatform = (platform) => {
    if (platform === 'all') return CONTENT_DATA;
    return CONTENT_DATA.filter(item => item.platform === platform);
};

// Get latest content (for "On Air" indicator)
export const getLatestContent = () => {
    return [...CONTENT_DATA].sort((a, b) => new Date(b.date) - new Date(a.date))[0];
};
