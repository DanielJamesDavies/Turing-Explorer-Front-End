// Packages
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

// Components

// Logic

// Context
import { ExploreContext } from "../ExploreContext";

// Services

// Styles
import "./SearchResults.css";

// Assets

export const SearchResults = () => {
	const { isGettingSearchResults, isViewingSearchResults, searchResults } = useContext(ExploreContext);
	const navigate = useNavigate();

	const goToLatent = (e, layer, latent) => {
		const path = "/latent?layer=" + (layer + 1) + "&latent=" + (latent + 1);
		if (e?.button === 1) return window.open(window?.location?.origin + path, "_blank");
		navigate(path);
	};

	return (
		<div
			className={
				"search-results-container" +
				(isGettingSearchResults ? " search-results-container-searching" : "") +
				(!isViewingSearchResults ? " search-results-container-not-searched" : "")
			}
		>
			{searchResults === false ? null : (
				<div className='search-results-label'>
					{searchResults?.latents?.length} Latents Found for Search Query "{searchResults?.query}"
				</div>
			)}
			<div className='search-results'>
				{searchResults === false
					? null
					: searchResults?.latents?.map((searchResult, searchResultIndex) => (
							<div
								key={searchResultIndex}
								className='search-results-item'
								onClick={(e) => goToLatent(e, searchResult?.layer, searchResult?.latent)}
								onAuxClick={(e) => goToLatent(e, searchResult?.layer, searchResult?.latent)}
								onMouseDown={(e) => e?.preventDefault()}
							>
								<div className='search-results-item-location'>
									<span>Layer {searchResult?.layer + 1}</span>
									<span>Latent {searchResult?.latent + 1}</span>
									<div>Relevance {Number(searchResult?.relevance).toFixed(2)}</div>
								</div>
								<div className='search-results-item-top-sequence-previews'>
									<div className='search-results-item-top-sequence-previews-label'>Top Sequence Previews</div>
									{searchResult?.topSequencePreviews?.slice(0, 3)?.map((topSequencePreview, topSequencePreviewIndex) => (
										<div key={topSequencePreviewIndex} className='search-results-item-top-sequence-preview'>
											{topSequencePreview?.decoded}
										</div>
									))}
								</div>
							</div>
					  ))}
			</div>
		</div>
	);
};
