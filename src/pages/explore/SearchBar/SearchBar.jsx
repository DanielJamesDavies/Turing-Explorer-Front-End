// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { ExploreContext } from "../ExploreContext";

// Services

// Styles
import "./SearchBar.css";

// Assets

export const SearchBar = () => {
	const { searchBarValue, setSearchBarValue, isGettingSearchResults, isViewingSearchResults, searchResults, getSearchResults } =
		useContext(ExploreContext);

	const onSearchBarInputKeyDown = (e) => {
		if (e?.key?.toLowerCase() === "enter") {
			if (e?.target?.value?.trim()?.length === 0) return false;
			getSearchResults();
		}
	};

	return (
		<div
			className={
				"explore-input-container" +
				(isGettingSearchResults ? " explore-input-container-getting-results" : "") +
				(isViewingSearchResults ? " explore-input-container-viewing-results" : "")
			}
		>
			<div className='explore-input-wrapper'>
				<div className='explore-input-title'>
					<span>Explore Turing&#8209;LLM</span>
				</div>
				<input
					className='explore-input'
					placeholder='Search latents by typing keywords'
					value={searchBarValue}
					onChange={(e) => setSearchBarValue(e?.target?.value)}
					onKeyDown={onSearchBarInputKeyDown}
					disabled={isGettingSearchResults}
				></input>
				{isGettingSearchResults ? (
					<label>Searching...</label>
				) : searchResults ? (
					<label></label>
				) : (
					<label
						onClick={() => {
							setSearchBarValue("Relativity");
							getSearchResults("Relativity");
						}}
					>
						e.g. Relativity
					</label>
				)}
			</div>
		</div>
	);
};
