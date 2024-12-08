import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { APIContext } from "../../context/APIContext";

export const ExploreContext = createContext();

const ExploreProvider = ({ children }) => {
	const { APIRequest } = useContext(APIContext);
	const location = useLocation();
	const [searchParams] = useSearchParams();
	const [searchBarValue, setSearchBarValue] = useState("");
	const [isGettingSearchResults, setIsGettingSearchResults] = useState(false);
	const [searchResults, setSearchResults] = useState(false);
	const [isViewingSearchResults, setIsViewingSearchResults] = useState(false);

	const changeSearchBarValue = useCallback(
		(e) => {
			if (!isGettingSearchResults) setSearchBarValue(e?.target?.value);
		},
		[setSearchBarValue, isGettingSearchResults]
	);

	const getSearchResults = useCallback(
		async (newSearchBarValue) => {
			if (newSearchBarValue === undefined) newSearchBarValue = JSON.parse(JSON.stringify(searchBarValue));
			if (!newSearchBarValue || newSearchBarValue?.trim()?.length === 0) return false;
			setSearchResults(false);
			setIsGettingSearchResults(true);
			const res = await APIRequest("/search?q=" + encodeURI(newSearchBarValue));
			if (res?.results) setSearchResults({ query: newSearchBarValue, latents: res?.results });
			setIsGettingSearchResults(false);
			setIsViewingSearchResults(true);
		},
		[searchBarValue, setSearchResults, setIsGettingSearchResults, setIsViewingSearchResults]
	);

	useEffect(() => {
		const isOnHomePage = location?.pathname?.replace("/", "")?.trim()?.length === 0;
		if (!isOnHomePage) {
			setSearchResults(false);
		}
	}, [location]);

	useEffect(() => {
		const input = searchParams?.get("q");
		if (input && input?.trim()?.length !== 0) {
			setSearchBarValue(input);
			getSearchResults(input);
		}
	}, [searchParams]);

	return (
		<ExploreContext.Provider
			value={{
				searchBarValue,
				setSearchBarValue,
				changeSearchBarValue,
				isGettingSearchResults,
				setIsGettingSearchResults,
				isViewingSearchResults,
				searchResults,
				setSearchResults,
				getSearchResults,
			}}
		>
			{children}
		</ExploreContext.Provider>
	);
};

export default ExploreProvider;
