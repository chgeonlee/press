/***
 * useOutsideClick
 * @ref 밖의 요소가 클릭되면 callback이 호출된다.
 */

import { MutableRefObject, useEffect } from "react";

export const useOutsideClick = (
  ref: MutableRefObject<HTMLElement>,
  callback: () => void,
  except: any[] = []
) => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const isExcepted = except.some((exceptRef) => {
        let node = e.target as Node;
        while (node) {
          if (exceptRef.current === node) {
            return true;
          }
          node = node.parentNode;
        }
        return false;
      });

      if (
        ref.current &&
        !ref.current.contains(e.target as Node) &&
        !isExcepted
      ) {
        callback();
      }
    };
    window.addEventListener("mouseup", handleClick);

    return () => {
      window.removeEventListener("mouseup", handleClick);
    };
  }, [ref, callback]);
};
