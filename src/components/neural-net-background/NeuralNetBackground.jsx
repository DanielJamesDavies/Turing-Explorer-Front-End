// Packages
import { useState, useEffect } from "react";

// Components

// Logic

// Context

// Services

// Styles
import "./NeuralNetBackground.css";

// Assets

export const NeuralNetBackground = () => {
	const [windowInnerWidth, setWindowInnerWidth] = useState(window.innerWidth);
	const [windowInnerHeight, setWindowInnerHeight] = useState(window.innerHeight);
	const [activatedNeuronConnections, setActivatedNeuronConnections] = useState([]);
	const [neuronConnectionsVisibility, setNeuronConnectionsVisibility] = useState(false);

	useEffect(() => {
		const onWindowResize = () => {
			setWindowInnerWidth(window.innerWidth);
			setWindowInnerHeight(window.innerHeight);
		};
		window.addEventListener("resize", onWindowResize);
		return () => window.removeEventListener("resize", onWindowResize);
	}, [setWindowInnerWidth]);

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
								Math.random() > 0.6
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
		<div className='neural-net-background-container'>
			<div className='neural-net-background' style={{ "--scale": Math.max(windowInnerHeight / 1400, windowInnerWidth / 2300) }}>
				<div className='neural-net-background-neural-network'>
					{Array(9)
						?.fill(0)
						?.map((_, layer_index) => (
							<div key={layer_index} className='neural-net-background-neural-network-layer'>
								{Array(9)
									?.fill(0)
									?.map((_, neuron_index) => (
										<div key={neuron_index} className='neural-net-background-neural-network-neuron-container'>
											<div className='neural-net-background-neural-network-neuron-circle'></div>
											<div className='neural-net-background-neural-network-neuron-connections'>
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
																	"neural-net-background-neural-network-neuron-connection" +
																	(activatedNeuronConnection
																		? " neural-net-background-neural-network-neuron-connection-active"
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
				<div className='neural-net-background-neural-network'>
					{Array(9)
						?.fill(0)
						?.map((_, layer_index) => (
							<div key={layer_index} className='neural-net-background-neural-network-layer'>
								{Array(9)
									?.fill(0)
									?.map((_, neuron_index) => (
										<div key={neuron_index} className='neural-net-background-neural-network-neuron-container'>
											<div className='neural-net-background-neural-network-neuron-circle'></div>
											<div className='neural-net-background-neural-network-neuron-connections'>
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
																	"neural-net-background-neural-network-neuron-connection" +
																	(activatedNeuronConnection
																		? " neural-net-background-neural-network-neuron-connection-active"
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
		</div>
	);
};
