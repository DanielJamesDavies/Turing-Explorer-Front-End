import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { APIContext } from "../../context/APIContext";

export const LatentContext = createContext();

const LatentProvider = ({ children }) => {
	const { APIRequest } = useContext(APIContext);
	const location = useLocation();
	const [searchParams] = useSearchParams();
	const layerCount = 12;
	const latentCount = 40960;
	const latentFrequencyTokensCount = 512 * 64 * 11 * 256;
	const latentTopSequencesCount = Math.round((512 * 16 * 405) / 10000) * 10000;
	const [viewingLayerIndex, setViewingLayerIndex] = useState(0);
	const [viewingLatentIndex, setViewingLatentIndex] = useState(1);
	const [viewingLatentFrequency, setViewingLatentFrequency] = useState("-");
	const [viewingLatentTopSequencesList, setViewingLatentTopSequencesList] = useState([]);
	const [viewingLatentTopOutputTokenFrequencies, setViewingLatentTopOutputTokenFrequencies] = useState([]);
	const [viewingLatentTopLayerUnembedTokenFrequencies, setViewingLatentTopLayerUnembedTokenFrequencies] = useState([]);
	const [viewingLatentTopOtherLatents, setViewingLatentTopOtherLatents] = useState([]);

	useEffect(() => {
		setViewingLayerIndex((searchParams?.get("layer") || 1) - 1);
		setViewingLatentIndex((searchParams?.get("latent") || 2) - 1);
	}, [searchParams, setViewingLayerIndex, setViewingLatentIndex]);

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
		<LatentContext.Provider
			value={{
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
		</LatentContext.Provider>
	);
};

export default LatentProvider;
