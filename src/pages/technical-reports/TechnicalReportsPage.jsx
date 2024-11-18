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
