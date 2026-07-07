import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const BOUNDS = { x: 14, y: 2.2, z: 14 };

function createDustTexture() {
	const size = 64;
	const canvas = document.createElement("canvas");
	canvas.width = size;
	canvas.height = size;
	const ctx = canvas.getContext("2d");
	const gradient = ctx.createRadialGradient(
		size / 2,
		size / 2,
		0,
		size / 2,
		size / 2,
		size / 2,
	);
	gradient.addColorStop(0, "rgba(255,255,255,1)");
	gradient.addColorStop(0.4, "rgba(255,255,255,0.5)");
	gradient.addColorStop(1, "rgba(255,255,255,0)");
	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, size, size);
	return new THREE.CanvasTexture(canvas);
}

export default function MazeParticles() {
	const { count, size, opacity, speed, wander, color, dirX, dirZ, position } =
		useControls("Dust", {
			count: { value: 500, min: 20, max: 1200, step: 10 },
			size: { value: 1, min: 0.01, max: 0.4, step: 0.01 },
			opacity: { value: 0.55, min: 0, max: 1, step: 0.05 },
			speed: { value: 0.3, min: 0, max: 2, step: 0.05 },
			wander: { value: 0.25, min: 0, max: 2, step: 0.05 },
			color: "#f2d9b0",
			dirX: { value: 1, min: -1, max: 1, step: 0.05 },
			dirZ: { value: 0.35, min: -1, max: 1, step: 0.05 },
			position: { value: [0, 0, 0], step: 0.1 },
		});

	const texture = useMemo(() => createDustTexture(), []);
	const pointsRef = useRef(null);

	const { positions, seeds } = useMemo(() => {
		const positions = new Float32Array(count * 3);
		const seeds = new Float32Array(count * 3);
		for (let i = 0; i < count; i++) {
			positions[i * 3] = (Math.random() * 2 - 1) * BOUNDS.x;
			positions[i * 3 + 1] = Math.random() * BOUNDS.y;
			positions[i * 3 + 2] = (Math.random() * 2 - 1) * BOUNDS.z;
			seeds[i * 3] = Math.random() * Math.PI * 2;
			seeds[i * 3 + 1] = Math.random() * Math.PI * 2;
			seeds[i * 3 + 2] = 0.5 + Math.random();
		}
		return { positions, seeds };
	}, [count]);

	useFrame((state, delta) => {
		const geo = pointsRef.current?.geometry;
		if (!geo) return;

		const posAttr = geo.attributes.position;
		const arr = posAttr.array;
		const t = state.clock.elapsedTime;

		const dirLen = Math.hypot(dirX, dirZ) || 1;
		const dx = (dirX / dirLen) * speed;
		const dz = (dirZ / dirLen) * speed;

		for (let i = 0; i < count; i++) {
			const ix = i * 3;
			const phaseA = seeds[ix];
			const phaseB = seeds[ix + 1];
			const rate = seeds[ix + 2];

			arr[ix] += dx * delta + Math.sin(t * rate + phaseA) * wander * delta;
			arr[ix + 1] +=
				Math.cos(t * rate * 0.6 + phaseB) * wander * 0.25 * delta;
			arr[ix + 2] += dz * delta + Math.cos(t * rate + phaseA) * wander * delta;

			if (arr[ix] > BOUNDS.x) arr[ix] = -BOUNDS.x;
			if (arr[ix] < -BOUNDS.x) arr[ix] = BOUNDS.x;
			if (arr[ix + 2] > BOUNDS.z) arr[ix + 2] = -BOUNDS.z;
			if (arr[ix + 2] < -BOUNDS.z) arr[ix + 2] = BOUNDS.z;
			if (arr[ix + 1] > BOUNDS.y) arr[ix + 1] = 0;
			if (arr[ix + 1] < 0) arr[ix + 1] = BOUNDS.y;
		}

		posAttr.needsUpdate = true;
	});

	return (
		<group position={position}>
			<points ref={pointsRef}>
				<bufferGeometry>
					<bufferAttribute
						key={count}
						attach="attributes-position"
						count={count}
						array={positions}
						itemSize={3}
					/>
				</bufferGeometry>
				<pointsMaterial
					map={texture}
					size={size}
					color={color}
					transparent
					opacity={opacity}
					depthWrite={false}
					blending={THREE.AdditiveBlending}
					sizeAttenuation
				/>
			</points>
		</group>
	);
}
