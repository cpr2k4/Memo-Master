import React, { useState } from "react";
import TitleContext from "./TitleContext";

const TitleContextProvider = ({ children }) => {
  const [title, setTitle] = useState("");
  return (
    <TitleContext.Provider value={{ title, setTitle }}>
      {children}
    </TitleContext.Provider>
  );
};

export default TitleContextProvider;
