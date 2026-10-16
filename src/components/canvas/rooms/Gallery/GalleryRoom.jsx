import { useRef, useState, useMemo, useEffect, forwardRef, useImperativeHandle, memo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text, useTexture, Float, PositionalAudio } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { Observer } from 'gsap/all';
import { useScene } from '../../../../context/SceneContext';

gsap.registerPlugin(Observer);
import { useAchievements } from '../../../../context/AchievementsContext';
import PaperMaterial from './PaperMaterial';
import GalleryClouds from './GalleryClouds';
import { useAudio } from '../../../../context/AudioManager';
import { usePaintMaterial } from './usePaintMaterial';
import { useGalleryProjects } from '../../../../hooks/useSanityData';

// Reusable Vector3 to avoid allocations in useFrame
const _tempScale = new THREE.Vector3();

// ============================================
// ⚙️ AUDIO SETTINGS - TWEAK HERE
// 修改这些值以改变城市噪音的音量和可闻范围
// ============================================
export const AUDIO_SETTINGS = {
    volume: 0.6,
    distance: 2,
    rolloff: 1.5
};

export const GALLERY_INTERACTION_AUDIO_SETTINGS = {
    volume: 0.6,      // Volume for the paper clicking sound
    distance: 2,      // Reference distance for spatial audio before it starts dropping off
    rolloff: 2        // How fast the sound fades away (exponential)
};

// Define the unique projects and their textures
const FALLBACK_PROJECTS = [
    {
        id: 'teddy-national',
        title: '泰迪杯 · 全国三等奖',
        front: '/textures/gallery/teddy_national.webp',
        painted: '/textures/gallery/teddy_national.webp',
        url: 'https://huahua1229.github.io/Polaris',
        description: '2026 年（第 14 届）泰迪杯数据挖掘挑战赛全国专科组三等奖，获奖作品《「秦直道」的路线规划》。',
        techStack: ['/textures/gallery/deepseek_logo.png', '/textures/gallery/wps_logo.png', '/textures/gallery/pycharm_logo.png', '/textures/gallery/python_logo.png']
    },
    {
        id: 'teddy-guangdong',
        title: '泰迪杯 · 省二等奖',
        front: '/textures/gallery/teddy_guangdong.webp',
        painted: '/textures/gallery/teddy_guangdong.webp',
        url: 'https://huahua1229.github.io/Polaris',
        description: '同一作品《「秦直道」的路线规划》荣获广东省专科组二等奖。',
        techStack: ['/textures/gallery/deepseek_logo.png', '/textures/gallery/wps_logo.png', '/textures/gallery/pycharm_logo.png', '/textures/gallery/python_logo.png']
    },
    {
        id: 'polaris-site',
        title: 'POLARIS 个人小站',
        front: '/textures/gallery/polaris_day.webp',
        painted: '/textures/gallery/polaris_night.webp',
        url: 'https://huahua1229.github.io/Polaris',
        description: '亲手搭建的个人网站：三栏布局、日夜模式、留言板、音乐库、相册、投稿系统，从零到上线。',
        techStack: ['/textures/gallery/deepseek_logo.png', '/textures/gallery/wps_logo.png', '/textures/gallery/pycharm_logo.png', '/textures/gallery/python_logo.png']
    },

    // ========== 生活照片墙（按时间顺序） ==========
    { id: 'photo-01', title: '2026年的珠海跨年之旅', front: '/textures/gallery/gallery_photo_01.jpg', painted: '/textures/gallery/gallery_photo_01.jpg', url: '', description: '2026年的珠海跨年之旅', techStack: [] , poem: { text: '爆竹声中一岁除，春风送暖入屠苏', source: '王安石《元日》' } },
    { id: 'photo-02', title: '大一国庆的梧桐山之旅', front: '/textures/gallery/gallery_photo_02.jpg', painted: '/textures/gallery/gallery_photo_02.jpg', url: '', description: '大一国庆的梧桐山之旅', techStack: [] , poem: { text: '会当凌绝顶，一览众山小', source: '杜甫《望岳》' } },
    { id: 'photo-03', title: '临时起意的看日出', front: '/textures/gallery/gallery_photo_03.jpg', painted: '/textures/gallery/gallery_photo_03.jpg', url: '', description: '临时起意的看日出', techStack: [] , poem: { text: '日出江花红胜火，春来江水绿如蓝', source: '白居易《忆江南》' } },
    { id: 'photo-04', title: '大学时期的工作证', front: '/textures/gallery/gallery_photo_04.jpg', painted: '/textures/gallery/gallery_photo_04.jpg', url: '', description: '大学时期的工作证', techStack: [] , poem: { text: '恰同学少年，风华正茂', source: '毛泽东《沁园春·长沙》' } },
    { id: 'photo-05', title: '青志外联的初团建', front: '/textures/gallery/gallery_photo_05.jpg', painted: '/textures/gallery/gallery_photo_05.jpg', url: '', description: '青志外联的初团建', techStack: [] , poem: { text: '同是天涯沦落人，相逢何必曾相识', source: '白居易《琵琶行》' } },
    { id: 'photo-06', title: '大学与新朋友聚餐', front: '/textures/gallery/gallery_photo_06.jpg', painted: '/textures/gallery/gallery_photo_06.jpg', url: '', description: '大学与新朋友聚餐', techStack: [] , poem: { text: '人生得意须尽欢，莫使金樽空对月', source: '李白《将进酒》' } },
    { id: 'photo-07', title: '赚学分的成品作', front: '/textures/gallery/gallery_photo_07.jpg', painted: '/textures/gallery/gallery_photo_07.jpg', url: '', description: '赚学分的成品作', techStack: [] , poem: { text: '宝剑锋从磨砺出，梅花香自苦寒来', source: '《警世贤文》' } },
    { id: 'photo-08', title: '企业参观和朋友的合照', front: '/textures/gallery/gallery_photo_08.jpg', painted: '/textures/gallery/gallery_photo_08.jpg', url: '', description: '企业参观和朋友的合照', techStack: [] , poem: { text: '三人行，必有我师焉', source: '《论语·述而》' } },
    { id: 'photo-09', title: '高中时期的食品研究', front: '/textures/gallery/gallery_photo_09.jpg', painted: '/textures/gallery/gallery_photo_09.jpg', url: '', description: '高中时期的食品研究', techStack: [] , poem: { text: '人间有味是清欢', source: '苏轼《浣溪沙》' } },
    { id: 'photo-10', title: '高中时期的食品研究', front: '/textures/gallery/gallery_photo_10.jpg', painted: '/textures/gallery/gallery_photo_10.jpg', url: '', description: '高中时期的食品研究', techStack: [] , poem: { text: '谁知盘中餐，粒粒皆辛苦', source: '李绅《悯农》' } },
    { id: 'photo-11', title: '青志迎新晚会大合照', front: '/textures/gallery/gallery_photo_11.jpg', painted: '/textures/gallery/gallery_photo_11.jpg', url: '', description: '青志迎新晚会大合照', techStack: [] , poem: { text: '东风夜放花千树', source: '辛弃疾《青玉案·元夕》' } },
    { id: 'photo-12', title: '高二班级大合照', front: '/textures/gallery/gallery_photo_12.jpg', painted: '/textures/gallery/gallery_photo_12.jpg', url: '', description: '高二班级大合照', techStack: [] , poem: { text: '桃李春风一杯酒，江湖夜雨十年灯', source: '黄庭坚《寄黄几复》' } },
    { id: 'photo-13', title: '自行体会', front: '/textures/gallery/gallery_photo_13.jpg', painted: '/textures/gallery/gallery_photo_13.jpg', url: '', description: '自行体会', techStack: [] , poem: { text: '只可意会，不可言传', source: '《庄子·天道》' } },
    { id: 'photo-14', title: '调一些酒', front: '/textures/gallery/gallery_photo_14.jpg', painted: '/textures/gallery/gallery_photo_14.jpg', url: '', description: '调一些酒', techStack: [] , poem: { text: '葡萄美酒夜光杯，欲饮琵琶马上催', source: '王翰《凉州词》' } },
    { id: 'photo-15', title: '聚餐碰杯', front: '/textures/gallery/gallery_photo_15.jpg', painted: '/textures/gallery/gallery_photo_15.jpg', url: '', description: '聚餐碰杯', techStack: [] , poem: { text: '金樽清酒斗十千，玉盘珍羞直万钱', source: '李白《行路难》' } },
    { id: 'photo-16', title: '高中假期的香港之旅', front: '/textures/gallery/gallery_photo_16.jpg', painted: '/textures/gallery/gallery_photo_16.jpg', url: '', description: '高中假期的香港之旅', techStack: [] , poem: { text: '长风破浪会有时，直挂云帆济沧海', source: '李白《行路难》' } },
    { id: 'photo-17', title: '保佑保佑！', front: '/textures/gallery/gallery_photo_17.jpg', painted: '/textures/gallery/gallery_photo_17.jpg', url: '', description: '保佑保佑！', techStack: [] , poem: { text: '如月之恒，如日之升', source: '《诗经·小雅·天保》' } },
    { id: 'photo-18', title: '夜骑之旅', front: '/textures/gallery/gallery_photo_18.jpg', painted: '/textures/gallery/gallery_photo_18.jpg', url: '', description: '夜骑之旅', techStack: [] , poem: { text: '春风得意马蹄疾，一日看尽长安花', source: '孟郊《登科后》' } },
    { id: 'photo-19', title: '出发出发！', front: '/textures/gallery/gallery_photo_19.jpg', painted: '/textures/gallery/gallery_photo_19.jpg', url: '', description: '出发出发！', techStack: [] , poem: { text: '路漫漫其修远兮，吾将上下而求索', source: '屈原《离骚》' } },
    { id: 'photo-20', title: '三剑客', front: '/textures/gallery/gallery_photo_20.jpg', painted: '/textures/gallery/gallery_photo_20.jpg', url: '', description: '三剑客', techStack: [] , poem: { text: '海内存知己，天涯若比邻', source: '王勃《送杜少府之任蜀州》' } },
];

const PROJECT_COUNT = 10; // Keep the count for the infinite scroll feel

// 中文文本按每行最多 n 个字符插入换行（troika 对长中文串断行不可靠，手动控制换行）
const wrapZh = (text, n) => {
    if (!text) return '';
    const chars = Array.from(text);
    let out = '';
    for (let i = 0; i < chars.length; i++) {
        out += chars[i];
        if ((i + 1) % n === 0 && i !== chars.length - 1) out += '\n';
    }
    return out;
};
const GAP = 2.5;

// 修改这些值以匹配鸟的比例（legacy ratio 1.41）
const BIRD_WIDTH = 0.49;
const BIRD_HEIGHT = 0.35;

// Adjust this value (0.0 to 1.0) to crop the right side of the "Houses" graphic.
// 0.0 = No crop
// 0.2 = 20% crop from the right (corridor side)
const RIGHT_CROP_AMOUNT = 0.2;

const GalleryRoom = ({ showRoom, onReady, isExiting, isWarmup }) => {
    const { openOverlay, isTeleporting } = useScene();
    const { showTutorial, unlockAchievement, hidePopup } = useAchievements();
    const { globalVolume, isMuted } = useAudio();
    const effectiveVolume = isMuted ? 0 : AUDIO_SETTINGS.volume * globalVolume;

    const audioRef = useRef();
    useEffect(() => {
        if (audioRef.current && audioRef.current.setVolume) {
            audioRef.current.setVolume(effectiveVolume);
        }
    }, [effectiveVolume]);

    const groupRef = useRef();
    const [scrollOffset, setScrollOffset] = useState(0);
    const targetScroll = useRef(0);
    const currentScroll = useRef(0);
    const [selectedCard, setSelectedCard] = useState(null);
    const [globalIsAnimating, setGlobalIsAnimating] = useState(false);
    const cardRefs = useRef([]);

    useEffect(() => {
        if (isExiting || isTeleporting) {
            hidePopup();
        }
    }, [isExiting, isTeleporting, hidePopup]);

    // Setup Paint Transition
    const { onBeforeCompile, animatePaint, resetPaint, uniformsData, updateRoomOrigin } = usePaintMaterial();
    
    // Track transition state to disable interactions
    const [isTransitioning, setIsTransitioning] = useState(false);
    
    // Track if user teleported into this room 
    const wasTeleportedRef = useRef(false);
    useEffect(() => {
        if (isTeleporting) wasTeleportedRef.current = true;
    }, [isTeleporting]);

    useEffect(() => {
        // When the room officially shows up (doors open and user flies in)
        if (showRoom && !isWarmup) {
            if (wasTeleportedRef.current || isTeleporting) {
                // Skip the painting transition entirely if teleporting via map
                uniformsData.uPaintProgress.value = 1.0;
                setIsTransitioning(false);
            } else {
                setIsTransitioning(true);
                // resetPaint() in case we re-enter
                resetPaint();
                // Start the paint animation with a slight delay so it happens *during* fly-in
                animatePaint(0.2, 2.5);
                
                // Re-enable interactions once painting finishes
                setTimeout(() => {
                    setIsTransitioning(false);
                }, 2700); // 0.2 + 2.5
            }
        } else {
            // Immediately reveal for warmup or hide if not showing
            uniformsData.uPaintProgress.value = 1.0;
        }
    }, [showRoom, isWarmup, isTeleporting]);

    const handleCardClick = async (clickedIndex) => {
        if (globalIsAnimating || isTransitioning) return;

        // Unlock inspect achievement
        unlockAchievement('gallery_inspect');

        if (selectedCard === clickedIndex) {
            setGlobalIsAnimating(true);
            await cardRefs.current[clickedIndex].closeCard();
            setSelectedCard(null);
            setGlobalIsAnimating(false);
        } else if (selectedCard !== null) {
            setGlobalIsAnimating(true);
            await cardRefs.current[selectedCard].closeCard();
            setSelectedCard(null);
            await cardRefs.current[clickedIndex].openCard();
            setSelectedCard(clickedIndex);
            setGlobalIsAnimating(false);
        } else {
            setGlobalIsAnimating(true);
            await cardRefs.current[clickedIndex].openCard();
            setSelectedCard(clickedIndex);
            setGlobalIsAnimating(false);
        }
    };

    // Track if we've signaled ready
    const hasSignaledReady = useRef(false);
    const frameCount = useRef(0);
    const FRAMES_TO_WAIT = 5;

    useFrame(() => {
        // Update room origin each frame so the paint shader knows where.
        // This is cheap (one getWorldPosition) and critical for far chunks.
        updateRoomOrigin(groupRef);

        if (hasSignaledReady.current) return;
        frameCount.current++;
        if (frameCount.current >= FRAMES_TO_WAIT) {
            hasSignaledReady.current = true;
            onReady?.();

            // Wait for the DoorSection 1.5s camera fly-in to finish before showing tutorial
            setTimeout(() => {
                if (!isWarmup) showTutorial('gallery_inspect');
            }, 2000);
        }
    });

    // Config
    const BALCONY_WIDTH = 5;
    const BALCONY_DEPTH = 3;
    const RAILING_HEIGHT = 1.25; // Legacy ratio 20/(7 segments * 2.287)

    // --- TEXTURES AND RESPONSIVENESS ---
    // User requested: painted on desktop, regular on touch/phones (even if laptop has touch screen)
    // We use matchMedia('(hover: hover)') to detect devices with a cursor/hover capability
    const [canHover, setCanHover] = useState(() => typeof window !== 'undefined' ? window.matchMedia('(hover: hover)').matches : true);

    // Pobieranie danych z Sanity.io (fallback do starych danych)
    const sanityProjects = useGalleryProjects();
    const activeProjects = sanityProjects || FALLBACK_PROJECTS;
    // 动态数量：让所有项目（含照片墙）都能在晾衣绳上出现一次
    const projectCount = activeProjects.length;

    useEffect(() => {
        const mq = window.matchMedia('(hover: hover)');
        const handleHoverChange = (e) => setCanHover(e.matches);
        mq.addEventListener('change', handleHoverChange);
        return () => mq.removeEventListener('change', handleHoverChange);
    }, []);

    // Load all project front textures in a flat array
    const textureUrls = activeProjects.map(p => p.front);
    const projectTextures = useTexture(textureUrls);

    // Load painted textures only on desktop, fallback to front if mobile/touch
    const paintedUrls = activeProjects.map(p => (canHover && p.painted) ? p.painted : p.front);
    const paintedTextures = useTexture(paintedUrls);

    // Load the universal back texture and the button texture conditionally
    const backTextureRaw = useTexture(canHover ? '/textures/gallery/tylkartki_painted.webp' : '/textures/gallery/tylkartki.webp');
    const overlayTextureRaw = useTexture(canHover ? '/textures/gallery/przyciskdotylukartki_painted.webp' : '/textures/gallery/przyciskdotylukartki.webp');

    // POLARIS 版：提升卡片纹理清晰度——开启各向异性过滤 + 高质量 mipmap，消除斜视/远景时的模糊
    useEffect(() => {
        const all = [
            ...(Array.isArray(projectTextures) ? projectTextures : [projectTextures]),
            ...(Array.isArray(paintedTextures) ? paintedTextures : [paintedTextures])
        ];
        all.forEach(t => {
            if (t && t.isTexture) {
                t.anisotropy = 16;
                t.minFilter = THREE.LinearMipmapLinearFilter;
                t.magFilter = THREE.LinearFilter;
                t.generateMipmaps = true;
                t.needsUpdate = true;
            }
        });
    }, [projectTextures, paintedTextures]);

    // Preload tech stack logos to prevent stuttering on first flip
    // We use the same conditional logic: painted on desktop, regular on touch
    const allLogos = useMemo(() => {
        // POLARIS 版：固定 4 个技术栈图标（DeepSeek / WPS / PyCharm / Python）
        return [
            '/textures/gallery/deepseek_logo.png',
            '/textures/gallery/wps_logo.png',
            '/textures/gallery/pycharm_logo.png',
            '/textures/gallery/python_logo.png'
        ];
    }, []);
    
    useTexture(allLogos);

    // Construct the full list of projects (repeated) with textures attached
    const projects = useMemo(() => {
        return Array.from({ length: projectCount }).map((_, i) => {
            const projectIndex = i % activeProjects.length;
            const projectData = activeProjects[projectIndex];

            // Extract front texture
            const frontTex = projectTextures[projectIndex];
            const paintedTex = paintedTextures[projectIndex];

            // Configure textures
            if (frontTex) {
                frontTex.colorSpace = THREE.SRGBColorSpace;
                // frontTex.encoding = THREE.sRGBEncoding;
            }
            if (paintedTex) {
                paintedTex.colorSpace = THREE.SRGBColorSpace;
            }
            if (backTextureRaw) {
                backTextureRaw.colorSpace = THREE.SRGBColorSpace;
            }
            if (overlayTextureRaw) {
                overlayTextureRaw.colorSpace = THREE.SRGBColorSpace;
            }

            // Map tech stack logos to the correct version (painted or regular)
            const techStack = projectData.techStack.map(path => {
                if (!canHover) return path; // Keep regular
                // POLARIS 版：PNG 图标无 painted 版本，原样返回
                if (path.endsWith('.png')) return path;
                const name = path.split('/').pop().replace('.webp', '');
                if (name === 'csslogo') return '/textures/gallery/css3logo_painted.webp';
                return `/textures/gallery/${name}_painted.webp`;
            });

            return {
                ...projectData,
                index: i,
                frontTexture: frontTex,
                paintedTexture: (paintedTex !== frontTex && canHover) ? paintedTex : null,
                backTexture: backTextureRaw,
                buttonTexture: overlayTextureRaw,
                techStack: techStack
            };
        });
    }, [projectTextures, backTextureRaw, overlayTextureRaw]);

    // Function to scroll to a specific project index
    const scrollToIndex = (index, onComplete) => {
        const totalWidth = projectCount * GAP;
        const targetScrollValue = index * GAP;
        const currentScrollValue = currentScroll.current;

        let diff = targetScrollValue - currentScrollValue;
        const halfWidth = totalWidth / 2;
        while (diff > halfWidth) diff -= totalWidth;
        while (diff < -halfWidth) diff += totalWidth;

        const finalTarget = currentScrollValue + diff;

        gsap.to(targetScroll, {
            current: finalTarget,
            duration: 0.5,
            ease: 'power2.inOut'
        });

        gsap.to(currentScroll, {
            current: finalTarget,
            duration: 0.5,
            ease: 'power2.inOut',
            onComplete: onComplete
        });
    };

    // --- INTERACTION ---
    const lastTouchX = useRef(0);
    useEffect(() => {
        // Observers enable us to normalize wheel, touch, and pointer events
        const scrollObserver = Observer.create({
            target: window,
            type: "wheel,touch,pointer",
            wheelSpeed: -1,
            onWheel: (e) => {
                if (!showRoom || selectedCard !== null || globalIsAnimating || isTransitioning) return;
                const orig = e.event;
                orig.preventDefault();
                targetScroll.current += orig.deltaY * 0.005;
            },
            onPress: (e) => {
                if (!showRoom || selectedCard !== null || globalIsAnimating || isTransitioning) return;
                const orig = e.event;
                if (orig.touches && orig.touches.length === 1) {
                    lastTouchX.current = orig.touches[0].clientX;
                }
            },
            onDrag: (e) => {
                if (!showRoom || selectedCard !== null || globalIsAnimating || isTransitioning) return;
                const orig = e.event;
                if (orig.touches && orig.touches.length === 1) {
                    const deltaX = lastTouchX.current - orig.touches[0].clientX;
                    lastTouchX.current = orig.touches[0].clientX;
                    targetScroll.current += deltaX * 0.008;
                }
            }
        });

        return () => scrollObserver.kill();
    }, [showRoom, selectedCard, globalIsAnimating]);

    useFrame((state, delta) => {
        currentScroll.current = THREE.MathUtils.lerp(currentScroll.current, targetScroll.current, delta * 5);
    });

    // --- GEOMETRY & MATERIALS ---
    const floorTexture = useTexture('/textures/gallery/floor.webp');
    const railingTexture = useTexture('/textures/gallery/railing.webp');
    const housesTexture = useTexture('/textures/gallery/domki.webp');
    const cityTexture = useTexture('/textures/gallery/miastotlo.webp');
    const birdTexture = useTexture('/textures/gallery/bird_gray.webp');
    const clothespinTexture = useTexture('/textures/gallery/klamerka.webp');

    useEffect(() => {
        if (floorTexture) {
            floorTexture.wrapS = THREE.MirroredRepeatWrapping;
            floorTexture.wrapT = THREE.MirroredRepeatWrapping;
            floorTexture.repeat.set(0.5, 0.5 * 1.835); // Adjust repeat to keep scale with legacy 1.835 ratio
            floorTexture.needsUpdate = true;
        }
        if (railingTexture) {
            railingTexture.wrapS = railingTexture.wrapT = THREE.RepeatWrapping;
            railingTexture.repeat.set(7, 1);
            railingTexture.needsUpdate = true;
        }
    }, [floorTexture, railingTexture]);

    const materials = useMemo(() => {
        const floorMat = new THREE.MeshBasicMaterial({
            map: floorTexture,
            color: '#e0e0e0',
            side: THREE.DoubleSide
        });
        floorMat.onBeforeCompile = onBeforeCompile;
        floorMat.transparent = true;
        floorMat.needsUpdate = true;
        
        const ropeMat = new THREE.MeshBasicMaterial({ color: '#666666' });
        ropeMat.onBeforeCompile = onBeforeCompile;
        ropeMat.transparent = true;
        ropeMat.needsUpdate = true;

        const thresholdMat = new THREE.MeshBasicMaterial({
            color: '#e0e0e0',
            map: (() => {
                const t = new THREE.TextureLoader().load('/textures/corridor/texturadoprogow.webp');
                t.colorSpace = THREE.SRGBColorSpace;
                t.wrapS = t.wrapT = THREE.RepeatWrapping;
                t.repeat.set(15 / 2.524, 1);
                return t;
            })(),
            side: THREE.DoubleSide
        });
        thresholdMat.onBeforeCompile = onBeforeCompile;
        thresholdMat.transparent = true;
        thresholdMat.needsUpdate = true;

        return {
            floor: floorMat,
            rope: ropeMat,
            threshold: thresholdMat
        };
    }, [floorTexture, onBeforeCompile]);

    const curve = useMemo(() => {
        return new THREE.CatmullRomCurve3([
            new THREE.Vector3(-16, 3.5, -6),
            new THREE.Vector3(-8, 2.5, -4.5),
            new THREE.Vector3(0, 1.8, -3),
            new THREE.Vector3(8, 2.5, -4.5),
            new THREE.Vector3(16, 3.5, -6),
        ]);
    }, []);

    const ropeGeometry = useMemo(() => {
        return new THREE.TubeGeometry(curve, 64, 0.015, 8, false);
    }, [curve]);

    const floorShape = useMemo(() => {
        const shape = new THREE.Shape();
        shape.moveTo(-1.1, -2.0);
        shape.lineTo(1.1, -2.0);
        shape.lineTo(7.5, 4);
        shape.lineTo(-7.5, 4);
        shape.lineTo(-1.1, -2.0);
        return shape;
    }, []);

    return (
        <group ref={groupRef}>
            {!isWarmup && (
                <PositionalAudio
                    ref={audioRef}
                    url="/sounds/szummiasta.mp3"
                    distanceModel="exponential"
                    refDistance={AUDIO_SETTINGS.distance}
                    rolloffFactor={AUDIO_SETTINGS.rolloff}
                    loop
                    autoplay
                    volume={effectiveVolume}
                />
            )}
            <group position={[0, -0.7, -2]}>
                {/* Floor */}
                <mesh
                    rotation={[-Math.PI / 2, 0, 0]}
                    position={[0, 0, 0]}
                >
                    <shapeGeometry args={[floorShape]} />
                    <primitive object={materials.floor} />
                </mesh>

                {/* Floor Outline */}
                <line rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
                    <bufferGeometry>
                        <float32BufferAttribute
                            attach="attributes-position"
                            count={2}
                            array={new Float32Array([7.5, 4, 0, -7.5, 4, 0])}
                            itemSize={3}
                        />
                    </bufferGeometry>
                    <lineBasicMaterial color="#999999" onBeforeCompile={onBeforeCompile} transparent={true} needsUpdate={true} />
                </line>

                {/* Railing */}
                <mesh position={[0, RAILING_HEIGHT / 2, -3.9]}>
                    <planeGeometry args={[20, RAILING_HEIGHT]} />
                    <meshBasicMaterial color="#e0e0e0"
                        map={railingTexture}
                        transparent={true}
                        side={THREE.DoubleSide}
                        alphaTest={0.1}
                        onBeforeCompile={onBeforeCompile}
                        customProgramCacheKey={() => 'railing-paint'}
                    />
                </mesh>

                {/* === THRESHOLD (At the end of the floor) === */}
                <mesh
                    position={[0, 0.01, -3.9]}
                    rotation={[-Math.PI / 2, 0, 0]}
                >
                    <planeGeometry args={[15, 0.15]} />
                    <primitive object={materials.threshold} />
                </mesh>

                {/* === CLOTHESLINE SYSTEM === */}
                <group position={[0, 1.6, -4]}>
                    <mesh geometry={ropeGeometry} material={materials.rope} />

                    {/* Proj Cards */}
                    {projects.map((project, i) => (
                        <ProjectCard
                            key={i}
                            index={i}
                            ref={el => cardRefs.current[i] = el}
                            project={project}
                            clothespinTexture={clothespinTexture}
                            total={projectCount}
                            totalCount={projectCount}
                            currentScroll={currentScroll}
                            materials={materials}
                            curve={curve}
                            isSelected={selectedCard === i}
                            anySelected={selectedCard !== null}
                            scrollToIndex={scrollToIndex}
                            onClick={handleCardClick}
                            isMobile={!canHover} // Use hover capability for mobile behavior logic
                            isTransitioning={isTransitioning} // Pass down to lock out individual pointer events just in case
                            paintProgress={uniformsData.uPaintProgress}
                            roomOrigin={uniformsData.uRoomOrigin}
                        />
                    ))}
                </group>

                {/* === SCENERY LAYERS === */}
                {/* Houses - center */}
                <mesh position={[0, -1, -9]} scale={[1, 1, 1]}>
                    <planeGeometry args={[15, 15 / 2.357]} />
                    <meshBasicMaterial color="#e0e0e0"
                        map={housesTexture}
                        transparent={true}
                        alphaTest={0.1}
                        side={THREE.DoubleSide}
                        onBeforeCompile={onBeforeCompile}
                    />
                </mesh>
                {/* Houses - left side (mirrored) */}
                <mesh position={[-15, -1, -9]} scale={[-1, 1, 1]}>
                    <planeGeometry args={[15, 15 / 2.357]} />
                    <meshBasicMaterial color="#e0e0e0"
                        map={housesTexture}
                        transparent={true}
                        alphaTest={0.1}
                        side={THREE.DoubleSide}
                        onBeforeCompile={onBeforeCompile}
                    />
                </mesh>
                {/* Houses - right side (mirrored) - CROPPED */}
                <RightSideHouses
                    texture={housesTexture}
                    baseWidth={15}
                    baseHeight={15 / 2.357}
                    cropAmount={RIGHT_CROP_AMOUNT}
                />

                {/* City skyline - center */}
                <mesh position={[0, 3.4, -17]} scale={[1, 1, 1]}>
                    <planeGeometry args={[30, 30 / 2.357]} />
                    <meshBasicMaterial color="#e0e0e0"
                        map={cityTexture}
                        transparent={true}
                        alphaTest={0.1}
                        side={THREE.DoubleSide}
                        onBeforeCompile={onBeforeCompile}
                    />
                </mesh>
                {/* City skyline - left (mirrored) */}
                <mesh position={[-30, 3.4, -17]} scale={[-1, 1, 1]}>
                    <planeGeometry args={[30, 30 / 2.357]} />
                    <meshBasicMaterial color="#e0e0e0"
                        map={cityTexture}
                        transparent={true}
                        alphaTest={0.1}
                        side={THREE.DoubleSide}
                        onBeforeCompile={onBeforeCompile}
                    />
                </mesh>
                {/* City skyline - right (mirrored) */}
                <mesh position={[30, 3.4, -17]} scale={[-1, 1, 1]}>
                    <planeGeometry args={[30, 30 / 2.357]} />
                    <meshBasicMaterial color="#e0e0e0"
                        map={cityTexture}
                        transparent={true}
                        alphaTest={0.1}
                        side={THREE.DoubleSide}
                        onBeforeCompile={onBeforeCompile}
                    />
                </mesh>

                {/* Flying Bird */}
                <FlyingBird texture={birdTexture} />

                {/* Clouds scattered above */}
                <GalleryClouds count={65} seed={123} />

                {/* Skybox/Environment */}
                <mesh position={[0, 5, -20]}>
                    <sphereGeometry args={[40, 32, 32]} />
                    <meshBasicMaterial color="#f0f0f0" side={THREE.BackSide} transparent opacity={0.5} onBeforeCompile={onBeforeCompile} />
                </mesh>
            </group>
        </group>
    );
};

// Flying bird animation component
const FlyingBird = ({ texture }) => {
    const birdRef = useRef();
    const startX = -25;
    const endX = 25;
    const speed = 2.5; // 降低的飞行速度

    // 跳跃物理相关变量
    const velocityY = useRef(0);
    const gravity = -12.0; // 降低重力以获得更流畅的效果
    const jumpStrength = 5.5; // Delikatniejszy skok
    const jumpInterval = useRef(0);

    useFrame((state, delta) => {
        if (!birdRef.current) return;

        // 防止 delta 过大（卡顿时）
        const safeDelta = Math.min(delta, 0.05);

        // Ruch w poziomie
        birdRef.current.position.x += speed * safeDelta;

        if (birdRef.current.position.x > endX) {
            birdRef.current.position.x = startX;
            birdRef.current.position.y = 4.5;
            velocityY.current = 0;
            jumpInterval.current = 0;
            birdRef.current.rotation.z = 0;
        }

        // Fizyka spadania
        velocityY.current += gravity * safeDelta;
        birdRef.current.position.y += velocityY.current * safeDelta;

        // 跳跃（更流畅、更可预测）
        jumpInterval.current -= safeDelta;

        // 达到下一次点击的预定时间后触发跳跃
        if (jumpInterval.current <= 0 || birdRef.current.position.y < 3.2) {
            velocityY.current = jumpStrength;
            // 更稀疏、更有节奏的跳跃（如每满一秒一次）
            jumpInterval.current = 0.9 + Math.random() * 0.3;
        }

        // 地板下边界
        if (birdRef.current.position.y < 3.0) {
            birdRef.current.position.y = 3.0;
            velocityY.current = jumpStrength;
        }

        // 天花板上边界
        if (birdRef.current.position.y > 6.5) {
            birdRef.current.position.y = 6.5;
            velocityY.current = 0;
        }

        // Rotacja ptaka
        // 在 Flappy Bird 中，鸟下落时喙略微向下，跳跃时朝上
        const targetRotationZ = THREE.MathUtils.clamp(velocityY.current * 0.05, -Math.PI / 6, Math.PI / 8);

        // 非常平滑的旋转（lerp）
        birdRef.current.rotation.z = THREE.MathUtils.lerp(birdRef.current.rotation.z, targetRotationZ, safeDelta * 8);
    });

    return (
        <mesh ref={birdRef} position={[startX, 4.5, -10]} scale={[BIRD_WIDTH, BIRD_HEIGHT, 1]}>
            <planeGeometry args={[1.5, 1.5]} />
            <meshBasicMaterial color="#e0e0e0"
                map={texture}
                transparent={true}
                alphaTest={0.1}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
};

// Sub-component for individual project cards
const ProjectCard = memo(forwardRef(({ index, project, clothespinTexture, currentScroll, materials, curve, isSelected, anySelected, totalCount, scrollToIndex, onClick, isMobile, isTransitioning, paintProgress, roomOrigin }, ref) => {
    const cardRef = useRef();
    const paperRef = useRef(); // Ref for the moving part (Paper)
    const materialRef = useRef();
    const textRef = useRef(); // Ref for the text that sticks to the paper
    const buttonGroupRef = useRef(); // Ref for the interactive back button
    const detailsGroupRef = useRef(); // Ref for the project details on the back
    const techStackGroupRef = useRef(); // Ref for the tech stack section on the back
    const detailsTextRef1 = useRef();
    const detailsTextRef2 = useRef();
    const techTextRef = useRef();
    const poemSourceRef = useRef();
    const poemLine2Ref = useRef();
    const openTextRef = useRef();
    const [hovered, setHovered] = useState(false);
    const [btnHovered, setBtnHovered] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);  // True ONLY during flip animation
    const [isScrolling, setIsScrolling] = useState(false);  // True during scroll phase

    // 诗句按逗号拆成两行展示（troika 对长中文断行不可靠，手动分行）
    const poemText = project.poem?.text || '';
    const poemParts = poemText.split('，');
    const poemLine1 = poemParts[0] || '';
    const poemLine2 = poemParts.slice(1).join('，') || '';

    // Random sway properties
    const swaySpeed = useRef(Math.random() * 0.2 + 0.3); // Slower sway speed
    const swayOffset = useRef(Math.random() * 100);

    // Audio Ref
    const paperAudioRef = useRef();
    const { globalVolume, isMuted } = useAudio();

    const playPaperSound = () => {
        if (paperAudioRef.current) {
            const vol = isMuted ? 0 : GALLERY_INTERACTION_AUDIO_SETTINGS.volume * globalVolume;
            paperAudioRef.current.setVolume(vol);
            if (paperAudioRef.current.isPlaying) paperAudioRef.current.stop();
            paperAudioRef.current.play();
        }
    };

    useImperativeHandle(ref, () => ({
        closeCard: () => {
            return new Promise((resolve) => {
                setIsAnimating(true);
                playPaperSound();

                const timeline = gsap.timeline({
                    onComplete: () => {
                        setIsAnimating(false);
                        resolve();

                        // Unpaint the card after it returns to the clothespin
                        if (project.paintedTexture && materialRef.current) {
                            gsap.to(materialRef.current, {
                                uProgress: 0.0,
                                duration: 0.5,
                                ease: 'power2.out',
                                overwrite: 'auto'
                            });
                        }
                    }
                });

                const localBaseY = -1.1;

                timeline.to(paperRef.current.position, {
                    y: localBaseY + 0.6,
                    x: 0,
                    z: 1,
                    duration: 0.35,
                    ease: 'power2.in'
                });

                timeline.to(paperRef.current.rotation, {
                    x: 0.5,
                    z: -0.05,
                    y: 0,
                    duration: 0.35,
                    ease: 'power2.in'
                }, '<');

                if (materialRef.current) {
                    timeline.to(materialRef.current, {
                        bend: 0.6,
                        duration: 0.3,
                        ease: 'power2.in'
                    }, '<');
                }

                timeline.to(paperRef.current.scale, {
                    x: 1, y: 1, z: 1,
                    duration: 0.3, ease: 'sine.inOut'
                }, '<');

                timeline.to(paperRef.current.position, {
                    y: localBaseY,
                    x: 0,
                    z: 0,
                    duration: 0.25,
                    ease: 'power3.out'
                });

                timeline.to(paperRef.current.rotation, {
                    x: 0, y: 0, z: 0,
                    duration: 0.25,
                    ease: 'power3.out'
                }, '<');

                if (materialRef.current) {
                    timeline.to(materialRef.current, {
                        bend: 0,
                        duration: 0.3,
                        ease: 'power2.out'
                    }, '<');
                }
            });
        },
        openCard: () => {
            return new Promise((resolve) => {
                setIsScrolling(true);
                scrollToIndex(index, () => {
                    setIsScrolling(false);
                    setIsAnimating(true);
                    playPaperSound();

                    const isMobile = window.innerWidth < 768;
                    const targetX_World = 0;
                    const targetY_World = isMobile ? -0.2 : 0.1;
                    const targetZ_World = isMobile ? 0.5 : 1.5;

                    const parentPos = cardRef.current.position;
                    const targetX = targetX_World - parentPos.x;
                    const targetY = targetY_World - parentPos.y;
                    const targetZ = targetZ_World - parentPos.z;

                    const timeline = gsap.timeline({
                        onComplete: () => {
                            setIsAnimating(false);
                            resolve();
                        }
                    });

                    timeline.to(cardRef.current.rotation, {
                        x: 0, y: 0, z: 0,
                        duration: 0.3,
                        ease: 'power2.out'
                    }, 0);

                    if (materialRef.current) materialRef.current.bend = 0;

                    const localBaseY = -1.1;

                    timeline.to(paperRef.current.position, {
                        y: localBaseY - 0.5,
                        duration: 0.15,
                        ease: 'power2.out'
                    });

                    timeline.to(paperRef.current.rotation, {
                        x: 0.5,
                        z: -0.05,
                        duration: 0.15,
                        ease: 'power2.out'
                    }, '<');

                    if (materialRef.current) {
                        timeline.to(materialRef.current, {
                            bend: 0.8,
                            duration: 0.15,
                            ease: 'power2.out'
                        }, '<');

                        // Keep painted or finish painting to 1.0 when opened
                        // Running with gsap.to independently to avoid blocking the timeline duration
                        if (project.paintedTexture) {
                            gsap.to(materialRef.current, {
                                uProgress: 1.0,
                                duration: 0.3,
                                ease: 'power2.out',
                                overwrite: 'auto'
                            });
                        }
                    }

                    timeline.to(paperRef.current.position, {
                        y: localBaseY + 1.5,
                        x: targetX * 0.2,
                        z: targetZ * 0.2,
                        duration: 0.4,
                        ease: 'power1.out'
                    });

                    timeline.to(paperRef.current.rotation, {
                        x: Math.PI * 0.8,
                        z: 0.05,
                        y: -0.02,
                        duration: 0.4,
                        ease: 'power1.inOut'
                    }, '<');

                    if (materialRef.current) {
                        timeline.to(materialRef.current, {
                            bend: -0.3,
                            duration: 0.4,
                            ease: 'power1.inOut'
                        }, '<');
                    }

                    timeline.to(paperRef.current.position, {
                        y: targetY,
                        x: targetX,
                        z: targetZ,
                        duration: 0.4,
                        ease: 'power3.out'
                    });

                    timeline.to(paperRef.current.rotation, {
                        x: Math.PI,
                        y: 0,
                        z: 0,
                        duration: 0.4,
                        ease: 'power3.out'
                    }, '<');

                    if (materialRef.current) {
                        timeline.to(materialRef.current, {
                            bend: 0,
                            duration: 0.5,
                            ease: 'power2.out'
                        }, '<');
                    }

                    timeline.to(paperRef.current.scale, {
                        x: 1.1,
                        y: 1.1,
                        z: 1.1,
                        duration: 0.3,
                        ease: 'sine.out'
                    }, '-=0.4');
                });
            });
        }
    }));

    const handleClick = (e) => {
        e.stopPropagation();
        if (onClick) onClick(index);
    };

    // Cursor change on hover
    useEffect(() => {
        if (btnHovered && isSelected) {
            document.body.style.cursor = 'pointer';
        } else if (hovered && !isSelected) {
            document.body.style.cursor = 'pointer';
        } else {
            document.body.style.cursor = 'auto';
        }
        return () => { document.body.style.cursor = 'auto'; };
    }, [hovered, isSelected, btnHovered]);

    useFrame((state) => {
        if (!cardRef.current) return;

        // Custom GSAP Paint logic for texts
        // We delay the text reveal slightly so the card paints first (p > 0.4)
        if (textRef.current && paintProgress) {
            const p = paintProgress.value;
            const paintOpacity = p >= 1.0 ? 1.0 : THREE.MathUtils.clamp((p - 0.3) * 2.0, 0.0, 1.0);
            // 正面标题：任意卡片被选中时隐藏（避免打开后标题文字与详情重叠错位）
            const frontOpacity = (isSelected || anySelected) ? 0.0 : paintOpacity;
            // 背面详情（项目详情/描述/技术栈/按钮）：选中卡片翻到背面时必须保持可见
            const backOpacity = isSelected ? 1.0 : paintOpacity;

            if (textRef.current.fillOpacity !== frontOpacity) {
                const applyOpacity = (ref, opacity) => {
                    if (ref.current) {
                        ref.current.fillOpacity = opacity;
                        if (ref.current.material) {
                            ref.current.material.opacity = opacity;
                            ref.current.material.transparent = true;
                        }
                    }
                };
                applyOpacity(textRef, frontOpacity);
                applyOpacity(detailsTextRef1, backOpacity);
                applyOpacity(detailsTextRef2, backOpacity);
                applyOpacity(techTextRef, backOpacity);
                applyOpacity(poemSourceRef, backOpacity);
                applyOpacity(poemLine2Ref, backOpacity);
                applyOpacity(openTextRef, backOpacity);
            }
        }

        // --- 让文字 Z 位置与纸张弯折波动动画对齐（正面） ---
        if (textRef.current && materialRef.current) {
            const y = textRef.current.position.y;
            const uBend = materialRef.current.bend;
            const uWindStrength = materialRef.current.windStrength || 0;
            const uTime = state.clock.getElapsedTime();

            const bendAmount = Math.pow(y, 2.0) * uBend;
            const totalWind = 0.02 + uWindStrength;
            const flutter = Math.sin(uTime * 2.0 + y * 2.0) * totalWind * (1.0 + Math.abs(uBend * 3.0));

            textRef.current.position.z = bendAmount + flutter + 0.02;

            // 旋转文字使其贴合曲率（导数 dz/dy）
            const dz_dy = 2.0 * y * uBend + 2.0 * Math.cos(uTime * 2.0 + y * 2.0) * totalWind * (1.0 + Math.abs(uBend * 3.0));
            textRef.current.rotation.x = Math.atan(dz_dy);
        }

        // --- 让按钮 Z 位置与纸张背面动画对齐（背面） ---
        if (buttonGroupRef.current && materialRef.current) {
            const y = buttonGroupRef.current.position.y;
            const uBend = materialRef.current.bend;
            const uWindStrength = materialRef.current.windStrength || 0;
            const uTime = state.clock.getElapsedTime();

            const bendAmount = Math.pow(y, 2.0) * uBend;
            const totalWind = 0.02 + uWindStrength;
            const flutter = Math.sin(uTime * 2.0 + y * 2.0) * totalWind * (1.0 + Math.abs(uBend * 3.0));

            // 记住！整个平面向前弯折（相对父级 +Z）。
            // 而我们在外侧（背面后方），应位于平面后方一小段，如 -0.03
            // 之前曾误将整个等式的符号翻转（-(bendAmount...)），导致波动反向。正确写法如下：
            buttonGroupRef.current.position.z = bendAmount + flutter - 0.03;

            // 旋转按钮以贴合曲率，位于另一侧（额外翻转 Pi）
            const dz_dy = 2.0 * y * uBend + 2.0 * Math.cos(uTime * 2.0 + y * 2.0) * totalWind * (1.0 + Math.abs(uBend * 3.0));
            buttonGroupRef.current.rotation.x = Math.PI + Math.atan(dz_dy);

            // 按钮的 hover 放大动画（文字放大）
            const targetScale = btnHovered ? 1.08 : 1;
            buttonGroupRef.current.scale.lerp(_tempScale.set(targetScale, targetScale, 1), 0.15);
        }

        // --- 对齐顶部说明（PROJECT DETAILS）的位置 ---
        if (detailsGroupRef.current && materialRef.current) {
            const y = detailsGroupRef.current.position.y;
            const uBend = materialRef.current.bend;
            const uWindStrength = materialRef.current.windStrength || 0;
            const uTime = state.clock.getElapsedTime();

            const bendAmount = Math.pow(y, 2.0) * uBend;
            const totalWind = 0.02 + uWindStrength;
            const flutter = Math.sin(uTime * 2.0 + y * 2.0) * totalWind * (1.0 + Math.abs(uBend * 3.0));

            // 在背面（同按钮）
            detailsGroupRef.current.position.z = bendAmount + flutter - 0.03;

            // 旋转
            const dz_dy = 2.0 * y * uBend + 2.0 * Math.cos(uTime * 2.0 + y * 2.0) * totalWind * (1.0 + Math.abs(uBend * 3.0));
            detailsGroupRef.current.rotation.x = Math.PI + Math.atan(dz_dy);
        }

        // --- 对齐 Tech Stack 区块的位置 ---
        if (techStackGroupRef.current && materialRef.current) {
            const y = techStackGroupRef.current.position.y;
            const uBend = materialRef.current.bend;
            const uWindStrength = materialRef.current.windStrength || 0;
            const uTime = state.clock.getElapsedTime();

            const bendAmount = Math.pow(y, 2.0) * uBend;
            const totalWind = 0.02 + uWindStrength;
            const flutter = Math.sin(uTime * 2.0 + y * 2.0) * totalWind * (1.0 + Math.abs(uBend * 3.0));

            techStackGroupRef.current.position.z = bendAmount + flutter - 0.03;

            const dz_dy = 2.0 * y * uBend + 2.0 * Math.cos(uTime * 2.0 + y * 2.0) * totalWind * (1.0 + Math.abs(uBend * 3.0));
            techStackGroupRef.current.rotation.x = Math.PI + Math.atan(dz_dy);
        }

        // Skip position updates ONLY during flip animation, NOT during scroll
        if (isAnimating || isSelected) return;

        const totalWidth = totalCount * GAP; // GAP is available in scope because we are in the file where GAP is defined
        let rawX = (index * GAP) - currentScroll.current;
        const halfWidth = totalWidth / 2;
        let displayX = ((rawX + halfWidth) % totalWidth + totalWidth) % totalWidth - halfWidth;

        const u = (displayX + 16) / 32;
        const safeU = THREE.MathUtils.clamp(u, 0, 1);
        const pointOnCurve = curve.getPointAt(safeU);

        cardRef.current.position.set(pointOnCurve.x, pointOnCurve.y, pointOnCurve.z);

        // Wind / Sway Animation
        const time = state.clock.getElapsedTime();
        const wind = Math.sin(time * swaySpeed.current + swayOffset.current) * 0.05;

        cardRef.current.rotation.z = wind;
        cardRef.current.rotation.x = 0;

        // Visibility Check (fade out if too far)
        const dist = Math.abs(displayX);
        const scale = THREE.MathUtils.clamp(1 - (dist / 50), 0.7, 1);
        cardRef.current.scale.setScalar(scale);
    });

    return (
        <group
            ref={cardRef}
            onClick={handleClick}
            onPointerEnter={(e) => {
                if (isMobile || isTransitioning) return;
                e.stopPropagation();
                setHovered(true);

                // Brush reveal animation
                if (materialRef.current && project.paintedTexture && !isSelected) {
                    gsap.to(materialRef.current, {
                        uProgress: 1.0,
                        duration: 0.8,
                        ease: 'power2.out',
                        overwrite: 'auto'
                    });
                }
            }}
            onPointerLeave={(e) => {
                if (isMobile || isTransitioning) return;
                e.stopPropagation();
                setHovered(false);

                // Reverse brush reveal animation ONLY if NOT selected
                if (materialRef.current && project.paintedTexture && !isSelected) {
                    gsap.to(materialRef.current, {
                        uProgress: 0.0,
                        duration: 0.5,
                        ease: 'power2.out',
                        overwrite: 'auto'
                    });
                }
            }}
        >
            {/* Clothespin (Top Center) - Does NOT move with paperRef */}
            <mesh position={[0, -0.08, 0.15]} rotation={[0, 0, Math.PI]}>
                <planeGeometry args={[0.3, 0.2]} />
                <meshBasicMaterial color="#ffffff"
                    map={clothespinTexture}
                    transparent={true}
                    alphaTest={0.1}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* The Paper / Card hanging down - This moves independently now */}
            <group
                ref={paperRef}
                position={[0, -1.1, 0]}
            >
                <mesh>
                    <planeGeometry args={[1.5, 2, 16, 16]} />
                    <PaperMaterial
                        ref={materialRef}
                        color="#ffffff"
                        map={project.frontTexture}
                        mapBack={project.backTexture}
                        mapPainted={project.paintedTexture}
                        side={THREE.DoubleSide}
                        roughness={0.6}
                        paintProgress={paintProgress}
                        roomOrigin={roomOrigin}
                    />
                </mesh>

                {/* === 按钮：纸张背面返回画廊 === */}
                {/* POLARIS 版：所有卡片（项目卡与照片卡）都有「返回画廊」按钮 */}
                <group
                    ref={buttonGroupRef}
                    position={[0, 0.75, 0]}
                    rotation={[Math.PI, 0, 0]}
                >
                    {/* 第 1 层：按钮视觉边框（无事件） */}
                    <mesh>
                        <planeGeometry args={[1.2, 1.2 / 3.613]} />
                        <meshBasicMaterial color="#ffffff"
                            map={project.buttonTexture}
                            transparent={true}
                            alphaTest={0.05}
                        />
                    </mesh>

                    {/* 第 2 层：OPEN PROJECT 文字（无事件） */}
                    <Text
                        ref={openTextRef}
                        position={[0, 0, 0.01]}
                        fontSize={0.11}
                        color={btnHovered ? "#333333" : "#1c1c1c"}
                        font="/fonts/SmileySans-Oblique.ttf"
                        anchorX="center"
                        anchorY="middle"
                        fillOpacity={0} // Start hidden
                    >
                        返回画廊
                    </Text>

                    {/* 第 3 层：覆盖整个按钮的隐形点击区 - 捕获所有事件 */}
                    <mesh
                        position={[0, 0, 0.02]}
                        onClick={(e) => {
                            if (isSelected && !isTransitioning) {
                                e.stopPropagation();
                                // POLARIS 版：不再新开网页，返回上一级（关闭详情，回到画廊浏览视图）
                                onClick(index);
                            }
                        }}
                        onPointerEnter={(e) => {
                            if (isSelected && !isTransitioning) {
                                e.stopPropagation();
                                setBtnHovered(true);
                            }
                        }}
                        onPointerLeave={(e) => {
                            if (isSelected && !isTransitioning) {
                                e.stopPropagation();
                            }
                            setBtnHovered(false);
                        }}
                    >
                        <planeGeometry args={[1.2, 1.2 / 3.613]} />
                        <meshBasicMaterial color="#e0e0e0" transparent={true} opacity={0} />
                    </mesh>
                </group>

                {/* === TEKST NA PLECACH KARTKI (PROJECT DETAILS) === */}
                <group
                    ref={detailsGroupRef}
                    position={[0, -0.5, 0]} // 上方位置（Y=0.75 为下，Y=-0.4 为上）
                    rotation={[Math.PI, 0, 0]}
                >
                    <Text
                        ref={detailsTextRef1}
                        position={[0, 0.28, 0.01]} // 相对 detailsGroupRef 中心，更高
                        fontSize={0.10}
                        color="#1c1c1c"
                        font="/fonts/SmileySans-Oblique.ttf"
                        anchorX="center"
                        anchorY="middle"
                        fillOpacity={0} // Start hidden
                    >
                        {/* POLARIS 版：项目卡显示「项目详情」，照片卡显示「时光留影」 */}
                        {project.url ? '项目详情' : '时光留影'}
                    </Text>

                    <Text
                        ref={detailsTextRef2}
                        position={[0, 0.2, 0.01]} // 标题下方
                        fontSize={0.06}
                        color="#333333"
                        font="/fonts/SmileySans-Oblique.ttf"
                        anchorX="center"
                        anchorY="top"
                        maxWidth={1.1} // 开始换行前的最大宽度
                        lineHeight={1.4}
                        textAlign="center"
                        fillOpacity={0} // Start hidden
                    >
                        {wrapZh(project.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.", 16)}
                    </Text>
                </group>

                {/* === SEKCJA TECH STACK NA PLECACH KARTKI === */}
                {/* POLARIS 版：项目卡显示「技术栈」+ 4 个图标；照片卡（纯展示）改为古代诗词名句装饰 */}
                <group
                    ref={techStackGroupRef}
                    position={[0, 0.30, 0]} // 在 Project Details 与 Open Project 按钮之间
                    rotation={[Math.PI, 0, 0]}
                >
                    {project.url ? (
                        <>
                        <Text
                            ref={techTextRef}
                            position={[0, 0.15, 0.01]}
                            fontSize={0.08}
                            color="#1c1c1c"
                            font="/fonts/SmileySans-Oblique.ttf"
                            anchorX="center"
                            anchorY="middle"
                            fillOpacity={0} // Start hidden
                        >
                            技术栈
                        </Text>

                        {/* 水平排列 logo 的容器 */}
                        <group position={[0, -0.05, 0.01]}>
                            {project.techStack && project.techStack.map((logoPath, idx) => {
                                // 方块排列（4 个居中）
                                const spacing = 0.30;
                                const startX = -((project.techStack.length - 1) * spacing) / 2;
                                const xPos = startX + (idx * spacing);

                                return (
                                    <TechStackLogo key={idx} path={logoPath} position={[xPos, 0, 0]} />
                                );
                            })}
                        </group>
                        </>
                    ) : (
                        <>
                        {/* 羊皮卷诗词文本框（照片卡）：替代原 4 个图标框位置 */}
                        {/* 1. 深褐边框垫底 */}
                        <mesh position={[0, 0, 0.004]}>
                            <planeGeometry args={[1.38, 0.66]} />
                            <meshBasicMaterial color="#6b4a2f" />
                        </mesh>
                        {/* 2. 米色羊皮纸底 */}
                        <mesh position={[0, 0, 0.008]}>
                            <planeGeometry args={[1.3, 0.58]} />
                            <meshBasicMaterial color="#f3e6c9" />
                        </mesh>
                        {/* 3. 诗句第一行（毛笔楷体） */}
                        <Text
                            ref={techTextRef}
                            position={[0, 0.14, 0.012]}
                            fontSize={0.095}
                            color="#4a3220"
                            font="/fonts/SmileySans-Oblique.ttf"
                            anchorX="center"
                            anchorY="middle"
                            fillOpacity={0} // Start hidden
                        >
                            {poemLine1}
                        </Text>
                        {/* 4. 诗句第二行（毛笔楷体） */}
                        <Text
                            ref={poemLine2Ref}
                            position={[0, -0.02, 0.012]}
                            fontSize={0.095}
                            color="#4a3220"
                            font="/fonts/SmileySans-Oblique.ttf"
                            anchorX="center"
                            anchorY="middle"
                            fillOpacity={0} // Start hidden
                        >
                            {poemLine2}
                        </Text>
                        {/* 5. 出处落款 */}
                        <Text
                            ref={poemSourceRef}
                            position={[0, -0.2, 0.012]}
                            fontSize={0.06}
                            color="#6b4a2f"
                            font="/fonts/SmileySans-Oblique.ttf"
                            anchorX="center"
                            anchorY="middle"
                            fillOpacity={0} // Start hidden
                        >
                            {project.poem?.source || ''}
                        </Text>
                        </>
                    )}
                </group>

                {/* 
                  === 项目文字 / 标题 ===
                  这里可以轻松调整每处文字的外观。
                  
                  position: [X, Y, Z] 
                  > X 为左/右（0 为居中）
                  > Y 为上/下（如 0.75 为纸张顶部，-0.75 底部）
                  > Z 不要动。上方脚本会自动计算 Z，使文字贴合纸张波浪弯折！
                  
                  fontSize：字号（默认 0.15）
                  color: kolor napisu
                  font：可选，从 /public/fonts/ 指定其他字体
                */}
                <Text
                    ref={textRef}
                    position={[0, 0.7, 0]} // 这里只有前两个参数 [X, Y] 有意义
                    fontSize={0.20}
                    color="#1c1c1c"
                    font="/fonts/SmileySans-Oblique.ttf"
                    anchorX="center"
                    anchorY="middle"
                    maxWidth={1.3}
                    lineHeight={1.15}
                    textAlign="center"
                    fillOpacity={0} // Start hidden
                >
                    {'' /* POLARIS 版：正面不放标题文字，保持图片干净；标题只在背面展示 */}
                </Text>

                <PositionalAudio
                    ref={paperAudioRef}
                    url="/sounds/papersound.mp3"
                    distanceModel="exponential"
                    rolloffFactor={GALLERY_INTERACTION_AUDIO_SETTINGS.rolloff}
                    refDistance={GALLERY_INTERACTION_AUDIO_SETTINGS.distance}
                    loop={false}
                />
            </group>
        </group>
    );
}));


// Component to handle the cropped right-side houses
const RightSideHouses = ({ texture, baseWidth, baseHeight, cropAmount }) => {
    // Clone texture to allow independent UV manipulation
    const croppedTexture = useMemo(() => {
        const t = texture.clone();
        // Because scale.x is -1 (mirrored), the "Right" side in world space
        // corresponds to the "Left" side of the texture (U=0).
        // To crop the world-right side, we need to crop the texture-left side.
        // So we increase offset.x.
        t.offset.x = cropAmount;
        t.repeat.x = 1 - cropAmount;
        t.needsUpdate = true;
        return t;
    }, [texture, cropAmount]);

    // Calculate new width and position
    const newWidth = baseWidth * (1 - cropAmount);

    // Original Inner Edge (World Left of this mesh) was at CenterX - Width/2
    // For the Right Side Mesh: 
    // Original Pos = 15. Width = 15.
    // Inner Edge = 15 - 7.5 = 7.5.
    // We want to keep Inner Edge at 7.5.
    // New Center = Inner Edge + NewWidth / 2
    const newX = 7.5 + (newWidth / 2);

    return (
        <mesh position={[newX, -1, -9]} scale={[-1, 1, 1]}>
            <planeGeometry args={[newWidth, baseHeight]} />
            <meshBasicMaterial color="#e0e0e0"
                map={croppedTexture}
                transparent={true}
                alphaTest={0.1}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
};

// Sub-component for individual tech stack logos
const TechStackLogo = ({ path, position }) => {
    const texture = useTexture(path);

    return (
        <group position={position}>
            {/* 图标底板框（浅米色格） */}
            <mesh>
                <planeGeometry args={[0.22, 0.22]} />
                <meshBasicMaterial color="#f5f0e6" />
            </mesh>
            {/* 图标 */}
            <mesh position={[0, 0, 0.005]}>
                <planeGeometry args={[0.15, 0.15]} />
                <meshBasicMaterial color="#ffffff"
                    map={texture}
                    transparent={true}
                />
            </mesh>
        </group>
    );
};

export default GalleryRoom;
