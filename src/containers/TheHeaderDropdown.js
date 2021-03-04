import React from "react";
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

const TheHeaderDropdown = () => {
  return (
    <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={"avatars/default.jpg"}
            className="c-avatar-img"
            alt="admin@ikea.io"
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem header tag="div" color="light" className="text-center">
          <strong>Account</strong>
        </CDropdownItem>
        <CDropdownItem to="/dashboard">
          <CIcon name="cil-user" className="mfe-2" />
          Dashboard
        </CDropdownItem>
        <CDropdownItem header tag="div" color="light" className="text-center">
          <strong>Settings</strong>
        </CDropdownItem>
        <CDropdownItem to="/settings">
          <CIcon name="cil-settings" className="mfe-2" />
          Account Settings
        </CDropdownItem>
        <CDropdownItem divider />
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdown;
