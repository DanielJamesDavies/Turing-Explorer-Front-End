import React, { createContext, useCallback, useState, useEffect, useContext } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { APIContext } from "../../context/APIContext";

export const InferenceContext = createContext();

const InferenceProvider = ({ children }) => {
	const { APIRequest } = useContext(APIContext);
	const location = useLocation();
	const [searchParams] = useSearchParams();
	const [inferenceTextBoxValue, setInferenceTextBoxValue] = useState("");
	const [isGettingInferenceResults, setIsGettingInferenceResults] = useState(false);
	const [inferenceResults, setInferenceResults] = useState(false);
	const [viewingInferenceResultId, setViewingInferenceResultId] = useState(false);
	const [isViewingInferenceResult, setIsViewingInferenceResult] = useState(false);
	const [isGeneratingResult, setIsGeneratingResult] = useState(false);
	const [isGettingLatentConnectionsResults, setIsGettingLatentConnectionsResults] = useState(false);
	const [latentPreviews, setLatentPreviews] = useState(
		Array(12)
			.fill(0)
			.map(() => [])
	);

	const submitInferenceRequest = useCallback(
		async (newInferenceTextBoxValue) => {
			if (isGettingInferenceResults) return false;
			setIsGettingInferenceResults(true);
			if (newInferenceTextBoxValue === undefined) newInferenceTextBoxValue = JSON.parse(JSON.stringify(inferenceTextBoxValue));
			const handleStreamResponse = (res) => {
				if (res?.first) {
					setIsGeneratingResult(true);
					setIsGettingInferenceResults(false);
					setInferenceTextBoxValue("");
					setViewingInferenceResultId(res?.inference_id);
					setIsViewingInferenceResult(true);
				}
				if (res?.final) {
					setIsGeneratingResult(false);
				}
				setInferenceResults((oldValue) =>
					(oldValue || [])
						?.filter((e) => e?.inference_id !== res?.inference_id)
						.concat([{ inference_id: res?.inference_id, tokenIds: res?.response_tokens, tokens: res?.response_tokens_decoded }])
				);
			};
			APIRequest(
				"/inference",
				"POST",
				{
					prompt: newInferenceTextBoxValue,
					viewingInferenceResultId: viewingInferenceResultId || undefined,
				},
				handleStreamResponse
			);
		},
		[inferenceTextBoxValue, isGettingInferenceResults]
	);

	useEffect(() => {
		if (location?.pathname !== "/inference") {
			setIsViewingInferenceResult(false);
		}
	}, [location]);

	useEffect(() => {
		const input = searchParams?.get("input");
		if (input && input?.trim()?.length !== 0) {
			setInferenceTextBoxValue(input);
			submitInferenceRequest(input);
		}
	}, [searchParams]);

	const submitLatentConnectionsRequest = useCallback(
		async (inferenceId, tokenIndex) => {
			if (inferenceId === undefined || tokenIndex === undefined) return false;
			setInferenceResults((oldValue) => {
				let newValue = JSON.parse(JSON.stringify(oldValue));
				const index = newValue?.findIndex((e) => e?.inference_id === inferenceId);
				delete newValue[index].topLatents;
				delete newValue[index].latentConnections;
				newValue[index].tokenFocused = tokenIndex;
				return newValue;
			});
			setIsGettingLatentConnectionsResults(true);
			const res = await APIRequest("/get-latent-connections", "POST", {
				tokenIds: inferenceResults?.find((e) => e?.inference_id === inferenceId)?.tokenIds,
				tokenIndex,
			});
			setIsGettingLatentConnectionsResults(false);
			setInferenceResults((oldValue) => {
				let newValue = JSON.parse(JSON.stringify(oldValue));
				const index = newValue?.findIndex((e) => e?.inference_id === inferenceId);
				newValue[index].topLatents = res?.topLatents;
				newValue[index].latentConnections = res?.latentConections;
				newValue[index].tokenFocused = tokenIndex;
				return newValue;
			});
		},
		[APIRequest, inferenceResults, setInferenceResults, setIsGettingLatentConnectionsResults]
	);

	return (
		<InferenceContext.Provider
			value={{
				inferenceTextBoxValue,
				setInferenceTextBoxValue,
				isGettingInferenceResults,
				setIsGettingInferenceResults,
				inferenceResults,
				setInferenceResults,
				submitInferenceRequest,
				viewingInferenceResultId,
				setViewingInferenceResultId,
				isViewingInferenceResult,
				setIsViewingInferenceResult,
				isGeneratingResult,
				setIsGeneratingResult,
				isGettingLatentConnectionsResults,
				submitLatentConnectionsRequest,
				latentPreviews,
				setLatentPreviews,
			}}
		>
			{children}
		</InferenceContext.Provider>
	);
};

export default InferenceProvider;
