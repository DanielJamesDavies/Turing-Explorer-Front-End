// Packages
import { useContext, useState } from "react";
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
	};
};
