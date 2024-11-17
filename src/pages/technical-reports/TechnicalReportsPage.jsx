// Packages
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Components

// Logic

// Context

// Services

// Styles
import "./TechnicalReportsPage.css";

// Assets

export const TechnicalReportsPage = () => {
	const [technicalReports, setTechnicalReports] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		fetch(`/technical-reports/technical-reports.json`)
			.then((res) => res?.json())
			.then((res) => setTechnicalReports(res?.["technical-reports"]))
			.catch((e) => console.log("Error:", e));
	}, []);

	const onClickReportItem = (e, id) => {
		if (e?.button === 1) return window.open(window?.location?.origin + "/technical-report/" + id, "_blank");
		navigate("/technical-report/" + id);
	};

	return (
		<div className='page technical-reports-page'>
			<div className='page-content'>
				<div className='page-title'>Technical Reports</div>
				<div className='technical-reports-list'>
					{/* [
						{ id: "latent-connections", title: "Discovering Latent Connections", image: "images/Latent Connections/preview.png" },
						{
							id: "topk-sparse-autoencoders",
							title: "Using TopK Sparse Autoencoders on Turing-LLM-1.0-254M",
							image: "images/Sparse Autoencoders/preview.png",
						},
						{ id: "turing-llm-1.0", title: "Building Turing-LLM-1.0-254M", image: "images/Turing-LLM-1.0-254M/preview.png" },
					] */}
					{!technicalReports
						? null
						: technicalReports?.map((technicalReportItem, index) => (
								<div
									key={index}
									className='technical-reports-list-item'
									onClick={(e) => onClickReportItem(e, technicalReportItem?.id)}
									onAuxClick={(e) => onClickReportItem(e, technicalReportItem?.id)}
								>
									<div className='technical-reports-list-item-image'>
										<img src='/images/preview-small.png' />
										<img src={"/technical-reports/" + technicalReportItem?.id + "/preview.png" || "/images/preview.png"} />
									</div>
									<div className='technical-reports-list-item-title'>
										{technicalReportItem?.title?.split("-")?.map((str, i) => (
											<span key={i}>
												<span>{str}</span>
												{i + 1 >= technicalReportItem?.title?.split("-")?.length ? null : <span>&#8209;</span>}
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
