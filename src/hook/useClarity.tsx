import React, { useEffect } from "react";
import Clarity from "@microsoft/clarity";
function useClarity() {
  useEffect(() => {
    Clarity.init("qurwvrxcgo");
  }, []);
}

export default useClarity;
