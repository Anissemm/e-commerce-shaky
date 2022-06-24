import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store } from './store'
import App from './App'
import './index.css'
import { persistor } from './store/store'

const rootElement = document.getElementById('root') as Element
const root = createRoot(rootElement)

root.render(
    <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </PersistGate>
    </ReduxProvider>
)