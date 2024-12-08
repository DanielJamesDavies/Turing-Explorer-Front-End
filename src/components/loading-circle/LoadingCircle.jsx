// Packages

// Components

// Logic

// Context

// Services

// Styles
import "./LoadingCircle.css";

// Assets

export const LoadingCircle = ({ className, size, center, label }) => {
	return (
		<div
			className={
				"loading-circle-container" +
				(size ? " loading-circle-container-" + size : "") +
				(className ? " " + className : "") +
				(center ? " loading-circle-container-centered" : "")
			}
		>
			<div className='loading-circles'>
				<div className='loading-circle-wrapper'>
					<div className='loading-circle'>
						<div className='loading-circle-circle' />
					</div>
				</div>
				<div className='loading-circle-small-wrapper'>
					<div className='loading-circle-small'>
						<div className='loading-circle-circle' />
					</div>
				</div>
			</div>
			{label === undefined ? null : <div className='loading-circle-label'>{label}</div>}
		</div>
	);
};
