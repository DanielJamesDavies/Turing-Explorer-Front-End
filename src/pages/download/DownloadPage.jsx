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
	return (
		<div className='page download-page'>
			<div className='page-content'>
				<div className='page-title'>Download Turing-LLM Explorer</div>
				<div className='download-list'>
					{[
						{ name: "All Files" },
						{ name: "Turing-LLM Explorer App" },
						{ name: "Turing-LLM-1.0-254M Weights" },
						{ name: "Sparse Autoencoder Weights (On All Layers of Turing-LLM-1.0-254M)" },
						{ name: "Latent Top Sequences (For Each Turing-LLM-1.0 SAE Latent)" },
						{ name: "Latent Frequencies (For Each Turing-LLM-1.0 SAE Latent)" },
						{
							name: "Latent Connections",
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
										<button className='download-list-item-download-btn'>
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
													<button className='download-list-item-download-btn'>
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
