// Packages
import { useEffect } from "react";

// Components

// Logic

// Context

// Services

// Styles
import "./DownloadPage.css";

// Assets

export const DownloadPage = () => {
	const goToLink = (link) => {
		if (!link) return false;
		return window.open(link, "_blank");
	};

	useEffect(() => {
		document.title = "Download | Turing Explorer";
	}, []);

	return (
		<div className='page download-page'>
			<div className='page-content'>
				<div className='page-title'>
					<span>Download Turing-LLM Explorer</span>
				</div>
				<div className='download-list'>
					{[
						{ name: "Turing-LLM Explorer App", type: "app", link: "https://github.com/DanielJamesDavies/Turing-LLM-Explorer" },
						{ name: "Turing-LLM-1.0-254M", type: "ai", link: "https://www.kaggle.com/models/danieljamesdavies/turing-llm-1.0-254m" },
						{
							name: "Sparse Autoencoders",
							type: "data",
							link: "https://www.kaggle.com/datasets/danieljamesdavies/turing-llm-sparse-autoencoders",
						},
						{
							name: "All Latent Data",
							type: "data",
							link: "https://www.kaggle.com/datasets/danieljamesdavies/turing-llm-explorer-latent-data",
						},
						// {
						// 	name: "Latent Top Sequences",
						// 	type: "data",
						// 	link: "https://www.kaggle.com/datasets/danieljamesdavies/turing-llm-latent-top-sequences",
						// },
						// {
						// 	name: "Latent Decoded Top Sequences",
						// 	type: "data",
						// 	link: "https://www.kaggle.com/datasets/danieljamesdavies/turing-llm-decoded-sequences",
						// },
						// {
						// 	name: "Latent Non-Zero Frequencies",
						// 	type: "data",
						// 	link: "https://www.kaggle.com/datasets/danieljamesdavies/turing-llm-latent-frequencies",
						// },
						// {
						// 	name: "Latent Unembedding Frequencies",
						// 	type: "data",
						// 	link: "https://www.kaggle.com/datasets/danieljamesdavies/turing-llm-top-sequence-unembedding-frequencies",
						// },
						// {
						// 	name: "Latent Connections",
						// 	type: "data",
						// 	link: "https://www.kaggle.com/datasets/danieljamesdavies/turing-llm-top-other-latents",
						// },
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
										className='download-list-item-download-btn button'
										onClick={() => goToLink(downloadItem?.link)}
										onAuxClick={() => goToLink(downloadItem?.link)}
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
