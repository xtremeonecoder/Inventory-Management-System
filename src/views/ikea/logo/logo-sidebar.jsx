import React from "react";
import { CImg } from "@coreui/react";

const LogoSidebar = ({ logoClass }) => {
  return (
    <div className={logoClass}>
      <CImg
        src={"images/admin/logo-sidebar.png"}
        className="c-avatar-img"
        alt="admin@ikea.com"
      />
    </div>
  );
};

export default LogoSidebar;
