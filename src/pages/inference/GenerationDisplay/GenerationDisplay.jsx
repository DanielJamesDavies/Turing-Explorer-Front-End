// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { InferenceContext } from "../InferenceContext";

// Services

// Styles
import "./GenerationDisplay.css";

// Assets

export const GenerationDisplay = () => {
	const { inferenceResults, viewingInferenceResultId, isGeneratingResult, submitInferenceRequest, submitLatentConnectionsRequest } =
		useContext(InferenceContext);

	return (
		<div
			className={
				"inference-generation-display-container" +
				(viewingInferenceResultId ? " inference-generation-display-container-viewing-result" : "") +
				(isGeneratingResult ? " inference-generation-display-container-generating-result" : "")
			}
		>
			<div className='inference-generation-display-tokens-title'>
				<span>Generation</span>
				<img src='images/turing.png' />
			</div>

			<div className='inference-generation-display-tokens'>
				{!inferenceResults
					? null
					: inferenceResults
							?.find((e) => e?.inference_id === viewingInferenceResultId)
							?.tokens?.map((token, tokenIndex) => (
								<span
									key={tokenIndex}
									onClick={() => submitLatentConnectionsRequest(viewingInferenceResultId, tokenIndex)}
									className={
										inferenceResults?.find((e) => e?.inference_id === viewingInferenceResultId)?.tokenFocused === tokenIndex
											? " inference-generation-display-tokens-token-active"
											: ""
									}
								>
									<span>{token}</span>
								</span>
							))}
				{!inferenceResults || inferenceResults?.find((e) => e?.inference_id === viewingInferenceResultId)?.tokens?.length >= 768 ? null : (
					<button
						className={
							"infererence-generation-display-generate-more-btn" +
							(isGeneratingResult ? " infererence-generation-display-generate-more-btn-hide" : "")
						}
						onClick={() =>
							submitInferenceRequest(inferenceResults?.find((e) => e?.inference_id === viewingInferenceResultId)?.tokens?.join(""))
						}
					>
						<i className='fa-solid fa-chevron-down'></i>
						<span>Generate More</span>
					</button>
				)}
			</div>
		</div>
	);
};
