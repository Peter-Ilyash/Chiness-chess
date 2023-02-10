import React from 'react';
import ReactDOM from 'react-dom/client';
import { StyledEngineProvider, CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { App } from './components/App';
import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<StyledEngineProvider injectFirst>
				<App />
				<CssBaseline />
			</StyledEngineProvider>
		</Provider>
	</React.StrictMode>
);
