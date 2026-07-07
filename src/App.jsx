import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./App.css";

function ArrowIcon({ className }) {
	return (
		<svg
			className={className}
			width="14"
			height="14"
			viewBox="0 0 14 14"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
		>
			<path
				d="M3 11L11 3M11 3H4.5M11 3V9.5"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

function LogoMark() {
	return (
		<svg
			width="28"
			height="28"
			viewBox="0 0 28 28"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
		>
			<path
				d="M11 4H8a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h3"
				stroke="currentColor"
				strokeWidth="1.6"
				strokeLinecap="round"
			/>
			<path
				d="M12 13.2h5.5"
				stroke="currentColor"
				strokeWidth="1.6"
				strokeLinecap="round"
			/>
		</svg>
	);
}

const NAV_LINKS = ["Services", "About us", "Our Team", "Contact"];

function App() {
	const heroRef = useRef(null);
	const tiltRef = useRef(null);

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

	useEffect(() => {
		const section = heroRef.current;
		const el = tiltRef.current;
		if (!section || !el) return;

		const maxShift = 18; // px

		const xTo = gsap.quickTo(el, "x", { duration: 1.2, ease: "power3.out" });
		const yTo = gsap.quickTo(el, "y", { duration: 1.2, ease: "power3.out" });

		const handleMove = (e) => {
			const rect = section.getBoundingClientRect();
			const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
			const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;

			xTo(nx * maxShift);
			yTo(ny * maxShift);
		};

		const handleLeave = () => {
			xTo(0);
			yTo(0);
		};

		section.addEventListener("mousemove", handleMove);
		section.addEventListener("mouseleave", handleLeave);

		const idle = gsap.timeline({
			repeat: -1,
			yoyo: true,
			defaults: { duration: 10, ease: "sine.inOut" },
		});
		idle.to(el, { scale: 1.03, rotation: 1.2 }, 0);

		return () => {
			section.removeEventListener("mousemove", handleMove);
			section.removeEventListener("mouseleave", handleLeave);
			idle.kill();
			gsap.killTweensOf(el);
		};
	}, []);

	return (
		<section
			ref={heroRef}
			className="relative min-h-screen w-full overflow-hidden bg-cream font-sans"
		>
			<div className="pointer-events-none absolute inset-y-0 right-0 w-[75%] overflow-hidden">
				<div
					ref={tiltRef}
					className="absolute inset-[-4%] will-change-transform"
				>
					<img
						src="/img/maze-3.png"
						alt=""
						className="h-full w-full object-cover object-right"
						style={{
							maskImage:
								"linear-gradient(to right, transparent 0%, black 60%)",
							WebkitMaskImage:
								"linear-gradient(to right, transparent 0%, black 60%)",
						}}
					/>
				</div>
			</div>

			<div
				className="pointer-events-none absolute inset-y-0 left-0 w-[55%]"
				style={{
					background:
						"linear-gradient(to right, #ede8e0 0%, #ede8e0 35%, transparent 100%)",
				}}
			/>

			<div className="relative z-10 flex min-h-screen flex-col">
				<nav
					data-nav
					className="flex items-center justify-between px-8 py-7 lg:px-16"
				>
					<div className="flex items-center gap-2 text-ink">
						<LogoMark />
						<span className="font-serif text-2xl">eBound</span>
					</div>

					<div className="hidden items-center gap-9 text-[15px] text-ink/90 md:flex">
						{NAV_LINKS.map((link) => (
							<button
								key={link}
								type="button"
								className="transition-colors hover:text-ink"
							>
								{link}
							</button>
						))}
					</div>

					<div className="flex items-center gap-4">
						<span className="hidden h-5 w-px bg-ink/15 md:block" />
						<button
							type="button"
							className="group flex items-center gap-1.5 text-[15px] font-medium text-ink"
						>
							Let's Talk
							<ArrowIcon className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
						</button>
					</div>
				</nav>

				<div className="flex flex-1 items-center px-8 lg:px-16">
					<div className="max-w-xl">
						<p
							data-reveal
							className="text-xs font-semibold uppercase tracking-[0.16em] text-gold"
						>
							Business Transformation
						</p>

						<h1
							data-reveal
							className="mt-5 font-serif text-6xl leading-[1.08] text-ink lg:text-[64px]"
						>
							Navigate complexity.
							<br />
							Create value.
						</h1>

						<p data-reveal className="mt-6 max-w-md text-[15px] leading-relaxed text-ink/60">
							We partner with ambitious businesses to align strategy,
							finance, operations and brand — turning complexity into
							sustainable growth.
						</p>

						<div data-reveal className="mt-9 flex items-center gap-7">
							<button
								type="button"
								className="group flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-[15px] text-cream transition-opacity hover:opacity-85"
							>
								Start the Journey
								<ArrowIcon className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
							</button>
							<button
								type="button"
								className="group flex items-center gap-1.5 text-[15px] font-medium text-ink"
							>
								See Our Approach
								<ArrowIcon className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default App;
