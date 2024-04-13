import { useCallback, useEffect, useState } from 'react';

interface UseHeightResizeProps {
  minHeight: number;
  defaultHeight?: number;
}

const useHeightResize = ({ minHeight, defaultHeight = 400 }: UseHeightResizeProps) => {
  const [isResizing, setIsResizing] = useState(false);
  const [height, setHeight] = useState(defaultHeight);

  const enableResize = useCallback(() => {
    setIsResizing(true);
  }, [setIsResizing]);

  const disableResize = useCallback(() => {
    setIsResizing(false);
  }, [setIsResizing]);

  const resize = useCallback(
    (e: MouseEvent) => {
      if (isResizing) {
        e.preventDefault();
        const newHeight = window.innerHeight - e.clientY;
        if (newHeight >= minHeight) {
          setHeight(newHeight);
        }
      }
    },
    [minHeight, isResizing, setHeight],
  );

  useEffect(() => {
    document.addEventListener('mousemove', resize);
    document.addEventListener('mouseup', disableResize);

    return () => {
      document.removeEventListener('mousemove', resize);
      document.removeEventListener('mouseup', disableResize);
    };
  }, [disableResize, resize]);

  return { height, enableResize };
};

export default useHeightResize;
