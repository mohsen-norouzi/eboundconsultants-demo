import { Center, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useRef } from "react";
import { DEG2RAD } from "three/src/math/MathUtils.js";

const SHOW_CONTROLS = false;

export default function Maze() {
	const { nodes } = useGLTF("/img/maze3d.glb");
	const group = useRef(null);

	const { position, rotation, color } = useControls("Maze", {
		position: { value: [0, 0.5, 0], step: 0.1, render: () => SHOW_CONTROLS },
		rotation: { value: [0, 0, 0], step: 1, render: () => SHOW_CONTROLS },
		color: { value: "#dad2c0", render: () => SHOW_CONTROLS },
		render: () => SHOW_CONTROLS,
	});

	useFrame((state, delta) => {
		const el = group.current;
		if (!el) return;

		const damp = Math.min(delta * 3, 1);
		const idle = Math.sin(state.clock.elapsedTime * 0.3) * 0.02;

		const targetRotY = state.pointer.x * 0.09;
		const targetRotX = -state.pointer.y * 0.06;

		el.rotation.y += (targetRotY - el.rotation.y) * damp;
		el.rotation.x += (targetRotX - el.rotation.x) * damp;
		el.rotation.z += (idle - el.rotation.z) * delta;
	});

	return (
		<group position={position} rotation={rotation.map((deg) => deg * DEG2RAD)}>
			<group ref={group}>
				<Center bottom>
					<mesh geometry={nodes.Maze.geometry} castShadow receiveShadow>
						<meshStandardMaterial
							color={color}
							roughness={0.85}
							metalness={0.05}
						/>
					</mesh>
					{/* <MazeParticles /> */}
				</Center>
			</group>
		</group>
	);
}

useGLTF.preload("/img/maze3d.glb");
