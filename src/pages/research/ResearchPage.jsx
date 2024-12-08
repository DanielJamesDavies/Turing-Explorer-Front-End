// Packages
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Components

// Logic

// Context

// Services

// Styles
import "./ResearchPage.css";

// Assets

export const ResearchPage = () => {
	const [researchPapers, setResearchPapers] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		document.title = "Research | Turing Explorer";
	}, []);

	useEffect(() => {
		fetch(`/research-papers/research-papers.json`)
			.then((res) => res?.json())
			.then((res) => setResearchPapers(res?.["research-papers"]))
			.catch((e) => console.log("Error:", e));
	}, []);

	const navigateToPage = (e, id) => {
		if (e?.button === 1) return window.open(window?.location?.origin + "/research/" + id, "_blank");
		navigate("/research/" + id);
	};

	return (
		<div className='page research-papers-page'>
			<div className='page-content'>
				<div className='page-title'>
					<span>Research</span>
				</div>
				<div className='research-papers-list'>
					{!researchPapers
						? null
						: researchPapers?.map((researchPaperItem, index) => (
								<div
									key={index}
									className={
										"research-papers-list-item" +
										(" research-papers-list-item-" + researchPaperItem?.id?.replaceAll(".", "-")) +
										(researchPaperItem?.uncomplete ? " research-papers-list-item-uncomplete" : "")
									}
									onMouseDown={(e) => e?.preventDefault()}
									onClick={(e) => (researchPaperItem?.uncomplete ? () => {} : navigateToPage(e, researchPaperItem?.id))}
									onAuxClick={(e) => (researchPaperItem?.uncomplete ? () => {} : navigateToPage(e, researchPaperItem?.id))}
								>
									<div className='research-papers-list-item-image'>
										<img
											src={"/research-papers/" + researchPaperItem?.id + "/cover/bg.png"}
											alt=''
											onError={(e) => (e?.target ? (e.target.style = "display: none") : null)}
										/>
										<img
											src={"/research-papers/" + researchPaperItem?.id + "/cover/img1.png"}
											alt=''
											onError={(e) => (e?.target ? (e.target.style = "display: none") : null)}
										/>
										<img
											src={"/research-papers/" + researchPaperItem?.id + "/cover/img2.png"}
											alt=''
											onError={(e) => (e?.target ? (e.target.style = "display: none") : null)}
										/>
									</div>
									<div className='research-papers-list-item-title'>
										{researchPaperItem?.title?.split("-")?.map((str, i) => (
											<span key={i}>
												<span>{str}</span>
												{i + 1 >= researchPaperItem?.title?.split("-")?.length ? null : <span>&#8209;</span>}
											</span>
										))}
									</div>
								</div>
						  ))}
				</div>
			</div>
		</div>
	);
};
