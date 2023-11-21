import { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import router from './Router';
import Loading from './components/Loading';

const GlobalStyle = createGlobalStyle`
	${reset}

	* {
    box-sizing: border-box;
  }

  body {
    background-color: black;
    color:white;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

function App() {
	const [isLoading, setIsLoading] = useState(true);
	const init = async () => {
		// TODO: add firebase auth
		setTimeout(() => {
			setIsLoading(false);
		}, 1000);
	};

	useEffect(() => {
		init();
	}, []);

	return (
		<>
			<GlobalStyle />
			{isLoading ? <Loading /> : <RouterProvider router={router} />}
		</>
	);
}

export default App;
