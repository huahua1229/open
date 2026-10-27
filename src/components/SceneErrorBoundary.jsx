import { Component } from 'react';

/**
 * SceneErrorBoundary —— 3D 场景的兜底错误边界
 *
 * 作用：
 *  - 网站的 3D 场景（走廊/房间）任何组件在渲染、加载纹理或编译着色器时抛错，
 *    如果没有这个边界，React 会把整棵组件树卸载掉，页面直接变成一片白屏。
 *  - 有了它，错误会被拦在这里，显示一张中文提示卡片（含错误内容 + 重新加载按钮），
 *    用户不会看到白屏，也能把错误信息反馈给开发者定位问题。
 *
 * 说明：
 *  - class 组件是 React 官方唯一支持 getDerivedStateFromError 的错误边界写法。
 *  - 只包住 <Canvas> 的 3D 场景子树，不包 UI（Preloader / 导航等 DOM 层保持独立）。
 */
class SceneErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, message: '' };
    }

    // 子组件渲染抛错时，React 会调用这个静态方法，返回新 state 触发降级 UI
    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            message: error?.message || String(error),
        };
    }

    // 记录错误详情到控制台，方便排查
    componentDidCatch(error, info) {
        console.error('[SceneErrorBoundary] 3D 场景渲染出错：', error, info?.componentStack);
    }

    // 点击"重新加载"：整页刷新，重新走一遍加载流程
    handleReload = () => {
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        zIndex: 50,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(250, 250, 248, 0.96)',
                        fontFamily: "'SmileySans-Oblique', 'PingFang SC', 'Microsoft YaHei', sans-serif",
                    }}
                >
                    <div
                        style={{
                            maxWidth: 420,
                            padding: '32px 36px',
                            borderRadius: 18,
                            background: '#fffdf7',
                            border: '2px dashed #b8a58a',
                            boxShadow: '0 8px 28px rgba(90, 70, 40, 0.14)',
                            textAlign: 'center',
                            color: '#4a3f33',
                        }}
                    >
                        <div style={{ fontSize: 40, marginBottom: 8 }}>📜</div>
                        <h2 style={{ fontSize: 20, margin: '0 0 12px', letterSpacing: 2 }}>场景加载出错了</h2>
                        <p
                            style={{
                                fontSize: 13,
                                lineHeight: 1.7,
                                color: '#8a7a66',
                                wordBreak: 'break-all',
                                margin: '0 0 20px',
                                maxHeight: 90,
                                overflow: 'auto',
                            }}
                        >
                            {this.state.message || '未知错误'}
                        </p>
                        <button
                            onClick={this.handleReload}
                            style={{
                                padding: '10px 28px',
                                borderRadius: 999,
                                border: 'none',
                                background: '#c9a86a',
                                color: '#fffdf7',
                                fontSize: 15,
                                cursor: 'pointer',
                                letterSpacing: 2,
                            }}
                        >
                            重新加载
                        </button>
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}

export default SceneErrorBoundary;
