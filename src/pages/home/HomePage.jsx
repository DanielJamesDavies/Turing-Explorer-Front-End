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
			<div className='home-hero'>
				<div className='home-title'>Turing Explorer</div>
				<div className='home-hero-text'>To understand the internals of a large language model.</div>
				<div className='home-primary-buttons'>
					<button onClick={() => navigate("/download")}>Download Turing-LLM Explorer</button>
					<button onClick={() => navigate("/technical-reports")}>Read Technical Reports</button>
				</div>
			</div>
			<div className='home-section'>
				<div className='home-subtitle'>Motivation & Hypothesis</div>
				<div className='home-text'>
					Hypothesis: Solving mechanistic interpretability could allow us to greatly increase human intelligence.
					<br />
					<br />
					<span>Reasoning:</span>
					<ul>
						<li>
							A model that can solve a problem better than any human must contain algorithms that are better for solving the problem
							than those we have.
						</li>
						<li>With mechanistic interpretability, we could discover these more competent algorithms within deep learning models.</li>
						<li>
							Once we have acquired these algorithms, we could learn them (updating our software) or modify the brain to contain them
							(updating our hardware).
						</li>
						<li>
							Thus, interpretability can enable us to advance our own intelligence to keep up with the most intelligent models, not
							through reliance on superintelligent models but through learning and modifying ourselves.
						</li>
					</ul>
					<br />
					Conclusion: This may be the best path to true ensured safety, not only through aligning models, but through coevolving together.
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
