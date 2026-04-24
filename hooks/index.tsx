import { useCallback, useEffect, useRef, useState } from "react";

export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth < breakpoint);
  }, [breakpoint]);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return isMobile;
}

export function useResizeDetection(debounceDelay = 100) {
  const [isResizing, setIsResizing] = useState(false);
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsResizing(true);
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
      timeoutIdRef.current = setTimeout(() => {
        setIsResizing(false);
      }, debounceDelay);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutIdRef.current!);
    };
  }, [debounceDelay]);

  return { isResizing };
}

export function useRandomVisibility(ready: boolean, visibleDuration = 3000) {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!ready) return;

    setVisible(true);

    const scheduleNext = () => {
      const delay = Math.random() * 5000 + 10000;
      timeoutRef.current = setTimeout(() => {
        setVisible(true);
        timeoutRef.current = setTimeout(() => {
          setVisible(false);
          scheduleNext();
        }, visibleDuration);
      }, delay);
    };

    const hideFirst = setTimeout(() => {
      setVisible(false);
      scheduleNext();
    }, visibleDuration);

    return () => {
      clearTimeout(hideFirst);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [ready, visibleDuration]);

  return visible;
}
