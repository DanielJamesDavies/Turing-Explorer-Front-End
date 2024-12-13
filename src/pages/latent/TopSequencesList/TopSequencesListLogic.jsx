// Packages
import { useContext, useEffect, useState } from "react";

// Components

// Logic

// Context
import { LatentContext } from "../LatentContext";
import { APIContext } from "../../../context/APIContext";

// Services

// Styles

// Assets

export const TopSequencesListLogic = () => {
	const {
		viewingLayerIndex,
		setViewingLayerIndex,
		viewingLatentIndex,
		setViewingLatentIndex,
		latentTopSequencesCount,
		viewingLatentTopSequencesList,
		viewingLatentTopOtherLatents,
		viewingLatentTopOtherLatentPreviews,
		setViewingLatentTopOtherLatentPreviews,
	} = useContext(LatentContext);
	const { APIRequest } = useContext(APIContext);
	const [isShowingAll, setIsShowingAll] = useState(false);
	const [sequenceIsShowingOtherLatents, setSequenceIsShowingOtherLatents] = useState(-1);
	const sequenceOtherLatentsTypes = [
		{ key: "latents_other_sae_latent_indices_avg_sequence_adj", name: "Average Sequence Adjusted" },
		{ key: "latents_other_sae_latent_indices_top_token_adj", name: "Top Token Adjusted" },
	];
	const [sequenceOtherLatentsTypeIndex, setSequenceOtherLatentsTypeIndex] = useState(0);
	const [isHidingCommonOtherLatents, setIsHidingCommonOtherLatents] = useState(true);

	useEffect(() => {
		setIsShowingAll(false);
		setSequenceIsShowingOtherLatents(-1);
	}, [viewingLayerIndex, viewingLatentIndex]);

	const toggleIsShowingAll = () => {
		setIsShowingAll((oldValue) => !oldValue);
	};

	const goToLatent = (e, newLayerIndex, newLatentIndex) => {
		if (e?.button === 1) {
			return window.open(window.location?.origin + "/latent?layer=" + (newLayerIndex + 1) + "&latent=" + (newLatentIndex + 1), "_blank");
		}
		setViewingLayerIndex(newLayerIndex);
		setViewingLatentIndex(newLatentIndex);
	};

	const decrementOtherLatentsType = () => {
		setSequenceOtherLatentsTypeIndex((oldValue) => Math.max(0, oldValue - 1));
	};

	const incrementOtherLatentsType = () => {
		setSequenceOtherLatentsTypeIndex((oldValue) => Math.min(sequenceOtherLatentsTypes?.length - 1, oldValue + 1));
	};

	const toggleIsHidingCommonOtherLatents = () => {
		setIsHidingCommonOtherLatents((oldValue) => !oldValue);
	};

	const getLatentPreview = async (layer, latent) => {
		if (viewingLatentTopOtherLatentPreviews[layer]?.findIndex((e) => e?.latent === latent) !== -1) return false;
		const res = await APIRequest("/latent/preview?layer=" + layer + "&latent=" + latent);
		setViewingLatentTopOtherLatentPreviews((oldValue) => {
			let newValue = JSON.parse(JSON.stringify(oldValue));
			newValue[layer] = newValue[layer]?.filter((e) => e?.latent !== latent);
			newValue[layer].push({ latent, topSequences: res?.topSequences });
			return newValue;
		});
	};

	return {
		viewingLayerIndex,
		viewingLatentIndex,
		latentTopSequencesCount,
		viewingLatentTopSequencesList,
		viewingLatentTopOtherLatents,
		isShowingAll,
		toggleIsShowingAll,
		goToLatent,
		sequenceIsShowingOtherLatents,
		setSequenceIsShowingOtherLatents,
		sequenceOtherLatentsTypes,
		sequenceOtherLatentsTypeIndex,
		decrementOtherLatentsType,
		incrementOtherLatentsType,
		isHidingCommonOtherLatents,
		toggleIsHidingCommonOtherLatents,
		viewingLatentTopOtherLatentPreviews,
		getLatentPreview,
	};
};
