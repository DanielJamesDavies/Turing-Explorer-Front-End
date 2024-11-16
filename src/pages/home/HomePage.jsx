// Packages
import { useNavigate } from "react-router-dom";

// Components
import { NeuralNetBackground } from "../../components/neural-net-background/NeuralNetBackground";

// Logic

// Context

// Services

// Styles
import "./HomePage.css";

// Assets

export const HomePage = () => {
	const navigate = useNavigate();

	return (
		<div className='page home-page'>
			<NeuralNetBackground />
			<div className='home-hero'>
				<div className='home-title'>Turing Explorer</div>
				<div className='home-hero-text'>To understand the internals of a large language model.</div>
				<div className='home-primary-buttons'>
					<button onClick={() => navigate("/download")}>Download Turing-LLM Explorer</button>
					<button onClick={() => navigate("/technical-reports")}>Read Technical Reports</button>
				</div>
			</div>
			<div className='home-section'>
				<div className='home-subtitle'>Progress</div>
				<div className='home-progress-list'>
					{[
						{ label: "Generated a 2B Token Synthetic Dataset", status: "done" },
						{ label: "Built and Trained Turing-LLM-1.0-254M", status: "done" },
						{ label: "Trained Sparse Autoencoders on LLM Activations", status: "done" },
						{ label: "Developing & Evaluating Novel Interpretability Approaches", status: "doing" },
						{ label: "Assembling a Tool to Explore Turing-LLM", status: "doing" },
					]?.map((progressItem, index) => (
						<div key={index} className='home-progress-item'>
							{progressItem?.status === "done" ? (
								<i className='fa-solid fa-circle-check'></i>
							) : progressItem?.status === "doing" ? (
								<i className='fa-solid fa-circle-notch'></i>
							) : (
								<i className='fa-regular fa-circle'></i>
							)}
							<div className='home-progress-item-label'>{progressItem?.label}</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
