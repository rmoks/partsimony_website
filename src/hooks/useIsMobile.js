import { useState, useEffect, useCallback } from 'react';

/*
useIsMobile() returns a boolean indicating whether it is mobile or not.
*/
const useIsMobile = (mobileLimit = 1025) => {
  const [targetReached, setTargetReached] = useState(false);

  const updateTarget = useCallback((e) => {
    if (e.matches) {
      setTargetReached(true);
    } else {
      setTargetReached(false);
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${mobileLimit}px)`);
    media.addListener(updateTarget);

    // Check on mount (callback is not called until a change occurs)
    if (media.matches) {
      setTargetReached(true);
    }

    return () => media.removeListener(updateTarget);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return targetReached;
};

export default useIsMobile;
