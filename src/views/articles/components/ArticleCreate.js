/**
 * IKEA Inventory Management System
 *
 * @category   Application_Frontend
 * @package    warehouse-frontend
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 */

import React, { lazy } from "react";
import { useHistory } from "react-router-dom";
import { PropTypes } from "prop-types";
import { CRow, CCol } from "@coreui/react";

// import custom components
import { createArticle } from "./../models/Articles";
const CreateForm = lazy(() => import("./../forms/CreateForm.js"));

const ArticleCreate = ({ access }) => {
  // prepare widget headers
  const history = useHistory();
  const articleCreateHeader = "Create New Article";

  return (
    <CRow>
      <CCol lg={12}>
        <CreateForm
          createArticle={createArticle}
          header={articleCreateHeader}
          history={history}
        />
      </CCol>
    </CRow>
  );
};

ArticleCreate.propTypes = {
  match: PropTypes.shape().isRequired,
  access: PropTypes.array.isRequired,
};

export default ArticleCreate;
