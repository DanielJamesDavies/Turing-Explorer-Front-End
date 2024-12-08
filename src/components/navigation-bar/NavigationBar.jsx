// Packages
import { useNavigate } from "react-router-dom";

// Components

// Logic

// Context

// Services

// Styles
import "./NavigationBar.css";

// Assets

export const NavigationBar = () => {
	const navigate = useNavigate();

	const navigateToPage = (e, path) => {
		if (e?.button === 1) return window.open(window?.location?.origin + path, "_blank");
		navigate(path);
	};

	return (
		<div className='navigation-bar-container'>
			<div className='navigation-bar'>
				<button className='navigation-bar-title' onMouseDown={(e) => e?.preventDefault()} onClick={(e) => navigateToPage(e, "")}>
					<img src='/images/turing.png' />
					<span>Turing Explorer</span>
				</button>
				<div className='navigation-bar-buttons'>
					<button
						className={
							"navigation-bar-button" +
							(window.location?.pathname?.split("/")?.filter((e) => e?.length !== 0)?.[0] === "explore"
								? " navigation-bar-button-active"
								: "")
						}
						onMouseDown={(e) => e?.preventDefault()}
						onClick={(e) => navigateToPage(e, "/explore")}
						onAuxClick={(e) => navigateToPage(e, "/explore")}
					>
						Explore
					</button>
					<button
						className={
							"navigation-bar-button" +
							(window.location?.pathname?.split("/")?.filter((e) => e?.length !== 0)?.[0] === "inference"
								? " navigation-bar-button-active"
								: "")
						}
						onMouseDown={(e) => e?.preventDefault()}
						onClick={(e) => navigateToPage(e, "/inference")}
						onAuxClick={(e) => navigateToPage(e, "/inference")}
					>
						Inference
					</button>
					<button
						className={
							"navigation-bar-button" +
							(window.location?.pathname?.split("/")?.filter((e) => e?.length !== 0)?.[0] === "research"
								? " navigation-bar-button-active"
								: "")
						}
						onMouseDown={(e) => e?.preventDefault()}
						onClick={(e) => navigateToPage(e, "/research")}
						onAuxClick={(e) => navigateToPage(e, "/research")}
					>
						Research
					</button>
					<button
						className={
							"navigation-bar-button" +
							(window.location?.pathname?.split("/")?.filter((e) => e?.length !== 0)?.[0] === "author"
								? " navigation-bar-button-active"
								: "")
						}
						onMouseDown={(e) => e?.preventDefault()}
						onClick={() => navigate("/author")}
						onAuxClick={() => navigate("/author")}
					>
						Author
					</button>
				</div>
			</div>
		</div>
	);
};
