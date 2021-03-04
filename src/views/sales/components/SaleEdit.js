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
import { getProduct } from "./../../products/models/Products";
import { getSale, updateSale } from "./../models/Sales";
import Loader from "./../../ikea/utilities/Loader";
import Notification from "./../../ikea/alerts/Notification";

// import edit form
const EditForm = lazy(() => import("./../forms/EditForm.js"));

const SaleEdit = ({ match, access }) => {
  // get history object
  const history = useHistory();

  // set state variables
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sale, setSale] = useState({});
  const [product, setProduct] = useState({});
  const [articles, setArticles] = useState([]);

  // get sales details and product details
  useEffect(() => {
    Promise.all([getSale(match.params.id), getArticles()])
      .then((results) => {
        setSale(results[0].data);
        setArticles(results[1].data);

        // get sale's product
        return getProduct(results[0].data.productId);
      })
      .then(({ data }) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(true);
        setLoading(false);
      });
  }, []);

  // shows loading spinner
  if (loading) return <Loader />;

  // prepare form headers
  const salesEditHeader = `Edit Sale's Record For: ${product.name}`;

  return (
    <CRow>
      <CCol lg={12}>
        {error && !sale.id && (
          <Notification
            header="Error Notification"
            body="Sorry, something went wrong during updating sales!"
          />
        )}
        {!error && sale.id && (
          <EditForm
            updateSale={updateSale}
            header={salesEditHeader}
            product={product}
            sale={sale}
            articles={articles}
            history={history}
          />
        )}
      </CCol>
    </CRow>
  );
};

SaleEdit.propTypes = {
  match: PropTypes.shape().isRequired,
  access: PropTypes.array.isRequired,
};

export default SaleEdit;
