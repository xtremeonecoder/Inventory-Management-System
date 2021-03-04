import React from "react";
import { CCol, CContainer, CRow } from "@coreui/react";

const Page403 = () => {
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="6">
            <span className="clearfix">
              <h1 className="float-left text-danger display-3 mr-4">
                <strong>403</strong>
              </h1>
              <h4 className="pt-3">Sorry, unauthorized access!</h4>
              <p className="text-muted float-left">
                You are not authorized to access this page.
              </p>
            </span>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Page403;
