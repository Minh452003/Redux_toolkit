import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css';
import { Provider } from 'react-redux'
import store from './store/index.ts';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <ProductProvider>
  //   <CountProvider>
  //     <App />
  //   </CountProvider>
  // </ProductProvider>
  <Provider store={store}>
    <App />
  </Provider>


)
