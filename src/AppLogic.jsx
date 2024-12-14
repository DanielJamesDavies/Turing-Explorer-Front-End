// Packages
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// Components

// Logic

// Context
// Services

// Styles

// Assets

export const AppLogic = () => {
	const location = useLocation();
	const { pathname } = useLocation();
	const [pageName, setPageName] = useState(window.location?.pathname?.split("/")?.filter((e) => e?.length !== 0)?.[0] || "home");

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	useEffect(() => {
		let newPageName = "app-page-" + (window.location?.pathname?.split("/")?.filter((e) => e?.length !== 0)?.[0] || "home");
		if (window.location?.pathname?.split("/")?.filter((e) => e?.length !== 0)?.length > 1) {
			newPageName += " " + newPageName + "-subpage";
		}
		setPageName(newPageName);
	}, [location]);

	useEffect(() => {
		const preloadImages = (sources) => {
			sources.forEach((src) => {
				const img = new Image();
				img.src = src;
			});
		};
		const images = [
			"/images/turing.png",
			"/research-papers/turing-llm-1.0/cover/bg.png",
			"/research-papers/turing-llm-1.0/cover/img1.png",
			"/research-papers/turing-llm-1.0/cover/img2.png",
			"/research-papers/topk-sparse-autoencoders/cover/bg.png",
			"/research-papers/topk-sparse-autoencoders/cover/img1.png",
			"/research-papers/latent-connections/cover/bg.png",
			"/research-papers/latent-connections/cover/img1.png",
		];
		preloadImages(images);
	}, []);

	return { pageName };
};
