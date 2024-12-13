// Packages
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Components

// Logic

// Context
import { InferenceContext } from "../InferenceContext";
import { APIContext } from "../../../context/APIContext";

// Services

// Styles

// Assets

export const LatentConnectionsDisplayLogic = () => {
	const {
		inferenceResults,
		viewingInferenceResultId,
		isViewingInferenceResult,
		isGettingLatentConnectionsResults,
		latentPreviews,
		setLatentPreviews,
	} = useContext(InferenceContext);
	const { APIRequest } = useContext(APIContext);
	const navigate = useNavigate();

	const goToLatent = (e, newLayer, newLatent) => {
		if (e?.button === 1)
			return window.open(window?.location?.origin + "/latent?layer=" + (newLayer + 1) + "&latent=" + (newLatent + 1), "_blank");
		navigate("/latent?layer=" + (newLayer + 1) + "&latent=" + (newLatent + 1));
	};

	const [latentsLatentWidth, setLatentsLatentWidth] = useState(1);

	const latentsLatentRef = (e) => {
		if (e) {
			setLatentsLatentWidth(e?.clientWidth);
		}
	};

	const [latentPositionMouseOver, setLatentPositionMouseOver] = useState(false);

	const onLatentMouseEnter = (layer_index, latent_index) => {
		setLatentPositionMouseOver([layer_index, latent_index]);
	};

	const onLatentMouseLeave = () => {
		setLatentPositionMouseOver(false);
	};

	const getLatentPreview = async (layer, latent) => {
		if (latentPreviews[layer]?.findIndex((e) => e?.latent === latent) !== -1) return false;
		const res = await APIRequest("/latent/preview?layer=" + layer + "&latent=" + latent);
		setLatentPreviews((oldValue) => {
			let newValue = JSON.parse(JSON.stringify(oldValue));
			newValue[layer] = newValue[layer]?.filter((e) => e?.latent !== latent);
			newValue[layer].push({ latent, topSequences: res?.topSequences });
			return newValue;
		});
	};

	const [isAnimatingTopLatentConnections, setIsAnimatingTopLatentConnections] = useState(false);
	useEffect(() => {
		setTimeout(() => setIsAnimatingTopLatentConnections(true), 4);
		const interval = setInterval(() => {
			setIsAnimatingTopLatentConnections(false);
			setTimeout(() => {
				setIsAnimatingTopLatentConnections(true);
			}, 4);
		}, 8400);
		return () => clearInterval(interval);
	}, [setIsAnimatingTopLatentConnections]);

	const [topLatentConnectionFrequencyPercentThresholds, setTopLatentConnectionFrequencyPercentThresholds] = useState(Array(12)?.fill(0.5));
	useEffect(() => {
		if (inferenceResults && viewingInferenceResultId) {
			if (inferenceResults?.find((e) => e?.inference_id === viewingInferenceResultId)?.latentConnections) {
				const adjacentConnections = inferenceResults
					?.find((e) => e?.inference_id === viewingInferenceResultId)
					?.latentConnections?.filter((e) => e?.latents[1]?.layer == e?.latents[0]?.layer + 1);
				const newTopLatentConnectionFrequencyPercentThresholds = Array(12)
					.fill(0)
					.map((_, layer) => {
						const topConnections = adjacentConnections
							?.filter((e) => e?.latents[0]?.layer === layer)
							?.sort((a, b) => b?.frequency - a?.frequency);
						return Math.min(topConnections?.slice(0, 3)?.at(-1)?.frequency / 160, 0.85);
					});
				setTopLatentConnectionFrequencyPercentThresholds(newTopLatentConnectionFrequencyPercentThresholds);
			}
		}
	}, [setTopLatentConnectionFrequencyPercentThresholds, inferenceResults, viewingInferenceResultId]);

	return {
		inferenceResults,
		viewingInferenceResultId,
		isViewingInferenceResult,
		isGettingLatentConnectionsResults,
		goToLatent,
		latentsLatentRef,
		latentsLatentWidth,
		latentPositionMouseOver,
		onLatentMouseEnter,
		onLatentMouseLeave,
		getLatentPreview,
		latentPreviews,
		isAnimatingTopLatentConnections,
		topLatentConnectionFrequencyPercentThresholds,
	};
};
