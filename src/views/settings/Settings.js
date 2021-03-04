import React from "react";
import { PropTypes } from "prop-types";
import { CRow, CCol } from "@coreui/react";

import Notification from "./../ikea/alerts/Notification";

const Settings = () => {
  return (
    <CRow>
      <CCol lg={12}>
        <Notification
          header="Error Notification"
          body="Sorry, this feature is not supported by the system yet!"
        />
      </CCol>
    </CRow>
  );
};

Settings.propTypes = {
  match: PropTypes.shape().isRequired,
  access: PropTypes.array.isRequired,
};

export default Settings;
