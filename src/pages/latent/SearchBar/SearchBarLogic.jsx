// Packages
import { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

// Components

// Logic

// Context
import { LatentContext } from "../LatentContext";

// Services

// Styles

// Assets

export const SearchBarLogic = () => {
	const navigate = useNavigate();
	const { layerCount, latentCount, viewingLayerIndex, viewingLatentIndex } = useContext(LatentContext);
	const layerIndexInputRef = useRef();
	const latentIndexInputRef = useRef();
	const [layerIndexInputValue, setViewingLayerIndexInputValue] = useState(viewingLayerIndex);
	const [latentIndexInputValue, setViewingLatentIndexInputValue] = useState(viewingLatentIndex);

	const onSearchBarInputKeyDown = (e) => {
		if (e?.key?.toLowerCase() === "enter") {
			if (e?.target?.value?.trim()?.length === 0) return navigate("/explore");
			navigate("/explore?q=" + encodeURI(e?.target?.value));
		}
	};

	useEffect(() => {
		setViewingLayerIndexInputValue(viewingLayerIndex + 1);
	}, [viewingLayerIndex]);

	useEffect(() => {
		setViewingLatentIndexInputValue(viewingLatentIndex + 1);
	}, [viewingLatentIndex]);

	const changeLatentLayerInputValue = (e) => {
		setViewingLayerIndexInputValue(e.target.value);
	};

	const changeLatentIndexInputValue = (e) => {
		setViewingLatentIndexInputValue(e.target.value);
	};

	const goToLatentPage = (e) => {
		let newLatentLayer = viewingLayerIndex;
		let newLatentIndex = viewingLatentIndex;
		if (!isNaN(parseInt(layerIndexInputValue))) newLatentLayer = parseInt(layerIndexInputValue) - 1;
		if (!isNaN(parseInt(latentIndexInputValue))) newLatentIndex = parseInt(latentIndexInputValue) - 1;
		if (newLatentLayer > layerCount || latentIndexInputValue > latentCount) return false;
		const path = "/latent?layer=" + (newLatentLayer + 1) + "&latent=" + (newLatentIndex + 1);
		layerIndexInputRef?.current?.blur();
		latentIndexInputRef?.current?.blur();
		if (e?.button === 1) return window.open(window.location.origin + path, "_blank");
		navigate(path);
	};

	return {
		onSearchBarInputKeyDown,
		layerIndexInputRef,
		layerIndexInputValue,
		changeLatentLayerInputValue,
		latentIndexInputRef,
		latentIndexInputValue,
		changeLatentIndexInputValue,
		goToLatentPage,
	};
};
