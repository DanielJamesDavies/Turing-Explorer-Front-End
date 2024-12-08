// Packages
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

// Components

// Logic

// Context

// Services

// Styles
import "./TechnicalReportPage.css";

// Assets

export const TechnicalReportPage = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [reportData, setReportData] = useState(false);

	useEffect(() => {
		fetch(`/technical-reports/${id}/main.json`)
			.then((res) => res?.json())
			.then((res) => setReportData(res))
			.catch((e) => console.log("Error:", e));
	}, [id]);

	useEffect(() => {
		document.title = "Research | Turing Explorer";
		if (reportData?.short_title) {
			document.title = reportData?.short_title + " | Research | Turing Explorer";
		}
	}, [id, reportData]);

	const processText = (text) => {
		return text.split("<|references|")?.map((string, i) =>
			i === 0 ? (
				<ReactMarkdown children={string} />
			) : (
				<span key={i}>
					<span className='technical-report-intext-references'>
						<span>[</span>
						{string
							.split("|>")[0]
							?.split("|")
							?.map((referenceId, index) => (
								<span key={index} className='technical-report-intext-reference'>
									{reportData?.references?.findIndex((e) => e?.id === referenceId) + 1 || "MISSING REFERENCE"}
								</span>
							))}
						<span>]</span>
					</span>
					<span>
						<ReactMarkdown
							children={string
								.split("|>")
								?.filter((_, i) => i !== 0)
								?.join("|>")}
						/>
					</span>
				</span>
			)
		);
	};

	const navigateToPage = (e, path) => {
		if (e?.button === 1) return window.open(window?.location?.origin + path, "_blank");
		navigate(path);
	};

	return (
		<div className='page technical-report-page'>
			{!reportData ? null : (
				<div className='page-content'>
					<div className='page-title' style={{ "--title-scale": reportData?.titleScale || 1 }}>
						<span>{reportData?.title}</span>
						{reportData?.id === "turing-llm-1.0" ? (
							<div className='page-title-buttons'>
								<button
									className='button'
									onMouseDown={(e) => e?.preventDefault()}
									onClick={(e) => navigateToPage(e, "/inference")}
									onAuxClick={(e) => navigateToPage(e, "/inference")}
								>
									<span>Try Turing-LLM</span>
								</button>
							</div>
						) : null}
					</div>
					<div className='technical-report-section-1'>
						<div className='technical-report-text'>{processText(reportData?.abstract)}</div>
					</div>
					{!reportData
						? null
						: reportData?.content?.map((sectionData, i) => (
								<div key={i} className='technical-report-section-1'>
									{sectionData?.map((sectionContentData, j) =>
										sectionContentData?.type === "image" ? (
											<div
												key={j}
												className={
													"technical-report-image" +
													(j !== 0 && !["heading-1"].includes(sectionData[j - 1]?.style)
														? " technical-report-image-margin"
														: "")
												}
											>
												<img src={"/technical-reports/" + reportData?.id + "/images/" + sectionContentData?.filename} />
												<label>
													Figure{" "}
													{(i === 0
														? 0
														: reportData?.content
																?.slice(0, i)
																?.flat()
																?.filter((e) => e?.type === "image")?.length) +
														(j === 0 ? 0 : sectionData?.slice(0, j)?.filter((e) => e?.type === "image")?.length) +
														1}
													: {sectionContentData?.label}
												</label>
											</div>
										) : (
											<div key={j} className={"technical-report-text technical-report-" + sectionContentData?.style}>
												{processText(sectionContentData?.text)}
											</div>
										)
									)}
								</div>
						  ))}
				</div>
			)}
		</div>
	);
};
