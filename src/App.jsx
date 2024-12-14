// Packages
import { Route, Routes } from "react-router-dom";

// Components
import { NavigationBar } from "./components/navigation-bar/NavigationBar";
import { HomePage } from "./pages/home/HomePage";
import { ExplorePage } from "./pages/explore/ExplorePage";
import { LatentPage } from "./pages/latent/LatentPage";
import { InferencePage } from "./pages/inference/InferencePage";
import { DownloadPage } from "./pages/download/DownloadPage";
import { ResearchPage } from "./pages/research/ResearchPage";
import { ResearchPaperPage } from "./pages/research-paper/ResearchPaperPage";
import { AuthorPage } from "./pages/author/AuthorPage";
import { NeuralNetBackground } from "./components/neural-net-background/NeuralNetBackground";
import { AppLogic } from "./AppLogic";

// Logic

// Context

// Services

// Styles

// Assets

function App() {
	const { pageName } = AppLogic();

	return (
		<div className={"app " + pageName}>
			<NeuralNetBackground />
			<NavigationBar />
			<Routes>
				<Route path='' element={<HomePage />} />
				<Route path='/' element={<HomePage />} />
				<Route path='/blank' element={null} />
				<Route path='/explore' element={<ExplorePage />} />
				<Route path='/latent' element={<LatentPage />} />
				<Route path='/inference' element={<InferencePage />} />
				<Route path='/download' element={<DownloadPage />} />
				<Route path='/research/:id' element={<ResearchPaperPage />} />
				<Route path='/research' element={<ResearchPage />} />
				<Route path='/author' element={<AuthorPage />} />
				<Route path='*' element={<HomePage />} />
			</Routes>
		</div>
	);
}

export default App;
