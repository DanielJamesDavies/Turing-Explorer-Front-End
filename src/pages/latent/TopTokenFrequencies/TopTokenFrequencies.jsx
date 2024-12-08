// Packages
import { useContext } from "react";

// Components
import { LoadingCircle } from "../../../components/loading-circle/LoadingCircle";

// Logic

// Context
import { LatentContext } from "../LatentContext";

// Services

// Styles
import "./TopTokenFrequencies.css";

// Assets

export const TopTokenFrequencies = () => {
	const { viewingLayerIndex, viewingLatentTopOutputTokenFrequencies, viewingLatentTopLayerUnembedTokenFrequencies } = useContext(LatentContext);

	return (
		<div className='latent-top-token-frequencies-container'>
			<div className='latent-top-token-frequencies-title'>
				<span>List of Top Tokens on Latent Activated Sequences</span>
				<i className='fa-solid fa-info'></i>
				<div className='latent-top-token-frequencies-title-info'>
					The following is a list of top token-frequency pairs. A token was collected if it appeared in the top 12 tokens at the most
					activated token given the list of latent activated sequences.
				</div>
			</div>
			{viewingLatentTopLayerUnembedTokenFrequencies?.length === 0 || viewingLatentTopOutputTokenFrequencies?.length === 0 ? (
				<div className='latent-top-token-frequencies-list-loading-circle-container'>
					<LoadingCircle center={true} size='s' />
				</div>
			) : (
				<div className='latent-top-token-frequencies-lists'>
					<div className='latent-top-token-frequencies-list-container'>
						<div className='latent-top-token-frequencies-title latent-top-token-frequencies-list-title'>
							<span>Top Layer Unembedding Tokens</span>
							<i className='fa-solid fa-info'></i>
							<div className='latent-top-token-frequencies-title-info'>
								Top output tokens on top sequences when using the unembedding matrix on the layer ({viewingLayerIndex + 1}) of this
								latent.
							</div>
						</div>
						<div className='latent-top-token-frequencies-list'>
							{viewingLatentTopLayerUnembedTokenFrequencies?.length === 0 ? (
								<div className='latent-top-token-frequencies-list-loading-circle-container'>
									<LoadingCircle center={true} size='s' />
								</div>
							) : (
								<>
									{viewingLatentTopLayerUnembedTokenFrequencies?.slice(0, 20)?.map((topOutputTokenItem, index) => (
										<div key={index} className='latent-top-token-frequencies-item'>
											<div className='latent-top-token-frequencies-item-token'>
												<i className='fa-solid fa-quote-left' />
												<span>{topOutputTokenItem?.decoded_token}</span>
												<i className='fa-solid fa-quote-right' />
											</div>
											<div className='latent-top-token-frequencies-item-frequency'>
												<span>{topOutputTokenItem?.frequency} of 80</span>
											</div>
										</div>
									))}
								</>
							)}
						</div>
					</div>
					<div className='latent-top-token-frequencies-list-container'>
						<div className='latent-top-token-frequencies-title latent-top-token-frequencies-list-title'>
							<span>Top Output Tokens</span>
							<i className='fa-solid fa-info'></i>
							<div className='latent-top-token-frequencies-title-info'>
								Top output tokens from the final layer on top sequences for this latent.
							</div>
						</div>
						<div className='latent-top-token-frequencies-list'>
							{viewingLatentTopOutputTokenFrequencies?.length === 0 ? (
								<div className='latent-top-token-frequencies-list-loading-circle-container'>
									<LoadingCircle center={true} size='s' />
								</div>
							) : (
								<>
									{viewingLatentTopOutputTokenFrequencies?.slice(0, 20)?.map((topOutputTokenItem, index) => (
										<div key={index} className='latent-top-token-frequencies-item'>
											<div className='latent-top-token-frequencies-item-token'>
												<i className='fa-solid fa-quote-left' />
												<span>{topOutputTokenItem?.decoded_token}</span>
												<i className='fa-solid fa-quote-right' />
											</div>
											<div className='latent-top-token-frequencies-item-frequency'>
												<span>{topOutputTokenItem?.frequency} of 80</span>
											</div>
										</div>
									))}
								</>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
