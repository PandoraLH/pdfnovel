import { useState, useCallback, useEffect, React } from "react";
import MainNav from "./MainNav";
import MediaNav from "./MediaNav";

const useMediaQuery = (width) => {
   const [targetReached, setTargetReached] = useState(false);

   const updateTarget = useCallback((e) => {
      if (e.matches) {
         setTargetReached(true);
      } else {
         setTargetReached(false);
      }
   }, []);

   useEffect(() => {
      const media = window.matchMedia(`(max-width: ${width}px)`);
      media.addListener(updateTarget);

      // Check on mount (callback is not called until a change occurs)
      if (media.matches) {
         setTargetReached(true);
      }

      return () => media.removeListener(updateTarget);
   }, []);

   return targetReached;
};

export default function Navbar() {
   const isBreakpoint = useMediaQuery(768);

   return <div>{isBreakpoint ? <div><MediaNav/></div> : <div><MainNav/></div>}</div>;
}
