import {GA_TRACKING_ID} from "@/utils/analytics";

interface HeadComponentProps {
  pageTitle?: string;
}

const HeadComponent: React.FC<HeadComponentProps> = ({pageTitle}) => {
  return (
    <>
      <link rel="icon" href="/logo.svg"/>
      <meta name="description" content="Demo"/>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/>
      <title>{pageTitle || "Demo App"}</title>
      {GA_TRACKING_ID && (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${GA_TRACKING_ID}');
                  `,
            }}
          />
        </>
      )}
    </>
  )
}

export default HeadComponent;