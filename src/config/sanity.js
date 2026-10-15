import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

export const sanityClient = createClient({
    projectId: 'polartest01', // 合法格式占位：关闭 Sanity 拉取，改用本地硬编码内容（Polaris 小站内容）
    dataset: 'production',
    useCdn: true, // 开发环境用 `false`，生产环境用 `true` 以更快
    apiVersion: '2024-03-01', // aktualna data API
});

const builder = createImageUrlBuilder(sanityClient);

// 生成 Sanity 图片 URL 的辅助函数
export const urlFor = (source) => builder.image(source);

// Funkcja pomocnicza do zamiany domeny Sanity na proxy w Cloudflare
export const getProxyUrl = (imageBuilder) => {
    if (!imageBuilder) return null;
    const url = imageBuilder.url();
    if (url && typeof window !== 'undefined') {
        return url.replace('https://cdn.sanity.io', '/sanity-cdn');
    }
    return url;
};
