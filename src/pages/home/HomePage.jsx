// Packages

// Components
import { Background } from "./Background/Background";

// Logic

// Context

// Services

// Styles
import "./HomePage.css";

// Assets

export const HomePage = () => {
	return (
		<div className='page home-page'>
			<Background />
			<div className='home-hero'>
				<div className='home-title'>Turing Explorer</div>
				<div className='home-hero-text'>To understand the internals of a large language model.</div>
				<div className='home-primary-buttons'>
					<button>Download Turing-LLM Explorer</button>
					<button>Read Technical Blog</button>
				</div>
			</div>
		</div>
	);
};
