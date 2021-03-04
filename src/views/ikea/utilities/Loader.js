import React from "react";
import { CSpinner } from "@coreui/react";

const Loader = (props) => {
  const {
    color = "danger", // warning, primary, info, success
    size = "", // sm
    variant = "grow",
    style = { width: "4rem", height: "4rem" },
  } = props;
  return (
    <div className="d-flex justify-content-center">
      <CSpinner style={style} size={size} color={color} variant={variant} />
    </div>
  );
};

export default Loader;
