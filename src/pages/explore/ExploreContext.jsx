import React, { createContext, useCallback, useContext, useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { APIContext } from "../../context/APIContext";

export const ExploreContext = createContext();

const ExploreProvider = ({ children }) => {
	const { APIRequest } = useContext(APIContext);
	const location = useLocation();
	const layerCount = 12;
	const latentCount = 40960;
	const latentFrequencyTokensCount = 512 * 64 * 11 * 256;
	const latentTopSequencesCount = 512 * 16 * 405;

	// Search States
	const [searchBarValue, setSearchBarValue] = useState("");
	const [isGettingSearchResults, setIsGettingSearchResults] = useState(false);
	const [searchResults, setSearchResults] = useState(false);
	const [isViewingSearchResults, setIsViewingSearchResults] = useState(false);

	// Latent States
	const [viewingLayerIndex, setViewingLayerIndex] = useState(0);
	const [viewingLatentIndex, setViewingLatentIndex] = useState(1);
	const [viewingLatentFrequency, setViewingLatentFrequency] = useState("-");
	const [viewingLatentTopSequencesList, setViewingLatentTopSequencesList] = useState([]);
	const [viewingLatentTopOutputTokenFrequencies, setViewingLatentTopOutputTokenFrequencies] = useState([]);
	const [viewingLatentTopLayerUnembedTokenFrequencies, setViewingLatentTopLayerUnembedTokenFrequencies] = useState([]);
	const [viewingLatentTopOtherLatents, setViewingLatentTopOtherLatents] = useState([]);

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
		const params = new URL(window?.location?.href).searchParams;
		const newViewingLayerIndex = (params?.get("layer") || 1) - 1;
		const newViewingLatentIndex = (params?.get("latent") || 2) - 1;
		if (newViewingLayerIndex !== 0) setViewingLayerIndex(newViewingLayerIndex);
		if (newViewingLatentIndex !== 1) setViewingLatentIndex(newViewingLatentIndex);
	}, [setViewingLayerIndex, setViewingLatentIndex]);

	const latentPositionLastChangedTime = useRef(0);
	useEffect(() => {
		const thisLatentPositionLastChangedTime = Date.now();
		latentPositionLastChangedTime.current = JSON.parse(JSON.stringify(thisLatentPositionLastChangedTime));

		const getLatentData = async () => {
			setViewingLatentFrequency("-");
			setViewingLatentTopSequencesList([]);
			setViewingLatentTopOutputTokenFrequencies([]);
			setViewingLatentTopLayerUnembedTokenFrequencies([]);
			setViewingLatentTopOtherLatents([]);

			if (location?.pathname !== "/latent") return false;

			APIRequest("/latent?layer=" + viewingLayerIndex + "&latent=" + viewingLatentIndex, "GET", undefined, (res) => {
				if (JSON.stringify(latentPositionLastChangedTime.current) !== JSON.stringify(thisLatentPositionLastChangedTime)) return false;

				if (res?.latentFrequency) setViewingLatentFrequency(res?.latentFrequency);

				if (res?.topSequencesList) setViewingLatentTopSequencesList(res?.topSequencesList);

				if (res?.postFromSequenceLatentData?.outputTokenFrequencies)
					setViewingLatentTopOutputTokenFrequencies(res?.postFromSequenceLatentData?.outputTokenFrequencies);

				if (res?.postFromSequenceLatentData?.layerUnembedTokenFrequencies)
					setViewingLatentTopLayerUnembedTokenFrequencies(res?.postFromSequenceLatentData?.layerUnembedTokenFrequencies);

				if (res?.postFromSequenceLatentData?.topOtherLatents)
					setViewingLatentTopOtherLatents(res?.postFromSequenceLatentData?.topOtherLatents);
			});
		};

		const timeout = setTimeout(() => getLatentData(), 200);

		return () => {
			clearTimeout(timeout);
		};
	}, [
		viewingLayerIndex,
		viewingLatentIndex,
		APIRequest,
		setViewingLatentFrequency,
		setViewingLatentTopSequencesList,
		setViewingLatentTopOutputTokenFrequencies,
		setViewingLatentTopLayerUnembedTokenFrequencies,
		setViewingLatentTopOtherLatents,
		location,
	]);

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
				layerCount,
				latentCount,
				latentFrequencyTokensCount,
				latentTopSequencesCount,
				viewingLayerIndex,
				setViewingLayerIndex,
				viewingLatentIndex,
				setViewingLatentIndex,
				viewingLatentFrequency,
				viewingLatentTopSequencesList,
				viewingLatentTopOutputTokenFrequencies,
				viewingLatentTopLayerUnembedTokenFrequencies,
				viewingLatentTopOtherLatents,
			}}
		>
			{children}
		</ExploreContext.Provider>
	);
};

export default ExploreProvider;
