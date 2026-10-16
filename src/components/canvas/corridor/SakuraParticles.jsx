import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ============================================
// 樱花花瓣飘落粒子（入口 + 无限走廊通用氛围层）
// 花瓣贴图程序化生成（无需外部资源），随镜头 Z 无限循环
// ============================================
const PETAL_COUNT = 70;
const X_SPREAD = 16;          // 左右分布宽度
const Y_WRAP = 18;            // 垂直循环高度
const Z_BEHIND = 6;           // 花瓣可出现在镜头后方多少米
const Z_AHEAD = 45;           // 前方覆盖多少米
const PETAL_COLORS = ['#f7c8d8', '#f2b7cc', '#ffffff', '#fde8ef'];

// 程序化画一片手绘感花瓣（带缺口的樱花瓣）
function makePetalTexture(color) {
    const size = 64;
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext('2d');
    ctx.translate(size / 2, size / 2);

    // 花瓣主体
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(0, size * 0.36);
    ctx.bezierCurveTo(-size * 0.42, size * 0.1, -size * 0.34, -size * 0.38, 0, -size * 0.3);
    ctx.bezierCurveTo(size * 0.34, -size * 0.38, size * 0.42, size * 0.1, 0, size * 0.36);
    ctx.fill();

    // 中心小缺口（樱花瓣特征）
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(0, -size * 0.3, size * 0.09, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';

    // 中脉淡线
    ctx.strokeStyle = 'rgba(255,255,255,0.55)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, -size * 0.2);
    ctx.quadraticCurveTo(size * 0.03, 0, 0, size * 0.3);
    ctx.stroke();

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
}

const generatePetals = () => {
    const petals = [];
    for (let i = 0; i < PETAL_COUNT; i++) {
        petals.push({
            id: i,
            x: (Math.random() - 0.5) * X_SPREAD,
            y: (Math.random() - 0.5) * Y_WRAP,
            zOffset: Math.random() * (Z_AHEAD + Z_BEHIND) - Z_BEHIND, // 相对镜头的 Z
            scale: 0.05 + Math.random() * 0.09,
            fallSpeed: 0.25 + Math.random() * 0.45,
            swayAmp: 0.3 + Math.random() * 0.6,
            swaySpeed: 0.5 + Math.random() * 0.8,
            phase: Math.random() * Math.PI * 2,
            spin: (Math.random() - 0.5) * 1.6,
            opacity: 0.35 + Math.random() * 0.4,
            colorIdx: Math.floor(Math.random() * PETAL_COLORS.length),
        });
    }
    return petals;
};

const SakuraParticles = () => {
    const petals = useMemo(() => generatePetals(), []);
    const textures = useMemo(
        () => PETAL_COLORS.map(makePetalTexture),
        []
    );
    const meshRefs = useRef([]);
    const yOffsets = useRef(petals.map(() => 0));

    useFrame((state, delta) => {
        const time = state.clock.elapsedTime;
        const camZ = state.camera.position.z;
        const camY = state.camera.position.y;

        petals.forEach((p, i) => {
            const mesh = meshRefs.current[i];
            if (!mesh) return;

            // 飘落 + 循环
            yOffsets.current[i] -= p.fallSpeed * delta;
            let localY = p.y + yOffsets.current[i];
            const baseY = camY; // 以镜头高度为循环中心
            while (localY - baseY < -Y_WRAP / 2) { yOffsets.current[i] += Y_WRAP; localY += Y_WRAP; }
            while (localY - baseY > Y_WRAP / 2) { yOffsets.current[i] -= Y_WRAP; localY -= Y_WRAP; }

            // 左右摇摆
            const sway = Math.sin(time * p.swaySpeed + p.phase) * p.swayAmp;

            // Z 跟随镜头（无限走廊里镜头一直往前飞）
            let z = camZ - p.zOffset;

            mesh.position.set(p.x + sway, localY, z);
            mesh.rotation.z = p.phase + time * p.spin;
            mesh.rotation.y = Math.sin(time * 0.4 + p.phase) * 0.6;
        });
    });

    return (
        <group>
            {petals.map((p, i) => (
                <mesh
                    key={p.id}
                    ref={(el) => { meshRefs.current[i] = el; }}
                    position={[p.x, p.y, 0]}
                >
                    <planeGeometry args={[p.scale, p.scale]} />
                    <meshBasicMaterial
                        map={textures[p.colorIdx]}
                        transparent
                        opacity={p.opacity}
                        depthWrite={false}
                        side={THREE.DoubleSide}
                    />
                </mesh>
            ))}
        </group>
    );
};

export default SakuraParticles;
