import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { configureTextBuilder } from 'troika-three-text'

// 关键修复：troika 默认字体是 Roboto（不含中文），渲染中文/特殊符号时会去
// cdn.jsdelivr.net 拉取 unicode-font-resolver 的 fallback 字体码点数据；
// 该 CDN 在国内常被重置（ERR_CONNECTION_RESET），导致文字排版 Promise 永远
// pending，Preloader 卡在 90%。
// 这里把「默认字体」指向本地得意黑（含中文与常用符号），并把 fallback 数据源
// 也指到本地（空数据），让 troika 永不依赖外网 CDN。
configureTextBuilder({
  defaultFontURL: '/fonts/SmileySans-Oblique.ttf',
  unicodeFontsURL: '/fonts/ufr', // 本地 fallback 数据目录（不存在则快速失败，不再卡死）
})


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
