interface HeadComponentProps {
  pageTitle?: string;
}

const HeadComponent: React.FC<HeadComponentProps> = ({pageTitle}) => {
  return (
    <>
      <link rel="icon" href="/logo.svg"/>
      <meta name="description" content="Demo"/>
      <title>{pageTitle || "Demo App"}</title>
    </>
  )
}

export default HeadComponent;