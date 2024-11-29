// Packages

// Components

// Logic

// Context

// Services

// Styles
import "./DownloadPage.css";

// Assets

export const DownloadPage = () => {
	const goToLink = (e, link) => {
		if (!link) return false;
		if (e?.button === 1) return window.open(link, "_blank");
		window.location.replace(link);
	};

	return (
		<div className='page download-page'>
			<div className='page-content'>
				<div className='page-title'>Download Turing-LLM Explorer</div>
				<div className='download-list'>
					{[
						{ name: "Turing-LLM Explorer App", type: "app", link: "https://github.com/DanielJamesDavies/Turing-LLM-Explorer" },
						{ name: "Turing-LLM-1.0-254M", type: "ai", link: "https://www.kaggle.com/models/danieljamesdavies/turing-llm-1.0-254m" },
						{
							name: "Sparse Autoencoders (On All Layers of Turing-LLM-1.0-254M)",
							type: "data",
							link: "https://www.kaggle.com/datasets/danieljamesdavies/turing-llm-sparse-autoencoders",
						},
						{
							name: "Latent Top Sequences (For Each Turing-LLM-1.0 SAE Latent)",
							type: "data",
							link: "https://www.kaggle.com/datasets/danieljamesdavies/turing-llm-latent-top-sequences",
						},
						{
							name: "Latent Decoded Top Sequences",
							type: "data",
							link: "https://www.kaggle.com/datasets/danieljamesdavies/turing-llm-decoded-sequences",
						},
						{
							name: "Latent Frequencies (For Each Turing-LLM-1.0 SAE Latent)",
							type: "data",
							link: "https://www.kaggle.com/datasets/danieljamesdavies/turing-llm-latent-frequencies",
						},
						{
							name: "Latent Unembedding Frequencies (For Each Turing-LLM-1.0 SAE Latent)",
							type: "data",
							link: "https://www.kaggle.com/datasets/danieljamesdavies/turing-llm-top-sequence-unembedding-frequencies",
						},
						{
							name: "Latent Connections",
							type: "data",
							link: "https://www.kaggle.com/datasets/danieljamesdavies/turing-llm-top-other-latents",
						},
					]?.map((downloadItem, index) => (
						<div key={index} className='download-list-item-container'>
							<div className='download-list-item'>
								<div>
									{downloadItem?.type !== "app" ? null : <i className='fa-solid fa-display'></i>}
									{downloadItem?.type !== "ai" ? null : <i className='fa-solid fa-robot'></i>}
									{downloadItem?.type !== "data" ? null : <i className='fa-solid fa-database'></i>}
								</div>
								<div className='download-list-item-name'>{downloadItem?.name}</div>
								<div>
									<button
										className='download-list-item-download-btn'
										onClick={(e) => goToLink(e, downloadItem?.link)}
										onAuxClick={(e) => goToLink(e, downloadItem?.link)}
										disabled={!downloadItem?.link}
									>
										<i className='fa-solid fa-arrow-down'></i>
										<span>Download</span>
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
