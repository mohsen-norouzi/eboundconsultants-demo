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

function MenuIcon() {
	return (
		<svg
			width="16"
			height="16"
			viewBox="0 0 16 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
		>
			<path
				d="M2 4.5H14M2 8H14M2 11.5H14"
				stroke="currentColor"
				strokeWidth="1.3"
				strokeLinecap="round"
			/>
		</svg>
	);
}

const NAV_LINKS = ["What We Do", "Approach", "About Us", "Insights"];

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
			<img
				src="/img/hero.png"
				alt=""
				className="pointer-events-none absolute inset-0 h-full w-full object-cover"
			/>

			<div className="relative z-10 flex min-h-screen flex-col">
				<nav
					data-nav
					className="flex items-center justify-between px-8 py-7 lg:px-16"
				>
					<div className="font-serif text-2xl text-ink">eBound</div>

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

					<div className="flex items-center gap-3">
						<button
							type="button"
							className="rounded-full bg-ink px-5 py-2.5 text-[15px] text-cream transition-opacity hover:opacity-85"
						>
							Let's Talk
						</button>
						<button
							type="button"
							aria-label="Open menu"
							className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:bg-ink/5"
						>
							<MenuIcon />
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
