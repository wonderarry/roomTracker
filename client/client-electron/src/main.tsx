import ReactDOM from 'react-dom/client'
import MainPage from './pages/MainPage.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <MainPage />
)

// Remove Preload scripts loading
postMessage({ payload: 'removeLoading' }, '*')

// Use contextBridge
window.ipcRenderer.on('main-process-message', (_event, message) => {
  console.log(message)
})
