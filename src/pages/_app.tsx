import '@/styles/globals.css'
import "font-awesome/css/font-awesome.min.css";
import type {AppProps} from 'next/app'
import {ApolloProvider} from '@apollo/client';
import {GraphqlClient} from '@/graphql/client';

export default function App({Component, pageProps}: AppProps) {
  return (
    <ApolloProvider client={GraphqlClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
