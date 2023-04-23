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
    </>
  )
}

export default HeadComponent;