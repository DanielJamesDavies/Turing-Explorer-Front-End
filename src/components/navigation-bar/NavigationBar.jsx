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

	return (
		<div className='navigation-bar'>
			<div className='navigation-bar-buttons'>
				{console.log(window.location)}
				<button
					className={
						"navigation-bar-button" +
						(window.location?.pathname?.split("/")?.filter((e) => e?.length !== 0)?.length === 0 ? " navigation-bar-button-active" : "")
					}
					onClick={() => navigate("")}
				>
					Home
				</button>
				<button
					className={
						"navigation-bar-button" +
						(window.location?.pathname?.split("/")?.filter((e) => e?.length !== 0)?.[0] === "download"
							? " navigation-bar-button-active"
							: "")
					}
					onClick={() => navigate("/download")}
				>
					Download Tool
				</button>
				<button
					className={
						"navigation-bar-button" +
						(window.location?.pathname?.split("/")?.filter((e) => e?.length !== 0)?.[0] === "technical-reports"
							? " navigation-bar-button-active"
							: "")
					}
					onClick={() => navigate("/technical-reports")}
				>
					Technical Reports
				</button>
			</div>
		</div>
	);
};
