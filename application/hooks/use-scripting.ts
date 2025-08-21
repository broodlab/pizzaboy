import { useEffect, useState } from "react";

export const useScripting = () => {
  const [isScripting, setIsScripting] = useState(false);

  useEffect(() => {
    setIsScripting(true);
  }, []);

  return isScripting;
};
