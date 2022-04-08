import { Provider } from 'react-redux';
import { AppLayout } from './layouts/AppLayout';
import { store } from './store/store';

function App() {
  return (
    <Provider store={store}>
      <h1>HOLA MUNDO</h1>
      <AppLayout />
    </Provider>
  );
}

export default App;
