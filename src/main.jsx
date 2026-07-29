import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import { store, persistor } from './Store/store.js'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { PrimeReactProvider } from 'primereact/api';
import "primereact/resources/themes/lara-light-cyan/theme.css";

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ErrorBoundary>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <PrimeReactProvider value={{ autoZIndex: true, zIndex: { overlay: 1000 } }}>
            <App />
          </PrimeReactProvider>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  </BrowserRouter>
)
