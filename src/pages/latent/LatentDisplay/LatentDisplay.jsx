// Packages
import { useContext } from "react";

// Components

// Logic

// Context
import { LatentContext } from "../LatentContext";

// Services

// Styles
import "./LatentDisplay.css";
import { LoadingCircle } from "../../../components/loading-circle/LoadingCircle";

// Assets

export const LatentDisplay = () => {
	const { latentFrequencyTokensCount, viewingLayerIndex, viewingLatentIndex, viewingLatentFrequency } = useContext(LatentContext);

	return (
		<div className='latent-display'>
			<div className='latent-display-latent-container'>
				<div className='latent-display-latent'></div>
			</div>
			<div className='latent-display-latent-info-container'>
				<div className='latent-display-latent-info-location'>
					<span>Layer {viewingLayerIndex + 1}</span>
					<span>Latent {viewingLatentIndex + 1}</span>
				</div>
				<div className='latent-display-latent-info-frequency'>
					<span>Activates on ~</span>
					<span>
						{isNaN(viewingLatentFrequency / latentFrequencyTokensCount) ? (
							<LoadingCircle size='xs' />
						) : Number(((viewingLatentFrequency / latentFrequencyTokensCount) * 100).toFixed(2)) < 0.01 ? (
							"0.01"
						) : (
							((viewingLatentFrequency / latentFrequencyTokensCount) * 100).toFixed(2)
						)}
					</span>
					<span>% of Sequences</span>
				</div>
			</div>
		</div>
	);
};
