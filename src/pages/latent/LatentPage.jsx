// Packages
import { useEffect } from "react";

// Components
import { SearchBar } from "./SearchBar/SearchBar";
import { LatentDisplay } from "./LatentDisplay/LatentDisplay";
import { TopSequencesList } from "./TopSequencesList/TopSequencesList";
import { TopTokenFrequencies } from "./TopTokenFrequencies/TopTokenFrequencies";

// Logic

// Context
import LatentProvider from "./LatentContext";

// Services

// Styles
import "./LatentPage.css";

// Assets

export const LatentPage = () => {
	useEffect(() => {
		document.title = "Latent | Turing Explorer";
	}, []);

	return (
		<LatentProvider>
			<div className='page latent-page'>
				<SearchBar />
				<LatentDisplay />
				<TopSequencesList />
				<TopTokenFrequencies />
			</div>
		</LatentProvider>
	);
};
