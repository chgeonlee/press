/***
 * useOutsideClick
 * @ref 밖의 요소가 클릭되면 callback이 호출된다.
 */

import { MutableRefObject, useEffect } from "react";

export const useOutsideClick = (
  ref: MutableRefObject<HTMLElement>,
  callback: () => void
) => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback();
      }
    };
    window.addEventListener("mouseup", handleClick);

    return () => {
      window.removeEventListener("mouseup", handleClick);
    };
  }, [ref, callback]);
};
