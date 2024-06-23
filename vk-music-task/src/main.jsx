import ReactDOM from 'react-dom/client';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import App from './App.jsx';
import {
  AdaptivityProvider,
  ConfigProvider,
} from '@vkontakte/vkui';

ReactDOM.createRoot(document.getElementById('root')).render(
    <ConfigProvider appearance='light'>
      <AdaptivityProvider>
        <App />
      </AdaptivityProvider>
    </ConfigProvider>,
)