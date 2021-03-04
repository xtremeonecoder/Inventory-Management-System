/**
 * IKEA Inventory Management System
 *
 * @category   Application_Frontend
 * @package    warehouse-frontend
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 */

import React, { useState, useEffect, lazy } from "react";
import { useHistory } from "react-router-dom";
import { PropTypes } from "prop-types";
import { CRow, CCol } from "@coreui/react";

// import custom components
import { createProduct } from "./../models/Products";
import { getArticles } from "./../../articles/models/Articles";
import Loader from "./../../ikea/utilities/Loader";
import Notification from "./../../ikea/alerts/Notification";

// import create form
const CreateForm = lazy(() => import("./../forms/CreateForm.js"));

const ProductCreate = ({ access }) => {
  // prepare widget headers
  const history = useHistory();

  // set state variables
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);

  // get all the articles
  useEffect(() => {
    getArticles()
      .then(({ data }) => {
        setLoading(false);
        setArticles(data);
      })
      .catch((error) => {
        setError(true);
        setLoading(false);
      });
  }, []);

  // shows loading spinner
  if (loading) return <Loader />;

  // prepare form headers
  const productCreateHeader = "Create New Product";

  return (
    <CRow>
      <CCol lg={12}>
        {error && !articles.length && (
          <Notification
            header="Error Notification"
            body="Sorry, something went wrong during creating product!"
          />
        )}
        {!error && articles.length && (
          <CreateForm
            createProduct={createProduct}
            header={productCreateHeader}
            articles={articles}
            history={history}
          />
        )}
      </CCol>
    </CRow>
  );
};

ProductCreate.propTypes = {
  match: PropTypes.shape().isRequired,
  access: PropTypes.array.isRequired,
};

export default ProductCreate;
