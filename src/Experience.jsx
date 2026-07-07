import { Bounds, SoftShadows } from "@react-three/drei";
import { useControls } from "leva";
import { Perf } from "r3f-perf";
import Maze from "./components/maze";

const SHOW_CONTROLS = false;

export default function Experience() {
	const { position, rotation, color } = useControls("Light", {
		position: { value: [14, 22, -30], step: 0.1, render: () => SHOW_CONTROLS },
		rotation: { value: [0, 0, 0], step: 1, render: () => SHOW_CONTROLS },
		color: { value: "#fff2da", render: () => SHOW_CONTROLS },
	});

	return (
		<>
			<Perf />

			<SoftShadows size={20} samples={10} focus={0.6} />

			<hemisphereLight args={["#fff6ea", "#3a2f22", 0.6]} />
			<directionalLight
				position={position}
				rotation={rotation}
				intensity={1.6}
				color={color}
				castShadow
				shadow-mapSize={[2048, 2048]}
				shadow-camera-left={-22}
				shadow-camera-right={22}
				shadow-camera-top={22}
				shadow-camera-bottom={-22}
				shadow-camera-near={1}
				shadow-camera-far={70}
				shadow-bias={-0.0004}
			/>
			<directionalLight
				position={[-16, 10, -12]}
				intensity={0.3}
				color="#cfe0ff"
			/>
			<pointLight
				position={[5, 6, 4]}
				intensity={10}
				color="#e8b672"
				distance={18}
				decay={2}
			/>

			<Bounds fit clip observe margin={1.02}>
				<Maze />
			</Bounds>

			<mesh
				rotation={[-Math.PI / 2, 0, 0]}
				position={[0, -0.01, 0]}
				receiveShadow
			>
				<planeGeometry args={[90, 90]} />
				<meshStandardMaterial color="#e7e1d2" roughness={0.95} />
			</mesh>

			<fog attach="fog" args={["#ede8e0", 30, 80]} />
		</>
	);
}
