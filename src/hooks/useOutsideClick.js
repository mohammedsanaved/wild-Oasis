import { useEffect, useRef } from "react";

export function useOutsideClick(close, listenCapturing = true) {
    
        const ref = useRef();
  useEffect(()=> {
    function handleClick(e) {
      if(ref.current && !ref.current.contains(e.target)) close();
    }
    document.addEventListener("click", handleClick, listenCapturing);
    return ()=> document.removeEventListener('click', handleClick, listenCapturing)
  }, [close, listenCapturing]);
  console.log("close is ==>",close)

  console.log(ref)
  return ref;
}