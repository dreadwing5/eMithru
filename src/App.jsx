import { useContext } from "react";
import ThemeProvider from "./theme";

import MotionLazyContainer from "./components/animate/MotionLazyContainer";
import NotistackProvider from "./components/NotistackProvider";
import { AuthContext } from "./context/AuthContext";

import { RouteComponent } from "./Routes";

function App() {
	return (
		<ThemeProvider>
			<NotistackProvider>
				<MotionLazyContainer>
					<div className="app">
						<main className="content">
							<RouteComponent />
						</main>
					</div>
				</MotionLazyContainer>
			</NotistackProvider>
		</ThemeProvider>
	);
}

export default App;
