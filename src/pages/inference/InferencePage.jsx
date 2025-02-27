// Packages
import { useEffect } from "react";

// Components
import { PromptInput } from "./PromptInput/PromptInput";
import { GenerationDisplay } from "./GenerationDisplay/GenerationDisplay";
import { LatentConnectionsDisplay } from "./LatentConnectionsDisplay/LatentConnectionsDisplay";

// Logic

// Context
import InferenceProvider from "./InferenceContext";

// Services

// Styles
import "./InferencePage.css";

// Assets

export const InferencePage = () => {
	useEffect(() => {
		document.title = "Inference | Turing Explorer";
	}, []);

	return (
		<InferenceProvider>
			<div className='page inference-page'>
				<PromptInput />
				<GenerationDisplay />
				<LatentConnectionsDisplay />
			</div>
		</InferenceProvider>
	);
};
