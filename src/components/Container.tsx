import React, {useEffect, useState} from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Container: React.FC<LayoutProps> = ({children}) => {
  const [containerHeight, setContainerHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    const updateContainerHeight = () => {
      setContainerHeight(window.innerHeight - 56);
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

  return (
    <main
      className="relative w-full h-full flex flex-col max-w-full overflow-hidden overflow-y-auto mx-auto z-10"
      style={{
        height: containerHeight ? `${containerHeight}px` : '100%',
      }}
    >
      {children}
    </main>
  );
};

export default Container;
