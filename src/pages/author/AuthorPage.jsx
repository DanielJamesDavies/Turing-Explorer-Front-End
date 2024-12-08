// Packages
import { useEffect } from "react";

// Components

// Logic

// Context

// Services

// Styles
import "./AuthorPage.css";

// Assets

export const AuthorPage = () => {
	useEffect(() => {
		document.title = "Author | Turing Explorer";
	}, []);

	const navigate = (e, url) => {
		if (e?.button === 1) return window.open(url, "_blank");
		window.location.href = url;
	};

	return (
		<div className='page author-page'>
			<div className='page-content'>
				<div className='page-title'>
					<span>Author</span>
				</div>
				<div className='author-name'>Daniel Davies</div>
				<div className='author-links'>
					{[
						{ label: "Portfolio", url: "https://www.danieljdavies.com" },
						{ label: "LinkedIn", url: "https://www.linkedin.com/in/daniel-james-davies/" },
					]?.map((link, index) => (
						<button className='button' key={index} onClick={(e) => navigate(e, link?.url)} onAuxClick={(e) => navigate(e, link?.url)}>
							<span>{link?.label}</span>
						</button>
					))}
				</div>
				<div className='author-subtitles'>
					<div className='author-subtitle'>
						<span>🥼</span>
						<span>Independent Mechanistic Interpretability Researcher</span>
					</div>
					<div className='author-subtitle'>
						<span>👨‍💻</span>
						<span>Machine Learning Engineer at Projekt Rising</span>
					</div>
					<div className='author-subtitle'>
						<span>🎓</span>
						<span>Artificial Intelligence MSc (Distinction) at Brunel University London</span>
					</div>
					<div className='author-subtitle'>
						<span>🎯</span>
						<span>Passionate About Building AI to Solve Complex Real-World Problems for Both Business and Humanity</span>
					</div>
					<div className='author-subtitle'>
						<span>🌍</span>
						<span>London, United Kingdom</span>
					</div>
				</div>
				<div className='author-text'>
					I am a diligent and hardworking Machine Learning Engineer with a MSc in Artificial Intelligence and a passion for solving
					complex real-world problems for both business and humanity. I am particularly interested in research and engineering in building
					and/or understanding ML models.
					<br />
					<br />I am exceedingly interested in mechanistic interpretability and deeply believe it is the path to both AI safety and
					increasing our intelligence.
				</div>
			</div>
		</div>
	);
};
