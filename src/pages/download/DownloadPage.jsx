// Packages

// Components
import { NeuralNetBackground } from "../../components/neural-net-background/NeuralNetBackground";

// Logic

// Context

// Services

// Styles
import { useRef, useState } from "react";
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
						{ name: "All Files" },
						{ name: "Turing-LLM Explorer App" },
						{ name: "Turing-LLM-1.0-254M", link: "https://www.kaggle.com/models/danieljamesdavies/turing-llm-1.0-254m" },
						{
							name: "Sparse Autoencoders (On All Layers of Turing-LLM-1.0-254M)",
							link: "https://www.kaggle.com/datasets/danieljamesdavies/turing-llm-sparse-autoencoders",
						},
						{
							name: "Latent Top Sequences (For Each Turing-LLM-1.0 SAE Latent)",
							link: "https://www.kaggle.com/datasets/danieljamesdavies/turing-llm-latent-top-sequences",
						},
						{
							name: "Latent Frequencies (For Each Turing-LLM-1.0 SAE Latent)",
							link: "https://www.kaggle.com/datasets/danieljamesdavies/turing-llm-latent-frequencies",
						},
						{
							name: "Latent Unembedding Frequencies (For Each Turing-LLM-1.0 SAE Latent)",
							link: "https://www.kaggle.com/datasets/danieljamesdavies/turing-llm-top-sequence-unembedding-frequencies",
						},
						{
							name: "Latent Connections",
							link: "https://www.kaggle.com/datasets/danieljamesdavies/turing-llm-top-other-latents",
							subItems: [
								{ name: "Latent Connections (Top Token, Adjusted)" },
								{ name: "Latent Connections (Average Sequence, Adjusted)" },
								{ name: "Latent Connections (Top Token, Non-Adjusted)" },
								{ name: "Latent Connections (Average Sequence, Non-Adjusted)" },
							],
						},
					]?.map((downloadItem, index) => {
						const [isDisplayingSubItems, setIsDisplayingSubItems] = useState(false);
						const [subItemsHeight, setSubItemsHeight] = useState(200);
						const updateSubItemsHeight = (e) => setSubItemsHeight(e?.scrollHeight || 200);
						return (
							<div key={index} className='download-list-item-container'>
								<div
									className={
										"download-list-item" +
										(downloadItem?.subItems?.length > 0 ? " download-list-item-has-sub-items" : "") +
										(isDisplayingSubItems ? " download-list-item-displaying-sub-items" : "")
									}
								>
									<button
										onClick={() => setIsDisplayingSubItems((oldValue) => !oldValue)}
										disabled={!(downloadItem?.subItems?.length > 0)}
									>
										<i className='fa-solid fa-chevron-right'></i>
									</button>
									<div>
										<i className='fa-solid fa-file'></i>
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
								<div
									ref={updateSubItemsHeight}
									className={
										"download-list-item-sub-items" + (isDisplayingSubItems ? " download-list-item-sub-items-displaying" : "")
									}
									style={{ "--max-height": subItemsHeight + "px" }}
								>
									{downloadItem?.subItems?.map((downloadItem, index) => (
										<div key={index} className='download-list-item-container'>
											<div className='download-list-item'>
												<button></button>
												<div>
													<i className='fa-solid fa-file'></i>
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
											<div></div>
										</div>
									))}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};
