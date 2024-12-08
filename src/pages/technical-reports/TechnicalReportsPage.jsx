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

	const navigateToPage = (e, id) => {
		if (e?.button === 1) return window.open(window?.location?.origin + "/research/" + id, "_blank");
		navigate("/research/" + id);
	};

	useEffect(() => {
		document.title = "Research | Turing Explorer";
	}, []);

	return (
		<div className='page technical-reports-page'>
			<div className='page-content'>
				<div className='page-title'>
					<span>Research</span>
				</div>
				<div className='technical-reports-list'>
					{!technicalReports
						? null
						: technicalReports?.map((technicalReportItem, index) => (
								<div
									key={index}
									className={
										"technical-reports-list-item" +
										(" technical-reports-list-item-" + technicalReportItem?.id?.replaceAll(".", "-")) +
										(technicalReportItem?.uncomplete ? " technical-reports-list-item-uncomplete" : "")
									}
									onMouseDown={(e) => e?.preventDefault()}
									onClick={(e) => (technicalReportItem?.uncomplete ? () => {} : navigateToPage(e, technicalReportItem?.id))}
									onAuxClick={(e) => (technicalReportItem?.uncomplete ? () => {} : navigateToPage(e, technicalReportItem?.id))}
								>
									<div className='technical-reports-list-item-image'>
										<img
											src={"/technical-reports/" + technicalReportItem?.id + "/cover/bg.png"}
											alt=''
											onError={(e) => (e?.target ? (e.target.style = "display: none") : null)}
										/>
										<img
											src={"/technical-reports/" + technicalReportItem?.id + "/cover/img1.png"}
											alt=''
											onError={(e) => (e?.target ? (e.target.style = "display: none") : null)}
										/>
										<img
											src={"/technical-reports/" + technicalReportItem?.id + "/cover/img2.png"}
											alt=''
											onError={(e) => (e?.target ? (e.target.style = "display: none") : null)}
										/>
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
