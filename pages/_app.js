import { Layout } from '../components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'bootstrap/dist/css/bootstrap.min.css';
import { StateContext } from '../context/stateContext';
import { Toaster } from 'react-hot-toast';
import '../styles/globals.css';
import { useState } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../store/store';

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <StateContext>
            <Layout>
              <Toaster />
              <Component {...pageProps} />
            </Layout>
          </StateContext>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
