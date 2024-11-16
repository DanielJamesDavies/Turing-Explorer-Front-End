// Packages
import { useState, useEffect } from "react";

// Components

// Logic

// Context

// Services

// Styles
import "./Background.css";

// Assets

export const Background = () => {
	const [activatedNeuronConnections, setActivatedNeuronConnections] = useState([]);

	useEffect(() => {
		const getNewActivatedNeuronConnections = () => {
			setActivatedNeuronConnections(
				Array(8 * 6)
					.fill(0)
					.map((_, i) => {
						const neuron_index = Math.floor(Math.random() * 9);
						const connection_offset = Math.floor(Math.random() * 5) - 2;
						const connection_index = Math.min(6, Math.max(0, neuron_index + connection_offset));
						return JSON.stringify([i % 8, neuron_index, connection_index]);
					})
			);
		};
		getNewActivatedNeuronConnections();
		const interval = setInterval(() => getNewActivatedNeuronConnections(), 5000);
		return () => {
			clearInterval(interval);
		};
	}, [setActivatedNeuronConnections]);

	return (
		<div className='home-background'>
			<div className='home-background-neural-network'>
				{Array(9)
					?.fill(0)
					?.map((_, layer_index) => (
						<div key={layer_index} className='home-background-neural-network-layer'>
							{Array(9)
								?.fill(0)
								?.map((_, neuron_index) => (
									<div key={neuron_index} className='home-background-neural-network-neuron-container'>
										<div className='home-background-neural-network-neuron-circle'></div>
										<div className='home-background-neural-network-neuron-connections'>
											{Array(9)
												?.fill(0)
												?.map((_, connection_index) => {
													if (Math.random() < 0.95) return null;
													const activatedNeuronConnection = activatedNeuronConnections.find(
														(e) => e === JSON.stringify([layer_index, neuron_index, connection_index])
													);
													return (
														<div
															key={connection_index}
															className='home-background-neural-network-neuron-connection'
															style={{
																"--z-index": activatedNeuronConnection ? 2 : 1,
																"--background": activatedNeuronConnection
																	? "var(--colour-white)"
																	: "var(--colour-grey-20)",
																"--angle":
																	Math.atan(
																		(140 * connection_index - 140 * neuron_index - 140 * ((9 - 9) / 2) * -1) /
																			220
																	) *
																		(180 / Math.PI) +
																	"deg",
																"--length":
																	Math.hypot(
																		140 * connection_index - 140 * neuron_index - 140 * ((9 - 9) / 2) * -1,
																		220
																	) + "px",
															}}
														></div>
													);
												})}
										</div>
									</div>
								))}
						</div>
					))}
			</div>
		</div>
	);
};
