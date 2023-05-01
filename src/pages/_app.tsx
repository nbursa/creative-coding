import '@/styles/globals.css'
import "font-awesome/css/font-awesome.min.css";
import type {AppProps} from 'next/app'
import {ApolloProvider} from '@apollo/client';
import {GraphqlClient} from '@/graphql/client';
import Container from "@/components/Container";
import dynamic from 'next/dynamic';
import {useEffect} from "react";
import {pageview} from "@/utils/analytics";
import {useRouter} from "next/router";

const Navigation = dynamic(
  () => import('@/components/navigation/Navigation'),
  {ssr: false}
);

const App = ({Component, pageProps}: AppProps) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      pageview(url);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <ApolloProvider client={GraphqlClient}>
      <div className="grid grid-cols-1 grid-rows-[56px_calc(100vh-56px)]">
        <Navigation/>
        <Container>
          <Component {...pageProps} />
        </Container>
      </div>
    </ApolloProvider>
  )
}

export default App;