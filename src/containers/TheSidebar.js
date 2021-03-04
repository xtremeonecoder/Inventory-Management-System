import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from "@coreui/react";

// sidebar nav config
import navigation from "./_nav";
import auth from "./../services/auth-service";
import IkeaLogoSidebar from "./../views/ikea/logo/logo-sidebar";

const TheSidebar = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.sidebarShow);

  // customize navigation as per user access
  const customNavigation = navigation.filter((item) => {
    if (item && item.access && auth.isAllowed(item.access)) {
      delete item.access;
      return item;
    }

    return false;
  });

  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({ type: "set", sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        <IkeaLogoSidebar logoClass="ikea-logo-sidebar" />
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={customNavigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  );
};

export default React.memo(TheSidebar);
