// Packages

// Components
import { LoadingCircle } from "../../../components/loading-circle/LoadingCircle";

// Logic
import { LatentConnectionsDisplayLogic } from "./LatentConnectionsDisplayLogic";

// Context

// Services

// Styles
import "./LatentConnectionsDisplay.css";

// Assets

export const LatentConnectionsDisplay = () => {
	const {
		inferenceResults,
		viewingInferenceResultId,
		isGettingLatentConnectionsResults,
		goToLatent,
		latentsLatentRef,
		latentsLatentWidth,
		latentPositionMouseOver,
		onLatentMouseEnter,
		onLatentMouseLeave,
		latentPreviews,
		getLatentPreview,
		isAnimatingTopLatentConnections,
		topLatentConnectionFrequencyPercentThresholds,
	} = LatentConnectionsDisplayLogic();

	if (
		!inferenceResults ||
		(!isGettingLatentConnectionsResults && !inferenceResults?.find((e) => e?.inference_id === viewingInferenceResultId)?.latentConnections)
	)
		return null;
	return (
		<div
			className={
				"inference-latent-connections-display-container" +
				(!inferenceResults?.find((e) => e?.inference_id === viewingInferenceResultId)?.latentConnections
					? " inference-latent-connections-display-container-loading"
					: "") +
				(isAnimatingTopLatentConnections ? " inference-latent-connections-display-container-is-animating-top-latent-connections" : "")
			}
		>
			<div className='inference-latent-connections-display-title'>Latent Connections</div>
			<div className='inference-latent-connections-display-loading-circle-container'>
				<LoadingCircle center={true} label='Gathering Latent Connections...' size='s' />
			</div>
			<div className='inference-latent-connections-display'>
				{!inferenceResults?.find((e) => e?.inference_id === viewingInferenceResultId)?.latentConnections
					? null
					: Array(12)
							.fill(0)
							.map((_, layerIndex) => (
								<div
									key={layerIndex}
									className={
										"inference-latent-connections-display-layer" +
										(layerIndex > 9 ? " inference-latent-connections-display-layer-use-higher-preview" : "")
									}
									style={{ "--layerIndex": layerIndex }}
								>
									<div className='inference-latent-connections-display-layer-label'>
										Layer {(layerIndex + 1).toString()?.length < 2 ? "0" : ""}
										{layerIndex + 1}
									</div>
									<div className='inference-latent-connections-display-layer-latents'>
										{inferenceResults
											?.find((e) => e?.inference_id === viewingInferenceResultId)
											?.topLatents?.[layerIndex]?.map((topLatent, latentIndex) => (
												<div
													ref={latentsLatentRef}
													key={latentIndex}
													className={
														"inference-latent-connections-display-latent-container" +
														(latentPreviews?.[layerIndex]?.findIndex((e) => e?.latent === topLatent?.latent) === -1
															? " inference-latent-connections-display-latent-container-loading"
															: "")
													}
													onMouseDown={(e) => e?.preventDefault()}
													onMouseEnter={() => onLatentMouseEnter(layerIndex, latentIndex)}
													onMouseLeave={() => onLatentMouseLeave(layerIndex, latentIndex)}
												>
													<div className='inference-latent-connections-display-latent'>
														<button
															onClick={(e) => goToLatent(e, layerIndex, topLatent?.latent)}
															onAuxClick={(e) => goToLatent(e, layerIndex, topLatent?.latent)}
															onMouseEnter={() => getLatentPreview(layerIndex, topLatent?.latent)}
														>
															<span>{topLatent?.latent + 1}</span>
														</button>
														<div className='inference-latent-connections-display-latent-preview'>
															<div className='inference-latent-connections-display-latent-preview-location'>
																<span>Layer {layerIndex + 1}</span>
																<span>Latent {topLatent?.latent + 1}</span>
															</div>
															<div className='inference-latent-connections-display-latent-preview-top-sequences-label'>
																Top Sequences
															</div>
															<div className='inference-latent-connections-display-latent-preview-top-sequences'>
																{latentPreviews?.[layerIndex]
																	?.find((e) => e?.latent === topLatent?.latent)
																	?.topSequences?.map((topSequence, topSequenceIndex) => (
																		<div
																			key={topSequenceIndex}
																			className='inference-latent-connections-display-latent-preview-top-sequence'
																		>
																			{topSequence}
																		</div>
																	))}
															</div>
														</div>
														{inferenceResults
															?.find((e) => e?.inference_id === viewingInferenceResultId)
															?.latentConnections?.filter(
																(e) =>
																	JSON.stringify(e?.latents[0]) ===
																		JSON.stringify({ latent: topLatent?.latent, layer: layerIndex }) &&
																	e?.latents[1]?.layer == layerIndex + 1
															)
															?.map((e) => {
																return {
																	...e,
																	connectedLatentPosition1: inferenceResults
																		?.find((e) => e?.inference_id === viewingInferenceResultId)
																		?.topLatents?.[layerIndex]?.findIndex(
																			(e2) => e2?.latent === e?.latents[0]?.latent
																		),
																	connectedLatentPosition2: inferenceResults
																		?.find((e) => e?.inference_id === viewingInferenceResultId)
																		?.topLatents?.[layerIndex + 1]?.findIndex(
																			(e2) => e2?.latent === e?.latents[1]?.latent
																		),
																};
															})
															?.map((relationship, index) => (
																<div
																	key={index}
																	className={
																		"inference-latent-connections-display-latent-connection-container" +
																		(JSON.stringify(latentPositionMouseOver) ===
																			JSON.stringify([layerIndex, relationship?.connectedLatentPosition1]) ||
																		JSON.stringify(latentPositionMouseOver) ===
																			JSON.stringify([layerIndex + 1, relationship?.connectedLatentPosition2])
																			? JSON.stringify(latentPositionMouseOver) ===
																			  JSON.stringify([
																					layerIndex + 1,
																					relationship?.connectedLatentPosition2,
																			  ])
																				? " inference-latent-connections-display-latent-connection-container-active inference-latent-connections-display-latent-connection-container-active-before"
																				: " inference-latent-connections-display-latent-connection-container-active inference-latent-connections-display-latent-connection-container-active-after"
																			: latentPositionMouseOver !== false
																			? " inference-latent-connections-display-latent-connection-container-inactive"
																			: " inference-latent-connections-display-latent-connection-container-no-hover")
																	}
																	style={{
																		"--intensity": relationship?.frequency / 160,
																	}}
																>
																	<div
																		key={index}
																		className={
																			"inference-latent-connections-display-latent-connection" +
																			(relationship?.frequency / 160 >=
																			topLatentConnectionFrequencyPercentThresholds[layerIndex]
																				? " inference-latent-connections-display-latent-connection-active"
																				: "")
																		}
																		style={{
																			"--angle":
																				-1 *
																					(Math.atan(
																						(latentsLatentWidth *
																							relationship?.connectedLatentPosition2 -
																							latentsLatentWidth * latentIndex) /
																							(160 - 9 - 4)
																					) *
																						(180 / Math.PI)) +
																				"deg",
																			"--length":
																				Math.hypot(
																					latentsLatentWidth * relationship?.connectedLatentPosition2 -
																						latentsLatentWidth * latentIndex,
																					160 - 9 - 4
																				) + "px",
																		}}
																	></div>
																	<div
																		className='inference-latent-connections-display-latent-connection-frequency inference-latent-connections-display-latent-connection-frequency-before'
																		style={{
																			"--left":
																				(relationship?.connectedLatentPosition2 - latentIndex) *
																					(latentsLatentWidth / 4.5) +
																				"px",
																		}}
																	>
																		{(relationship?.frequency / 160).toFixed(3)}
																	</div>
																	<div
																		className='inference-latent-connections-display-latent-connection-frequency inference-latent-connections-display-latent-connection-frequency-after'
																		style={{
																			"--left":
																				latentsLatentWidth *
																					(relationship?.connectedLatentPosition2 - latentIndex) *
																					0.75 +
																				"px",
																		}}
																	>
																		{(relationship?.frequency / 160).toFixed(3)}
																	</div>
																</div>
															))}
													</div>
												</div>
											))}
									</div>
								</div>
							))}
			</div>
		</div>
	);
};
