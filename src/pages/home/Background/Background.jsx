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
	const [neuronConnectionsVisibility, setNeuronConnectionsVisibility] = useState(false);

	useEffect(() => {
		const getNeuronConnectionsVisibility = () => {
			setNeuronConnectionsVisibility(
				Array(9)
					?.fill(0)
					?.map(() =>
						Array(9)
							?.fill(0)
							?.map(() =>
								Math.random() > 0.8
									? Array(9)
											?.fill(0)
											?.map(() => false)
									: Array(9)
											?.fill(0)
											?.map(() => Math.random() < 0.3)
							)
					)
			);
		};
		getNeuronConnectionsVisibility();
		const interval = setInterval(() => getNeuronConnectionsVisibility(), 4000);
		return () => {
			clearInterval(interval);
		};
	}, [setNeuronConnectionsVisibility]);

	useEffect(() => {
		const getNewActivatedNeuronConnections = () => {
			setActivatedNeuronConnections(
				Array(9)
					?.fill(0)
					?.map(() =>
						Array(9)
							?.fill(0)
							?.map(() =>
								Math.random() > 0.7
									? Array(9)
											?.fill(0)
											?.map(() => false)
									: Array(9)
											?.fill(0)
											?.map(() => Math.random() < 0.25)
							)
					)
			);
		};
		getNewActivatedNeuronConnections();
		const interval = setInterval(() => getNewActivatedNeuronConnections(), 4000);
		return () => {
			clearInterval(interval);
		};
	}, [setActivatedNeuronConnections]);

	if (!neuronConnectionsVisibility) return null;
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
													const activatedNeuronConnection =
														Math.abs(neuron_index - connection_index) < 3 &&
														activatedNeuronConnections[layer_index][neuron_index][connection_index];
													if (
														!activatedNeuronConnection &&
														(Math.abs(neuron_index - connection_index) > 3 ||
															!neuronConnectionsVisibility[layer_index][neuron_index][connection_index])
													)
														return null;
													return (
														<div
															key={connection_index}
															className={
																"home-background-neural-network-neuron-connection" +
																(activatedNeuronConnection
																	? " home-background-neural-network-neuron-connection-active"
																	: "")
															}
															style={{
																"--angle":
																	Math.atan(
																		((120 + 40) * connection_index -
																			(120 + 40) * neuron_index -
																			(120 + 40) * ((9 - 9) / 2) * -1) /
																			250
																	) *
																		(180 / Math.PI) +
																	"deg",
																"--length":
																	Math.hypot(
																		(120 + 40) * connection_index -
																			(120 + 40) * neuron_index -
																			(120 + 40) * ((9 - 9) / 2) * -1,
																		250
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
													const activatedNeuronConnection =
														Math.abs(neuron_index - connection_index) < 3 &&
														activatedNeuronConnections[layer_index][neuron_index][connection_index];
													if (
														!activatedNeuronConnection &&
														(Math.abs(neuron_index - connection_index) > 3 ||
															!neuronConnectionsVisibility[layer_index][neuron_index][connection_index])
													)
														return null;
													return (
														<div
															key={connection_index}
															className={
																"home-background-neural-network-neuron-connection" +
																(activatedNeuronConnection
																	? " home-background-neural-network-neuron-connection-active"
																	: "")
															}
															style={{
																"--angle":
																	Math.atan(
																		((120 + 40) * connection_index -
																			(120 + 40) * neuron_index -
																			(120 + 40) * ((9 - 9) / 2) * -1) /
																			250
																	) *
																		(180 / Math.PI) +
																	"deg",
																"--length":
																	Math.hypot(
																		(120 + 40) * connection_index -
																			(120 + 40) * neuron_index -
																			(120 + 40) * ((9 - 9) / 2) * -1,
																		250
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
