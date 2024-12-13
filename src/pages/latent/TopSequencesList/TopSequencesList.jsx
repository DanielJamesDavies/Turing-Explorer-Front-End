// Packages

// Components
import { LoadingCircle } from "../../../components/loading-circle/LoadingCircle";

// Logic
import { TopSequencesListLogic } from "./TopSequencesListLogic";

// Context

// Services

// Styles
import "./TopSequencesList.css";

// Assets

export const TopSequencesList = () => {
	const {
		viewingLayerIndex,
		viewingLatentIndex,
		latentTopSequencesCount,
		viewingLatentTopSequencesList,
		viewingLatentTopOtherLatents,
		isShowingAll,
		toggleIsShowingAll,
		goToLatent,
		sequenceIsShowingOtherLatents,
		setSequenceIsShowingOtherLatents,
		sequenceOtherLatentsTypes,
		sequenceOtherLatentsTypeIndex,
		decrementOtherLatentsType,
		incrementOtherLatentsType,
		isHidingCommonOtherLatents,
		toggleIsHidingCommonOtherLatents,
		viewingLatentTopOtherLatentPreviews,
		getLatentPreview,
	} = TopSequencesListLogic();

	return (
		<div className='latent-top-sequences-list-container'>
			<div className='latent-top-sequences-list-title'>
				<span>List of Latent Activated Sequences</span>
				<i className='fa-solid fa-info'></i>
				<div className='latent-top-sequences-list-title-info'>
					The following is a list of token sequences where this latent had the highest activation out of ~
					{latentTopSequencesCount?.toLocaleString()} sequences.
				</div>
			</div>
			<div className='latent-top-sequences-list'>
				{!viewingLatentTopSequencesList || viewingLatentTopSequencesList?.length === 0 ? (
					<div className='latent-top-sequences-list-loading-circle-container'>
						<LoadingCircle center={true} size='s' />
					</div>
				) : (
					viewingLatentTopSequencesList?.slice(0, isShowingAll ? viewingLatentTopSequencesList?.length : 4)?.map((topSequence, index) => (
						<div key={index} className='latent-top-sequences-item-container'>
							<div className='latent-top-sequences-item'>
								<div className='latent-top-sequences-item-info'>
									<div className='latent-top-sequences-item-info-rank'>#{index + 1}</div>
									<div className='latent-top-sequences-item-info-avg-act'>
										Average Activation: {Math.round(topSequence?.[0]?.[1] * 1000) / 1000}
									</div>
									<button
										className='latent-top-sequences-item-view-top-other-latents-btn'
										onClick={
											sequenceIsShowingOtherLatents === index
												? () => setSequenceIsShowingOtherLatents(-1)
												: () => setSequenceIsShowingOtherLatents(index)
										}
									>
										{sequenceIsShowingOtherLatents === index ? (
											<>
												<i className='fa-solid fa-eye' />
												<span>Hide Other Latents</span>
											</>
										) : (
											<>
												<i className='fa-solid fa-eye-slash' />
												<span>View Other Latents</span>
											</>
										)}
									</button>
								</div>
								<div className='latent-top-sequences-item-tokens'>
									{!Array.isArray(topSequence)
										? null
										: topSequence?.map((tokenData, index2) =>
												index2 === 0 ? null : (
													<div key={index2} className='latent-top-sequences-item-token-item'>
														<div
															className='latent-top-sequences-item-token-item-value-graph'
															style={{
																"--token-value-fraction":
																	tokenData?.[1] /
																	Math.max(...topSequence?.filter((_, i) => i !== 0)?.map((e) => e[1])),
															}}
														>
															<div className='latent-top-sequences-item-token-item-value-graph-bar'></div>
														</div>
														<div className='latent-top-sequences-item-token-item-token'>{tokenData?.[0]}</div>
														<div className='latent-top-sequences-item-token-item-value'>
															{tokenData?.[1]?.toFixed(3)}
														</div>
													</div>
												)
										  )}
								</div>
							</div>
							<div
								className={
									"latent-top-sequences-item-other-latents-container" +
									(sequenceIsShowingOtherLatents === index ? " latent-top-sequences-item-other-latents-container-show" : "")
								}
							>
								<div className='latent-top-sequences-item-other-latents-collection-type-container'>
									<div className='latent-top-sequences-item-other-latents-collection-type-title'>
										Other Latents Collection Type:{" "}
									</div>
									<button
										className='latent-top-sequences-item-other-latents-collection-type-switch-btn'
										onClick={decrementOtherLatentsType}
									>
										<i className='fa-solid fa-chevron-left' />
									</button>
									<span className='latent-top-sequences-item-other-latents-collection-type-value'>
										{sequenceOtherLatentsTypes[sequenceOtherLatentsTypeIndex]?.name}
									</span>
									<button
										className='latent-top-sequences-item-other-latents-collection-type-switch-btn'
										onClick={incrementOtherLatentsType}
									>
										<i className='fa-solid fa-chevron-right' />
									</button>
									<span className='latent-top-sequences-item-other-latents-collection-type-toggle-hide-common-latents-label'>
										Hide Common Other Latents
									</span>
									<button
										className={
											"latent-top-sequences-item-other-latents-collection-type-toggle-hide-common-latents" +
											(isHidingCommonOtherLatents
												? " latent-top-sequences-item-other-latents-collection-type-toggle-hide-common-latents-active"
												: "")
										}
										onClick={toggleIsHidingCommonOtherLatents}
									></button>
								</div>
								<div className='latent-top-sequences-item-other-latents-label'>
									<i className='fa-solid fa-arrow-left-long'></i>
									<span>
										Left most latents are more connected to this latent (Layer {viewingLayerIndex + 1} Latent{" "}
										{viewingLatentIndex + 1})
									</span>
								</div>
								<div>
									{!viewingLatentTopOtherLatents || viewingLatentTopOtherLatents.length === 0 ? (
										<div className='latent-top-sequences-list-loading-circle-container'>
											<LoadingCircle center={true} size='s' />
										</div>
									) : (
										viewingLatentTopOtherLatents[
											sequenceOtherLatentsTypes[sequenceOtherLatentsTypeIndex]?.key +
												(isHidingCommonOtherLatents ? "_rare" : "")
										]?.map((viewingLatentTopOtherLatentsLayer, viewingLatentTopOtherLatentsLayerIndex) => (
											<div
												key={viewingLatentTopOtherLatentsLayerIndex}
												className={
													"latent-top-sequences-item-other-latents-layer" +
													(viewingLatentTopOtherLatentsLayerIndex > 5
														? " latent-top-sequences-item-other-latents-layer-use-higher-preview"
														: "")
												}
												style={{ "--layer-index": viewingLatentTopOtherLatentsLayerIndex }}
											>
												<div className='latent-top-sequences-item-other-latents-layer-title'>
													Layer {viewingLatentTopOtherLatentsLayerIndex + 1 < 10 ? "0" : ""}
													{viewingLatentTopOtherLatentsLayerIndex + 1}
												</div>
												<div className='latent-top-sequences-item-other-latents-layer-sequences'>
													{viewingLatentTopOtherLatentsLayer[index]?.slice(0, 16)?.map((otherLatent, index2) => (
														<div
															key={index2}
															className={
																"latent-top-sequences-item-other-latent-container" +
																(viewingLatentTopOtherLatentPreviews?.[
																	viewingLatentTopOtherLatentsLayerIndex
																]?.findIndex((e) => e?.latent === otherLatent?.latent) === -1
																	? " latent-top-sequences-item-other-latent-container-loading"
																	: "")
															}
														>
															<div
																className='latent-top-sequences-latents-latent-container'
																onMouseDown={(e) => e?.preventDefault()}
																onClick={(e) =>
																	goToLatent(e, viewingLatentTopOtherLatentsLayerIndex, otherLatent?.latent)
																}
																onAuxClick={(e) =>
																	goToLatent(e, viewingLatentTopOtherLatentsLayerIndex, otherLatent?.latent)
																}
																onMouseEnter={() =>
																	getLatentPreview(viewingLatentTopOtherLatentsLayerIndex, otherLatent?.latent)
																}
															>
																<div className='latent-top-sequences-latents-latent'>
																	<button>
																		<span>{otherLatent?.latent + 1}</span>
																	</button>
																	<div
																		ref={(el) => {
																			if (el) {
																				if (
																					el?.getBoundingClientRect()?.right >
																					window?.innerWidth * 0.76
																				) {
																					el.style.left = "unset";
																					el.style.right = "-24px";
																				} else {
																					el.style.left = "-24px";
																					el.style.right = "unset";
																				}
																			}
																		}}
																		className='latent-top-sequences-latent-preview'
																	>
																		<div className='latent-top-sequences-latent-preview-location'>
																			<span>Layer {viewingLatentTopOtherLatentsLayerIndex + 1}</span>
																			<span>Latent {otherLatent?.latent + 1}</span>
																		</div>
																		<div className='latent-top-sequences-latent-preview-top-sequences-label'>
																			Top Sequences
																		</div>
																		<div className='latent-top-sequences-latent-preview-top-sequences'>
																			{viewingLatentTopOtherLatentPreviews?.[
																				viewingLatentTopOtherLatentsLayerIndex
																			]
																				?.find((e) => e?.latent === otherLatent?.latent)
																				?.topSequences?.map((topSequence, topSequenceIndex) => (
																					<div
																						key={topSequenceIndex}
																						className='latent-top-sequences-latent-preview-top-sequence'
																					>
																						{topSequence}
																					</div>
																				))}
																		</div>
																	</div>
																</div>
															</div>
														</div>
													))}
												</div>
											</div>
										))
									)}
								</div>
							</div>
						</div>
					))
				)}
			</div>
			{!viewingLatentTopSequencesList || viewingLatentTopSequencesList?.length === 0 ? null : (
				<div className='latent-top-sequences-list-toggle-show-all-btn-container'>
					<button className='latent-top-sequences-list-toggle-show-all-btn' onClick={toggleIsShowingAll}>
						Show {isShowingAll ? "Less" : "More"} Latent Activated Sequences
					</button>
				</div>
			)}
		</div>
	);
};
