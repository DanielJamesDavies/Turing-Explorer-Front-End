// Packages
import { Route, Routes } from "react-router-dom";

// Components
import { HomePage } from "./pages/home/HomePage";

// Logic

// Context

// Services

// Styles
import "./App.css";

// Assets

function App() {
	return (
		<div className='app'>
			<Routes>
				<Route path='' element={<HomePage />} />
				<Route path='/' element={<HomePage />} />
			</Routes>
		</div>
	);
}

export default App;
