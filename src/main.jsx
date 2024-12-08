import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import APIProvider from "./context/APIContext.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<BrowserRouter>
			<APIProvider>
				<App />
			</APIProvider>
		</BrowserRouter>
	</StrictMode>
);
