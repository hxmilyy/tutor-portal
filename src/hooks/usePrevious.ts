import { useRef, useState } from "react";

export function usePrev<T>(value: T): [T, React.Dispatch<React.SetStateAction<T>>, React.RefObject<T>] {
  const ref = useRef<T>(value)
  const [v, setV] = useState<T>(value)
  return [v, setV, ref];
}