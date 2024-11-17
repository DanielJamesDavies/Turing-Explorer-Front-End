// Packages
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Components

// Logic

// Context

// Services

// Styles
import "./TechnicalReportPage.css";

// Assets

export const TechnicalReportPage = () => {
	const { id } = useParams();
	const [reportData, setReportData] = useState(false);

	useEffect(() => {
		fetch(`/technical-reports/${id}/main.json`)
			.then((res) => res?.json())
			.then((res) => setReportData(res))
			.catch((e) => console.log("Error:", e));
	}, [id]);

	return (
		<div className='page technical-report-page'>
			{!reportData ? null : (
				<div className='page-content'>
					<div className='page-title' style={{ "--title-scale": reportData?.titleScale || 1 }}>
						{reportData?.title}
					</div>
					<div className='technical-report-section-1'>
						<div className='technical-report-text'>{reportData?.abstract}</div>
					</div>
					<div className='technical-report-section-1'>
						<div className='technical-report-heading-1'>Introduction</div>
						<div className='technical-report-text'>
							<br />
							Integer faucibus, dui ut tempor dapibus, turpis felis interdum ex, et consequat est dui a mi. Nam quis fringilla dui.
							Maecenas in iaculis dolor, id consectetur enim. Integer eleifend blandit dolor. Pellentesque commodo gravida sem, eu
							consequat augue ultricies sed. Aenean quis lacinia leo. Quisque eu auctor enim, eu sollicitudin dolor. Proin a nisl in
							tellus consectetur tempor eget sit amet ante.
							<br />
							<br />
							Nunc varius lectus enim, eu volutpat lectus blandit vitae. Integer non risus ut odio hendrerit pretium. Donec viverra
							scelerisque velit at volutpat. Phasellus semper sapien id metus pretium tincidunt. Class aptent taciti sociosqu ad
							litora torquent per conubia nostra, per inceptos himenaeos. Pellentesque habitant morbi tristique senectus et netus et
							malesuada fames ac turpis egestas. Ut eu velit lectus.
							<br />
							<br />
							Nunc cursus, magna ac consectetur tincidunt, ex nisi tristique felis, eget blandit sem lorem nec orci. Etiam maximus
							venenatis turpis, vel consectetur leo consequat ac. Aenean varius lorem erat, et pharetra arcu lobortis ac. Etiam eu
							neque sed lectus tincidunt fringilla at sit amet ipsum. Nam aliquam id tortor ac tincidunt. Curabitur luctus ligula sit
							amet enim vestibulum laoreet. Sed mollis dapibus iaculis. Nullam condimentum, eros sed ultricies fermentum, quam mauris
							consectetur risus, ac vehicula nisl dolor sit amet dolor. Suspendisse id felis at est elementum ullamcorper. Proin in
							arcu eros. Nam et varius sapien, sit amet condimentum tellus. Mauris tempus est sit amet mollis malesuada. Quisque
							tincidunt gravida volutpat. In finibus molestie sem. Maecenas ac ultricies sapien.
						</div>
					</div>
					<div className='technical-report-section-1'>
						<div className='technical-report-heading-1'>Background</div>
						<div className='technical-report-text'>
							<br />
							Integer faucibus, dui ut tempor dapibus, turpis felis interdum ex, et consequat est dui a mi. Nam quis fringilla dui.
							Maecenas in iaculis dolor, id consectetur enim. Integer eleifend blandit dolor. Pellentesque commodo gravida sem, eu
							consequat augue ultricies sed. Aenean quis lacinia leo. Quisque eu auctor enim, eu sollicitudin dolor. Proin a nisl in
							tellus consectetur tempor eget sit amet ante.
							<br />
							<br />
							Nunc varius lectus enim, eu volutpat lectus blandit vitae. Integer non risus ut odio hendrerit pretium. Donec viverra
							scelerisque velit at volutpat. Phasellus semper sapien id metus pretium tincidunt. Class aptent taciti sociosqu ad
							litora torquent per conubia nostra, per inceptos himenaeos. Pellentesque habitant morbi tristique senectus et netus et
							malesuada fames ac turpis egestas. Ut eu velit lectus.
							<br />
							<br />
							Nunc cursus, magna ac consectetur tincidunt, ex nisi tristique felis, eget blandit sem lorem nec orci. Etiam maximus
							venenatis turpis, vel consectetur leo consequat ac. Aenean varius lorem erat, et pharetra arcu lobortis ac. Etiam eu
							neque sed lectus tincidunt fringilla at sit amet ipsum. Nam aliquam id tortor ac tincidunt. Curabitur luctus ligula sit
							amet enim vestibulum laoreet. Sed mollis dapibus iaculis. Nullam condimentum, eros sed ultricies fermentum, quam mauris
							consectetur risus, ac vehicula nisl dolor sit amet dolor. Suspendisse id felis at est elementum ullamcorper. Proin in
							arcu eros. Nam et varius sapien, sit amet condimentum tellus. Mauris tempus est sit amet mollis malesuada. Quisque
							tincidunt gravida volutpat. In finibus molestie sem. Maecenas ac ultricies sapien.
						</div>
					</div>
					<div className='technical-report-section-1'>
						<div className='technical-report-heading-1'>Methodology</div>
						<div className='technical-report-text'>
							<br />
							Integer faucibus, dui ut tempor dapibus, turpis felis interdum ex, et consequat est dui a mi. Nam quis fringilla dui.
							Maecenas in iaculis dolor, id consectetur enim. Integer eleifend blandit dolor. Pellentesque commodo gravida sem, eu
							consequat augue ultricies sed. Aenean quis lacinia leo. Quisque eu auctor enim, eu sollicitudin dolor. Proin a nisl in
							tellus consectetur tempor eget sit amet ante.
							<br />
							<br />
							Nunc varius lectus enim, eu volutpat lectus blandit vitae. Integer non risus ut odio hendrerit pretium. Donec viverra
							scelerisque velit at volutpat. Phasellus semper sapien id metus pretium tincidunt. Class aptent taciti sociosqu ad
							litora torquent per conubia nostra, per inceptos himenaeos. Pellentesque habitant morbi tristique senectus et netus et
							malesuada fames ac turpis egestas. Ut eu velit lectus.
							<br />
							<br />
							Nunc cursus, magna ac consectetur tincidunt, ex nisi tristique felis, eget blandit sem lorem nec orci. Etiam maximus
							venenatis turpis, vel consectetur leo consequat ac. Aenean varius lorem erat, et pharetra arcu lobortis ac. Etiam eu
							neque sed lectus tincidunt fringilla at sit amet ipsum. Nam aliquam id tortor ac tincidunt. Curabitur luctus ligula sit
							amet enim vestibulum laoreet. Sed mollis dapibus iaculis. Nullam condimentum, eros sed ultricies fermentum, quam mauris
							consectetur risus, ac vehicula nisl dolor sit amet dolor. Suspendisse id felis at est elementum ullamcorper. Proin in
							arcu eros. Nam et varius sapien, sit amet condimentum tellus. Mauris tempus est sit amet mollis malesuada. Quisque
							tincidunt gravida volutpat. In finibus molestie sem. Maecenas ac ultricies sapien.
						</div>
					</div>
					<div className='technical-report-section-1'>
						<div className='technical-report-heading-1'>Experiments</div>
						<div className='technical-report-text'>
							<br />
							Integer faucibus, dui ut tempor dapibus, turpis felis interdum ex, et consequat est dui a mi. Nam quis fringilla dui.
							Maecenas in iaculis dolor, id consectetur enim. Integer eleifend blandit dolor. Pellentesque commodo gravida sem, eu
							consequat augue ultricies sed. Aenean quis lacinia leo. Quisque eu auctor enim, eu sollicitudin dolor. Proin a nisl in
							tellus consectetur tempor eget sit amet ante.
							<br />
							<br />
							Nunc varius lectus enim, eu volutpat lectus blandit vitae. Integer non risus ut odio hendrerit pretium. Donec viverra
							scelerisque velit at volutpat. Phasellus semper sapien id metus pretium tincidunt. Class aptent taciti sociosqu ad
							litora torquent per conubia nostra, per inceptos himenaeos. Pellentesque habitant morbi tristique senectus et netus et
							malesuada fames ac turpis egestas. Ut eu velit lectus.
							<br />
							<br />
							Nunc cursus, magna ac consectetur tincidunt, ex nisi tristique felis, eget blandit sem lorem nec orci. Etiam maximus
							venenatis turpis, vel consectetur leo consequat ac. Aenean varius lorem erat, et pharetra arcu lobortis ac. Etiam eu
							neque sed lectus tincidunt fringilla at sit amet ipsum. Nam aliquam id tortor ac tincidunt. Curabitur luctus ligula sit
							amet enim vestibulum laoreet. Sed mollis dapibus iaculis. Nullam condimentum, eros sed ultricies fermentum, quam mauris
							consectetur risus, ac vehicula nisl dolor sit amet dolor. Suspendisse id felis at est elementum ullamcorper. Proin in
							arcu eros. Nam et varius sapien, sit amet condimentum tellus. Mauris tempus est sit amet mollis malesuada. Quisque
							tincidunt gravida volutpat. In finibus molestie sem. Maecenas ac ultricies sapien.
						</div>
					</div>
					<div className='technical-report-section-1'>
						<div className='technical-report-heading-1'>Evaluation</div>
						<div className='technical-report-text'>
							<br />
							Integer faucibus, dui ut tempor dapibus, turpis felis interdum ex, et consequat est dui a mi. Nam quis fringilla dui.
							Maecenas in iaculis dolor, id consectetur enim. Integer eleifend blandit dolor. Pellentesque commodo gravida sem, eu
							consequat augue ultricies sed. Aenean quis lacinia leo. Quisque eu auctor enim, eu sollicitudin dolor. Proin a nisl in
							tellus consectetur tempor eget sit amet ante.
							<br />
							<br />
							Nunc varius lectus enim, eu volutpat lectus blandit vitae. Integer non risus ut odio hendrerit pretium. Donec viverra
							scelerisque velit at volutpat. Phasellus semper sapien id metus pretium tincidunt. Class aptent taciti sociosqu ad
							litora torquent per conubia nostra, per inceptos himenaeos. Pellentesque habitant morbi tristique senectus et netus et
							malesuada fames ac turpis egestas. Ut eu velit lectus.
							<br />
							<br />
							Nunc cursus, magna ac consectetur tincidunt, ex nisi tristique felis, eget blandit sem lorem nec orci. Etiam maximus
							venenatis turpis, vel consectetur leo consequat ac. Aenean varius lorem erat, et pharetra arcu lobortis ac. Etiam eu
							neque sed lectus tincidunt fringilla at sit amet ipsum. Nam aliquam id tortor ac tincidunt. Curabitur luctus ligula sit
							amet enim vestibulum laoreet. Sed mollis dapibus iaculis. Nullam condimentum, eros sed ultricies fermentum, quam mauris
							consectetur risus, ac vehicula nisl dolor sit amet dolor. Suspendisse id felis at est elementum ullamcorper. Proin in
							arcu eros. Nam et varius sapien, sit amet condimentum tellus. Mauris tempus est sit amet mollis malesuada. Quisque
							tincidunt gravida volutpat. In finibus molestie sem. Maecenas ac ultricies sapien.
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
