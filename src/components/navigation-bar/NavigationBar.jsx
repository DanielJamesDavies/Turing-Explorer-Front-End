// Packages
import { useLocation, useNavigate } from "react-router-dom";

// Components

// Logic

// Context

// Services

// Styles
import "./NavigationBar.css";

// Assets

export const NavigationBar = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const navigateToPage = (e, path) => {
		e.preventDefault();
		if (e?.button === 1) return window.open(window?.location?.origin + path, "_blank");
		navigate(path);
		if (location?.pathname === path) {
			navigate("/blank");
			setTimeout(() => navigate(path), 1);
		}
	};

	return (
		<div className='navigation-bar-container'>
			<div className='navigation-bar'>
				<a
					href='/'
					rel='noopener noreferrer'
					onMouseDown={(e) => e?.preventDefault()}
					onClick={(e) => navigateToPage(e, "")}
					onAuxClick={(e) => navigateToPage(e, "")}
				>
					<button className='navigation-bar-title' onMouseDown={(e) => e?.preventDefault()}>
						<img src='images/turing.png' />
						<span>Turing Explorer</span>
					</button>
				</a>
				<div className='navigation-bar-buttons'>
					<a
						href='/'
						rel='noopener noreferrer'
						onMouseDown={(e) => e?.preventDefault()}
						onClick={(e) => navigateToPage(e, "")}
						onAuxClick={(e) => navigateToPage(e, "")}
					>
						<button className='navigation-bar-title' onMouseDown={(e) => e?.preventDefault()}>
							<img src='images/turing.png' />
						</button>
					</a>
					<a
						href='/explore'
						rel='noopener noreferrer'
						onMouseDown={(e) => e?.preventDefault()}
						onClick={(e) => navigateToPage(e, "/explore")}
						onAuxClick={(e) => navigateToPage(e, "/explore")}
					>
						<button
							className={
								"navigation-bar-button" +
								(window.location?.pathname?.split("/")?.filter((e) => e?.length !== 0)?.[0] === "explore"
									? " navigation-bar-button-active"
									: "")
							}
							onMouseDown={(e) => e?.preventDefault()}
						>
							Explore
						</button>
					</a>
					<a
						href='/inference'
						rel='noopener noreferrer'
						onMouseDown={(e) => e?.preventDefault()}
						onClick={(e) => navigateToPage(e, "/inference")}
						onAuxClick={(e) => navigateToPage(e, "/inference")}
					>
						<button
							className={
								"navigation-bar-button" +
								(window.location?.pathname?.split("/")?.filter((e) => e?.length !== 0)?.[0] === "inference"
									? " navigation-bar-button-active"
									: "")
							}
							onMouseDown={(e) => e?.preventDefault()}
						>
							Inference
						</button>
					</a>
					<a
						href='/research'
						rel='noopener noreferrer'
						onMouseDown={(e) => e?.preventDefault()}
						onClick={(e) => navigateToPage(e, "/research")}
						onAuxClick={(e) => navigateToPage(e, "/research")}
					>
						<button
							className={
								"navigation-bar-button" +
								(window.location?.pathname?.split("/")?.filter((e) => e?.length !== 0)?.[0] === "research"
									? " navigation-bar-button-active"
									: "")
							}
							onMouseDown={(e) => e?.preventDefault()}
						>
							Research
						</button>
					</a>
					<a
						href='/author'
						rel='noopener noreferrer'
						onMouseDown={(e) => e?.preventDefault()}
						onClick={(e) => navigateToPage(e, "/author")}
						onAuxClick={(e) => navigateToPage(e, "/author")}
					>
						<button
							className={
								"navigation-bar-button" +
								(window.location?.pathname?.split("/")?.filter((e) => e?.length !== 0)?.[0] === "author"
									? " navigation-bar-button-active"
									: "")
							}
							onMouseDown={(e) => e?.preventDefault()}
						>
							Author
						</button>
					</a>
				</div>
			</div>
		</div>
	);
};
