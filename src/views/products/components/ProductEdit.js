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

import { getArticles } from "./../../articles/models/Articles";
import { getProduct, updateProduct } from "./../models/Products";
import Loader from "./../../ikea/utilities/Loader";
import Notification from "./../../ikea/alerts/Notification";

// import edit form
const EditForm = lazy(() => import("./../forms/EditForm.js"));

const ProductEdit = ({ match, access }) => {
  // get history object
  const history = useHistory();

  // set state variables
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});
  const [articles, setArticles] = useState([]);

  // get product details and articles
  useEffect(() => {
    Promise.all([getProduct(match.params.id), getArticles()])
      .then((results) => {
        setLoading(false);
        setProduct(results[0] && results[0].data);
        setArticles(results[1] && results[1].data);
      })
      .catch((error) => {
        setError(true);
        setLoading(false);
      });
  }, []);

  // shows loading spinner
  if (loading) return <Loader />;

  // prepare form headers
  const productEditHeader = `Edit Product: ${product.name}`;

  return (
    <CRow>
      <CCol lg={12}>
        {error && !product.name && (
          <Notification
            header="Error Notification"
            body="Sorry, something went wrong during updating product!"
          />
        )}
        {!error && product.name && (
          <EditForm
            updateProduct={updateProduct}
            header={productEditHeader}
            articles={articles}
            product={product}
            history={history}
          />
        )}
      </CCol>
    </CRow>
  );
};

ProductEdit.propTypes = {
  match: PropTypes.shape().isRequired,
  access: PropTypes.array.isRequired,
};

export default ProductEdit;
