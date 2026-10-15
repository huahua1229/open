import { useScene } from '../../context/SceneContext';
import { useGalleryProjects, useStudioContent, useAwards } from '../../hooks/useSanityData';
import '../../styles/ScreenReaderOverlay.scss';

/**
 * ScreenReaderOverlay — A7 Accessibility
 * 
 * Invisible HTML layer providing screen reader access to 3D canvas content.
 * Contains buttons/links matching interactive 3D elements (doors, rooms).
 * Visually hidden via .sr-only but fully accessible to assistive tech.
 */
const ScreenReaderOverlay = () => {
    const { hasEntered, isInRoom, currentRoom, teleportTo, requestExit } = useScene();
    
    // 获取数据以生成面向 SEO / 爬虫的不可见 HTML
    const projects = useGalleryProjects();
    const studio = useStudioContent();
    const awards = useAwards();

    return (
        <div className="sr-overlay" role="complementary" aria-label="Accessible navigation for 3D portfolio">
            {/* Skip to content link */}
            <a href="#sr-main-nav" className="sr-only sr-focusable">
                Skip to accessible navigation
            </a>

            {/* Main accessible navigation */}
            <nav id="sr-main-nav" className="sr-only" aria-label="Portfolio rooms">
                <h1>POLARIS — 大模型应用 · AI 与数据挖掘探索者</h1>
                <h2>站点导航</h2>

                {!hasEntered && (
                    <p>欢迎来到 POLARIS 交互式 3D 个人站。点击或按回车进入大门。</p>
                )}

                {hasEntered && !isInRoom && (
                    <>
                        <p>你正在走廊中，选择一个房间探索：</p>
                        <ul>
                            <li>
                                <button onClick={() => teleportTo('about')} type="button">
                                    关于 — 我的故事、荣誉与旅程
                                </button>
                            </li>
                            <li>
                                <button onClick={() => teleportTo('gallery')} type="button">
                                    画廊 — 我的项目与作品
                                </button>
                            </li>
                            <li>
                                <button onClick={() => teleportTo('contact')} type="button">
                                    联系 — 找到我
                                </button>
                            </li>
                            <li>
                                <button onClick={() => teleportTo('studio')} type="button">
                                    工作室 — 技术与经历
                                </button>
                            </li>
                        </ul>
                    </>
                )}

                {hasEntered && isInRoom && (
                    <>
                        <p>
                            你正在 {currentRoom === 'about' ? '关于' :
                                currentRoom === 'gallery' ? '画廊' :
                                    currentRoom === 'contact' ? '联系' :
                                        currentRoom === 'studio' ? '工作室' : currentRoom} 房间。
                        </p>
                        <button onClick={requestExit} type="button">
                            返回走廊
                        </button>

                        {/* Room-specific content descriptions */}
                        {currentRoom === 'about' && (
                            <div aria-label="About room content">
                                <h3>关于我</h3>
                                <p>我是卓智华，广东科学技术职业学院大模型应用专业在校学生，热爱人工智能与数据挖掘。曾获 2026 年（第 14 届）泰迪杯数据挖掘挑战赛全国专科组三等奖、广东省专科组二等奖，参与全国大学生数学建模竞赛。人生若只如初见，何事秋风悲画扇。</p>
                                
                                {awards && (
                                    <section>
                                        <h4>我的荣誉</h4>
                                        <ul>
                                            {awards.sotd && awards.sotd.items && awards.sotd.items.map((a, i) => (
                                                <li key={i}>{a.label} - {a.date} {a.url && <a href={a.url}>查看</a>}</li>
                                            ))}
                                            {awards.sotm && awards.sotm.items && awards.sotm.items.map((a, i) => (
                                                <li key={i}>{a.label} - {a.date} {a.url && <a href={a.url}>查看</a>}</li>
                                            ))}
                                            {awards.other && awards.other.items && awards.other.items.map((a, i) => (
                                                <li key={i}>{a.label} - {a.date} {a.url && <a href={a.url}>查看</a>}</li>
                                            ))}
                                        </ul>
                                    </section>
                                )}
                            </div>
                        )}
                        {currentRoom === 'gallery' && (
                            <div aria-label="Gallery room content">
                                <h3>我的项目</h3>
                                <p>浏览展示在纸卡上的项目作品。点击项目卡查看详情并访问线上站点。</p>
                                
                                {projects && projects.length > 0 && (
                                    <ul>
                                        {projects.map((p, i) => (
                                            <li key={i}>
                                                <h4>{p.title}</h4>
                                                <p>{p.description}</p>
                                                {p.url && <a href={p.url}>访问 {p.title}</a>}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )}
                        {currentRoom === 'contact' && (
                            <div aria-label="Contact room content">
                                <h3>联系我</h3>
                                <p>漂浮的油桶是我的社交链接：哔哩哔哩、GitHub、抖音、小红书，点击即可访问。中间的消息桶可以给我发邮件（2728817118@qq.com）。</p>
                            </div>
                        )}
                        {currentRoom === 'studio' && (
                            <div aria-label="Studio room content">
                                <h3>工作室</h3>
                                <p>在旋转的显示器上浏览我的技能与经历。点击显示器查看详情。</p>

                                {studio && studio.length > 0 && (
                                    <ul>
                                        {studio.map((s, i) => (
                                            <li key={i}>
                                                <h4>{s.title} ({s.platform})</h4>
                                                <p>{s.description}</p>
                                                {s.url && <a href={s.url}>查看内容</a>}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )}

                        {/* Quick navigation to other rooms */}
                        <h3>Quick Navigation</h3>
                        <ul>
                            {currentRoom !== 'about' && (
                                <li><button onClick={() => teleportTo('about')} type="button">Go to About</button></li>
                            )}
                            {currentRoom !== 'gallery' && (
                                <li><button onClick={() => teleportTo('gallery')} type="button">Go to Gallery</button></li>
                            )}
                            {currentRoom !== 'contact' && (
                                <li><button onClick={() => teleportTo('contact')} type="button">Go to Contact</button></li>
                            )}
                            {currentRoom !== 'studio' && (
                                <li><button onClick={() => teleportTo('studio')} type="button">Go to Studio</button></li>
                            )}
                        </ul>
                    </>
                )}
            </nav>

            {/* Live region for state changes */}
            <div aria-live="polite" aria-atomic="true" className="sr-only">
                {isInRoom && `Entered ${currentRoom} room`}
            </div>
        </div>
    );
};

export default ScreenReaderOverlay;
