// Packages
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// Components

// Logic

// Context

// Services

// Styles
import "./NeuralNetBackground.css";

// Assets

export const NeuralNetBackground = () => {
	const location = useLocation();
	const [windowInnerWidth, setWindowInnerWidth] = useState(window.innerWidth);
	const [windowInnerHeight, setWindowInnerHeight] = useState(window.innerHeight);
	const [activatedNeuronConnections, setActivatedNeuronConnections] = useState([]);
	const [neuronConnectionsVisibility, setNeuronConnectionsVisibility] = useState(false);
	const [layerAnimating, setLayerAnimating] = useState(-1);

	useEffect(() => {
		const onWindowResize = () => {
			setWindowInnerWidth(window.innerWidth);
			setWindowInnerHeight(window.innerHeight);
		};
		window.addEventListener("resize", onWindowResize);
		return () => window.removeEventListener("resize", onWindowResize);
	}, [setWindowInnerWidth]);

	useEffect(() => {
		const intervalDuration = ["research"].includes(location?.pathname?.split("/")?.filter((e) => e?.length !== 0)?.[0]) ? 16000 : 6000;
		const interval = setInterval(() => setLayerAnimating((oldValue) => (oldValue >= 8 ? -1 : oldValue + 1)), intervalDuration / 10);
		return () => clearInterval(interval);
	}, [setLayerAnimating]);

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
		const intervalDuration = ["research"].includes(location?.pathname?.split("/")?.filter((e) => e?.length !== 0)?.[0]) ? 16000 : 6000;
		const interval = setInterval(() => getNeuronConnectionsVisibility(), intervalDuration);
		return () => clearInterval(interval);
	}, [setNeuronConnectionsVisibility, location]);

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
		const intervalDuration = ["technical-report"].includes(location?.pathname?.split("/")?.filter((e) => e?.length !== 0)?.[0]) ? 16000 : 6000;
		const interval = setInterval(() => getNewActivatedNeuronConnections(), intervalDuration);
		return () => clearInterval(interval);
	}, [setActivatedNeuronConnections, location]);

	if (!neuronConnectionsVisibility) return null;
	return (
		<div className={"neural-net-background-container neural-net-background-container-running-animations"}>
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
															activatedNeuronConnections?.[layer_index]?.[neuron_index]?.[connection_index];
														if (
															!activatedNeuronConnection &&
															(Math.abs(neuron_index - connection_index) > 3 ||
																!neuronConnectionsVisibility?.[layer_index]?.[neuron_index]?.[connection_index])
														)
															return null;
														return (
															<div
																key={connection_index}
																className={
																	"neural-net-background-neural-network-neuron-connection" +
																	(activatedNeuronConnection
																		? " neural-net-background-neural-network-neuron-connection-active"
																		: "") +
																	(activatedNeuronConnection && layerAnimating === layer_index
																		? " neural-net-background-neural-network-neuron-connection-active-animating"
																		: "") +
																	(activatedNeuronConnection && layerAnimating + 1 === layer_index
																		? " neural-net-background-neural-network-neuron-connection-active-animating-previous"
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
															activatedNeuronConnections?.[layer_index]?.[neuron_index]?.[connection_index];
														if (
															!activatedNeuronConnection &&
															(Math.abs(neuron_index - connection_index) > 3 ||
																!neuronConnectionsVisibility?.[layer_index]?.[neuron_index]?.[connection_index])
														)
															return null;
														return (
															<div
																key={connection_index}
																className={
																	"neural-net-background-neural-network-neuron-connection" +
																	(activatedNeuronConnection
																		? " neural-net-background-neural-network-neuron-connection-active"
																		: "") +
																	(activatedNeuronConnection && layerAnimating === layer_index
																		? " neural-net-background-neural-network-neuron-connection-active-animating"
																		: "") +
																	(activatedNeuronConnection && layerAnimating + 1 === layer_index
																		? " neural-net-background-neural-network-neuron-connection-active-animating-previous"
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
