import React from 'react';
import ReactDOM from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
    <ClerkProvider
        publishableKey="pk_test_dml0YWwta3JpbGwtOTkuY2xlcmsuYWNjb3VudHMuZGV2JA"
    >
        <App />
    </ClerkProvider>
);