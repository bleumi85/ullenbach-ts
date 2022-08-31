import { ChakraProvider, extendTheme, theme as baseTheme } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const theme = extendTheme({
    colors: {
        primary: baseTheme.colors.blue,
        secondary: baseTheme.colors.purple
    },
    styles: {
        global: {
            body: {
                bg: '#f4f5fd'
            }
        }
    }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <App />
        </ChakraProvider>
    </React.StrictMode>
)