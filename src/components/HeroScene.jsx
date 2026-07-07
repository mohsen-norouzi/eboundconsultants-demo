import { Canvas } from "@react-three/fiber";
import Experience from "../Experience";

export default function HeroScene() {
	return (
		<div className="absolute inset-y-0 right-0 w-[82%] overflow-hidden">
			<div
				className="h-full w-full"
				style={{
					maskImage: "linear-gradient(to right, transparent 0%, black 42%)",
					WebkitMaskImage:
						"linear-gradient(to right, transparent 0%, black 42%)",
				}}
			>
				<Canvas
					shadows
					dpr={[1, 2]}
					gl={{ antialias: true, alpha: true }}
					camera={{ position: [10, 8, 10], fov: 30 }}
				>
					<Experience />
				</Canvas>
			</div>
		</div>
	);
}
