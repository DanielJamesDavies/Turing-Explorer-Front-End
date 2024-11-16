// Packages
import { Route, Routes } from "react-router-dom";

// Components
import { NavigationBar } from "./components/navigation-bar/NavigationBar";
import { HomePage } from "./pages/home/HomePage";
import { DownloadPage } from "./pages/download/DownloadPage";
import { TechnicalReportsPage } from "./pages/technical-reports/TechnicalReportsPage";
import { AuthorPage } from "./pages/author/AuthorPage";

// Logic

// Context

// Services

// Styles

// Assets

function App() {
	return (
		<div className='app'>
			<NavigationBar />
			<Routes>
				<Route path='' element={<HomePage />} />
				<Route path='/' element={<HomePage />} />
				<Route path='/download' element={<DownloadPage />} />
				<Route path='/technical-reports' element={<TechnicalReportsPage />} />
				<Route path='/author' element={<AuthorPage />} />
				<Route path='*' element={<HomePage />} />
			</Routes>
		</div>
	);
}

export default App;
