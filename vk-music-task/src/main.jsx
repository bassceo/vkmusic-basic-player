import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  AdaptivityProvider,
  ConfigProvider,
} from '@vkontakte/vkui';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <ConfigProvider appearance='light'>
  <AdaptivityProvider>
    <App />
  </AdaptivityProvider>
</ConfigProvider>,
  // </React.StrictMode>,
)
