// Packages
import { useEffect } from "react";

// Components
import { SearchBar } from "./SearchBar/SearchBar";
import { SearchResults } from "./SearchResults/SearchResults";

// Logic

// Context
import ExploreProvider from "./ExploreContext";

// Services

// Styles
import "./ExplorePage.css";

// Assets

export const ExplorePage = () => {
	useEffect(() => {
		document.title = "Explore | Turing Explorer";
	}, []);

	return (
		<ExploreProvider>
			<div className='page explore-page'>
				<SearchBar />
				<SearchResults />
			</div>
		</ExploreProvider>
	);
};
