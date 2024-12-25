import { UserContextProvider } from '@/context/userContext';
import { ChakraProvider } from '@chakra-ui/react';

function MyApp({ Component, pageProps }) {
    return (
        <ChakraProvider>
            <UserContextProvider>
                <Component {...pageProps} />
            </UserContextProvider>
        </ChakraProvider>
    );
}

export default MyApp;
