// Packages

// Components

// Logic

// Context

// Services

// Styles
import "./TechnicalReportsPage.css";

// Assets

export const TechnicalReportsPage = () => {
	return (
		<div className='page technical-reports-page'>
			<div className='page-content'>
				<div className='page-title'>Technical Reports</div>
				<div className='technical-reports-list'>
					{[
						{ title: "Discovering Latent Connections", image: "images/Latent Connections/preview.png" },
						{ title: "Using TopK Sparse Autoencoders on Turing-LLM-1.0-254M", image: "images/Sparse Autoencoders/preview.png" },
						{ title: "Building Turing-LLM-1.0-254M", image: "images/Turing-LLM-1.0-254M/preview.png" },
					]?.map((technicalReportItem, index) => (
						<div key={index} className='technical-reports-list-item'>
							<div className='technical-reports-list-item-image'>
								<img src='/images/preview-small.png' />
								<img src={technicalReportItem?.image || "/images/preview.png"} />
							</div>
							<div className='technical-reports-list-item-title'>
								{technicalReportItem?.title?.split("-")?.map((str, i) => (
									<>
										<span>{str}</span>
										{i + 1 >= technicalReportItem?.title?.split("-")?.length ? null : <span>&#8209;</span>}
									</>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
