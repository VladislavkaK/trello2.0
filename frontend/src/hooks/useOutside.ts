import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

type TypeOut = {
  ref: any;
  isShow: boolean;
  setIsShow: Dispatch<SetStateAction<boolean>>;
};

export function useOutside(initialIsVisible: boolean): TypeOut {
  const [isShow, setIsShow] = useState(initialIsVisible);
  const ref = useRef<HTMLElement>(null);

  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return { ref, isShow, setIsShow };
}
