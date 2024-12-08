// Packages
import { useNavigate } from "react-router-dom";

// Components

// Logic

// Context

// Services

// Styles
import "./ExplorePage.css";

// Assets

export const ExplorePage = () => {
	const navigate = useNavigate();

	const onInferenceInputKeyDown = (e) => {
		if (e?.key?.toLowerCase() === "enter") {
			if (e?.target?.value?.trim()?.length === 0) return navigate("/explore");
			navigate("/explore?input=" + encodeURI(e?.target?.value));
		}
	};

	return (
		<div className='page explore-page'>
			<div className='explore-input-container'>
				<div className='explore-input-title'>
					<span>Explore Turing&#8209;LLM</span>
				</div>
				<input className='explore-input' placeholder='Search latents by typing keywords' onKeyDown={onInferenceInputKeyDown}></input>
				<label>e.g. Relativity</label>
			</div>
		</div>
	);
};
