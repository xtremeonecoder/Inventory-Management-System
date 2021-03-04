import React from "react";
import { CImg } from "@coreui/react";

const LogoHeader = ({ logoClass }) => {
  return (
    <div className={logoClass}>
      <CImg
        src={"images/admin/logo-header.png"}
        className="c-avatar-img"
        alt="admin@ikea.com"
      />
    </div>
  );
};

export default LogoHeader;
