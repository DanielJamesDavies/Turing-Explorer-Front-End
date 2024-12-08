// Packages
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Components

// Logic

// Context

// Services

// Styles
import "./InferencePage.css";

// Assets

export const InferencePage = () => {
	const navigate = useNavigate();

	useEffect(() => {
		document.title = "Inference | Turing Explorer";
	}, []);

	const onInferenceInputKeyDown = (e) => {
		if (e?.key?.toLowerCase() === "enter") {
			if (e?.target?.value?.trim()?.length === 0) return navigate("/inference");
			navigate("/inference?input=" + encodeURI(e?.target?.value));
		}
	};

	return (
		<div className='page inference-page'>
			<div className='inference-input-container'>
				<div className='inference-input-title'>
					<span>Turing&#8209;LLM Inference</span>
				</div>
				<input
					className='inference-input'
					placeholder='Type a prompt for Turing-LLM to complete'
					onKeyDown={onInferenceInputKeyDown}
				></input>
				<label>e.g. Quantum Mechanics</label>
			</div>
		</div>
	);
};
