import React, {useEffect, useState} from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Container: React.FC<LayoutProps> = ({children}) => {
  const [containerHeight, setContainerHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    const updateContainerHeight = () => {
      setContainerHeight(window.innerHeight - 60);
    };

    const handleFocus = () => {
      window.scrollTo(0, 0);
      updateContainerHeight();
    };

    const handleBlur = () => {
      window.scrollTo(0, 0);
      updateContainerHeight();
    };

    updateContainerHeight();
    window.addEventListener('resize', updateContainerHeight);
    // document.addEventListener('focusout', updateContainerHeight);
    window.addEventListener('focus', handleFocus, true);
    window.addEventListener('blur', handleBlur, true);

    return () => {
      window.removeEventListener('resize', updateContainerHeight);
      // document.removeEventListener('focusout', updateContainerHeight);
      window.removeEventListener('focus', handleFocus, true);
      window.removeEventListener('blur', handleBlur, true);
    };
  }, []);

  // useEffect(() => {
  //   const handleFocus = () => {
  //     window.scrollTo(0, 0);
  //   };
  //
  //   const handleBlur = () => {
  //     window.scrollTo(0, 0);
  //   };
  //
  //   window.addEventListener('focus', handleFocus, true);
  //   window.addEventListener('blur', handleBlur, true);
  //
  //   return () => {
  //     window.removeEventListener('focus', handleFocus, true);
  //     window.removeEventListener('blur', handleBlur, true);
  //   };
  // }, []);

  return (
    <main
      className="relative w-full flex flex-col max-w-full overflow-hidden overflow-y-auto mx-auto h-[calc(100vh-57px)]"
      style={{
        height: containerHeight ? `${containerHeight}px` : '100%',
      }}
    >
      {children}
    </main>
  );
};

export default Container;
