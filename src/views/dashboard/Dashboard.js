import React, { lazy } from "react";
import {
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CHeader,
  CRow,
} from "@coreui/react";

const WidgetsDashboard = lazy(() => import("./../widgets/WidgetsDashboard"));

const Dashboard = () => {
  return (
    <>
      <CCard>
        <CCardBody>
          <CRow className="d-flex justify-content-center">
            <h2>IKEA Inventory Management System</h2>
          </CRow>
        </CCardBody>
      </CCard>

      <WidgetsDashboard />
    </>
  );
};

export default Dashboard;
