import React, { createContext, useState } from "react";

const FrontImageContext = createContext();

export default FrontImageContext;

export const FrontImageProvider = (props) => {
  const [frontImg, setFrontImg] = useState(() =>
    localStorage.getItem("frontImg") ? localStorage.getItem("frontImg") : null
  );

  return (
    <FrontImageContext.Provider value={[frontImg, setFrontImg]}>
      {props.children}
    </FrontImageContext.Provider>
  );
};
