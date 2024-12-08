// Packages
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Components

// Logic

// Context

// Services

// Styles
import "./HomePage.css";

// Assets

export const HomePage = () => {
	const navigate = useNavigate();

	useEffect(() => {
		document.title = "Turing Explorer";
	}, []);

	const navigateToPage = (e, path) => {
		if (e?.button === 1) return window.open(window?.location?.origin + path, "_blank");
		navigate(path);
	};

	const onInferenceInputKeyDown = (e) => {
		if (e?.key?.toLowerCase() === "enter") {
			if (e?.target?.value?.trim()?.length === 0) return navigate("/inference");
			navigate("/inference?input=" + encodeURI(e?.target?.value));
		}
	};

	return (
		<div className='page home-page'>
			<div className='home-hero'>
				<div className='home-hero-title'>
					<span>
						An interpretability tool for understanding
						<br /> the internal mechanisms of Turing&#8209;LLM
					</span>
					<span>An interpretability tool for understanding Turing&#8209;LLM</span>
				</div>
				<input
					className='home-hero-inference-input'
					placeholder='Type a prompt for Turing-LLM to complete'
					onKeyDown={onInferenceInputKeyDown}
				></input>
				<div className='home-primary-buttons'>
					<button
						className='button'
						onMouseDown={(e) => e?.preventDefault()}
						onClick={(e) => navigateToPage(e, "/explore")}
						onAuxClick={(e) => navigateToPage(e, "/explore")}
					>
						<span>Explore Latents</span>
					</button>
					<button
						className='button'
						onMouseDown={(e) => e?.preventDefault()}
						onClick={(e) => navigateToPage(e, "/research")}
						onAuxClick={(e) => navigateToPage(e, "/research")}
					>
						<span>Read Research Blog</span>
					</button>
				</div>
			</div>
			<div className='home-section home-cards'>
				<div className='home-card home-card-turing-explorer'>
					<div className='home-card-image'>
						<i className='fa-solid fa-magnifying-glass'></i>
					</div>
					<div className='home-card-title'>Turing Explorer</div>
					<div className='home-card-text'>Designed to advance the study and understanding of inner mechanisms in LLMs</div>
				</div>
				<div className='home-card home-card-turing-llm'>
					<div className='home-card-image'></div>
					<div className='home-card-title'>Turing-LLM</div>
					<div className='home-card-text'>
						Build to simplify and enhance
						<br /> comprehension of how LLMs operate
					</div>
				</div>
				<div className='home-card home-card-research'>
					<div className='home-card-image'>
						<i className='fa-solid fa-book-bookmark'></i>
					</div>
					<div className='home-card-title'>Research</div>
					<div className='home-card-text'>Focused on careful, step-by-step inquiry to broaden our understanding of LLMs</div>
				</div>
			</div>
			<div className='home-section'>
				<div className='home-subtitle'>The Mission</div>
				<div className='home-text'>
					By deeply understanding how AI models operate, we have the potential to significantly enhance human intelligence. Through
					understanding and integrating advanced algorithms found in deep learning models—either by learning them ourselves or by
					enhancing our brains—we can adopt more effective problem-solving strategies. A comprehensive mechanistic understanding of
					superintelligent systems can open up opportunities for a coevolutionary journey towards a safer and smarter future.
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
			<div className='home-section'>
				<div className='home-subtitle'>Motivation & Hypothesis</div>
				<div className='home-text'>
					<b>Hypothesis:</b> Solving mechanistic interpretability could allow us to greatly increase human intelligence.
					<br />
					<br />
					<b>Reasoning:</b>
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
					<b>Conclusion:</b> This may be the best path to true ensured safety, not only through aligning models, but through coevolving
					together.
				</div>
			</div>
		</div>
	);
};
