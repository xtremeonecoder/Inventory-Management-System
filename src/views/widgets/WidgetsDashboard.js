import React from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { CWidgetBrand, CRow, CCol } from "@coreui/react";
import CIcon from "@coreui/icons-react";

const WidgetsBrand = () => {
  const history = useHistory();

  // render
  return (
    <CRow>
      <CCol sm="6" lg="3">
        <CWidgetBrand
          color="facebook"
          style={{ cursor: "pointer" }}
          onClick={() => history.push("/articles")}
          bodySlot={<h3 className="text-center py-4">Product Articles</h3>}
        >
          <CIcon name="cil-list" height="56" className="my-4" />
        </CWidgetBrand>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetBrand
          color="flickr"
          style={{ cursor: "pointer" }}
          onClick={() => history.push("/products")}
          bodySlot={<h3 className="text-center py-4">IKEA Products</h3>}
        >
          <CIcon name="cilApplicationsSettings" height="56" className="my-4" />
        </CWidgetBrand>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetBrand
          color="twitter"
          style={{ cursor: "pointer" }}
          onClick={() => history.push("/sales")}
          bodySlot={<h3 className="text-center py-4">Sales Register</h3>}
        >
          <CIcon name="cil-spreadsheet" height="56" className="my-4" />
        </CWidgetBrand>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetBrand
          color="gradient-warning"
          style={{ cursor: "pointer" }}
          onClick={() => history.push("/settings")}
          bodySlot={<h3 className="text-center py-4">IKEA Settings</h3>}
        >
          <CIcon name="cil-settings" height="56" className="my-4" />
        </CWidgetBrand>
      </CCol>
    </CRow>
  );
};

WidgetsBrand.propTypes = {
  withCharts: PropTypes.bool,
};

export default WidgetsBrand;
