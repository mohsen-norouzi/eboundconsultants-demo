import { ArrowIcon } from "./icons";

export default function Hero() {
	return (
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

				<p
					data-reveal
					className="mt-6 max-w-md text-[15px] leading-relaxed text-ink/60"
				>
					We partner with ambitious businesses to align strategy, finance,
					operations and brand — turning complexity into sustainable growth.
				</p>

				<div data-reveal className="mt-9 flex items-center gap-7">
					<button
						type="button"
						className="pointer-events-auto group flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-[15px] text-cream transition-opacity hover:opacity-85"
					>
						Start the Journey
						<ArrowIcon className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
					</button>
					<button
						type="button"
						className="pointer-events-auto group flex items-center gap-1.5 text-[15px] font-medium text-ink"
					>
						See Our Approach
						<ArrowIcon className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
					</button>
				</div>
			</div>
		</div>
	);
}
