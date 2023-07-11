import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import { UserProvider } from './context/UserContext';
import { BlocosNamesProvider } from './context/BlocosNamesContext';
import { UserLocationProvider } from './context/UserLocationContext';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
    <UserLocationProvider>
    <BlocosNamesProvider>
    <UserProvider>
    <Auth0Provider
      domain="dev-c46hs07da4td18ag.us.auth0.com"
      clientId="pHLcgMhKx431h0AKLGm3CwVUfL96U2pO"
      authorizationParams={{
        redirect_uri: "http://localhost:3000/home"
      }}
    >
      <App />
    </Auth0Provider>
    </UserProvider>
    </BlocosNamesProvider>
    </UserLocationProvider>
    </React.StrictMode>,
  );

