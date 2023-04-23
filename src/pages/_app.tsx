import '@/styles/globals.css'
import "font-awesome/css/font-awesome.min.css";
import type {AppProps} from 'next/app'
import {ApolloProvider} from '@apollo/client';
import {GraphqlClient} from '@/graphql/client';
import Container from "@/components/Container";
import dynamic from 'next/dynamic';

const Navigation = dynamic(
  () => import('@/components/navigation/Navigation'),
  {ssr: false}
);

const App = ({Component, pageProps}: AppProps) => {
  return (
    <ApolloProvider client={GraphqlClient}>
      <Navigation/>
      <Container>
        <Component {...pageProps} />
      </Container>
    </ApolloProvider>
  )
}

export default App;