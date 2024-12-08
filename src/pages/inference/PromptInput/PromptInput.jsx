// Packages
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

// Components

// Logic

// Context
import { InferenceContext } from "../InferenceContext";

// Services

// Styles
import "./PromptInput.css";

// Assets

export const PromptInput = () => {
	const navigate = useNavigate();
	const { inferenceTextBoxValue, setInferenceTextBoxValue, isGettingInferenceResults, viewingInferenceResultId, submitInferenceRequest } =
		useContext(InferenceContext);

	const onInferenceInputKeyDown = (e) => {
		if (e?.key?.toLowerCase() === "enter") {
			if (e?.target?.value?.trim()?.length === 0) return navigate("/inference");
			submitInferenceRequest();
		}
	};

	return (
		<div
			className={
				"inference-prompt-input-container" +
				(isGettingInferenceResults ? " inference-prompt-input-container-getting-results" : "") +
				(viewingInferenceResultId ? " inference-prompt-input-container-viewing-result" : "")
			}
		>
			<div className='inference-prompt-input-wrapper'>
				<div className='inference-prompt-input-title'>
					<span>Turing&#8209;LLM Inference</span>
				</div>
				<input
					className='inference-prompt-input'
					placeholder='Type a prompt for Turing-LLM to complete'
					value={inferenceTextBoxValue}
					onChange={(e) => setInferenceTextBoxValue(e?.target?.value)}
					onKeyDown={onInferenceInputKeyDown}
					disabled={isGettingInferenceResults}
				></input>
				{isGettingInferenceResults ? (
					<label>Generating...</label>
				) : (
					<label
						className='pointer'
						onClick={() => {
							setInferenceTextBoxValue("Quantum Mechanics");
							submitInferenceRequest("Quantum Mechanics");
						}}
					>
						e.g. Quantum Mechanics
					</label>
				)}
			</div>
		</div>
	);
};
