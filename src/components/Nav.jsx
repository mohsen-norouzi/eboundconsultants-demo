import { ArrowIcon, LogoMark } from "./icons";

const NAV_LINKS = ["Services", "About us", "Our Team", "Contact"];

export default function Nav() {
	return (
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
						className="pointer-events-auto transition-colors hover:text-ink"
					>
						{link === "Our Team" ? (
							<>
								Our <span className="text-gold">Team</span>
							</>
						) : (
							link
						)}
					</button>
				))}
			</div>

			<div className="flex items-center gap-4">
				<span className="hidden h-5 w-px bg-ink/15 md:block" />
				<button
					type="button"
					className="pointer-events-auto group flex items-center gap-1.5 text-[15px] font-medium text-ink"
				>
					Let's Talk
					<ArrowIcon className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
				</button>
			</div>
		</nav>
	);
}
