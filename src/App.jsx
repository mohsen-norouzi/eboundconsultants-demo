import gsap from "gsap";
import { useEffect, useRef } from "react";
import "./App.css";
import Hero from "./components/Hero";
import HeroScene from "./components/HeroScene";
import Nav from "./components/Nav";

function App() {
	const heroRef = useRef(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.from("[data-nav]", {
				y: -16,
				opacity: 0,
				duration: 0.7,
				ease: "power3.out",
			});
			gsap.from("[data-reveal]", {
				y: 24,
				opacity: 0,
				duration: 0.8,
				ease: "power3.out",
				stagger: 0.12,
				delay: 0.2,
			});
		}, heroRef);

		return () => ctx.revert();
	}, []);

	return (
		<section
			ref={heroRef}
			className="relative min-h-screen w-full overflow-hidden bg-cream font-sans"
		>
			<HeroScene />

			<div
				className="pointer-events-none absolute inset-y-0 left-0 w-[42%]"
				style={{
					background:
						"linear-gradient(to right, #ede8e0 0%, #ede8e0 25%, transparent 100%)",
				}}
			/>

			<div className="pointer-events-none relative z-10 flex min-h-screen flex-col">
				<Nav />
				<Hero />
			</div>
		</section>
	);
}

export default App;
