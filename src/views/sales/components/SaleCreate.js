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
import { getProducts } from "./../../products/models/Products";
import { registerSale } from "./../models/Sales";
import Loader from "./../../ikea/utilities/Loader";
import Notification from "./../../ikea/alerts/Notification";

// import create form
const CreateForm = lazy(() => import("./../forms/CreateForm.js"));

const SaleCreate = ({ access }) => {
  // prepare widget headers
  const history = useHistory();

  // set state variables
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  // get all the products
  useEffect(() => {
    getProducts()
      .then(({ data }) => {
        setLoading(false);
        setProducts(data);
      })
      .catch((error) => {
        setError(true);
        setLoading(false);
      });
  }, []);

  // shows loading spinner
  if (loading) return <Loader />;

  // prepare form headers
  const saleCreateHeader = "Register Sale's Record";

  return (
    <CRow>
      <CCol lg={12}>
        {error && !products.length && (
          <Notification
            header="Error Notification"
            body="Sorry, something went wrong during registering sale's record!"
          />
        )}
        {!error && products.length && (
          <CreateForm
            registerSale={registerSale}
            header={saleCreateHeader}
            products={products}
            history={history}
          />
        )}
      </CCol>
    </CRow>
  );
};

SaleCreate.propTypes = {
  match: PropTypes.shape().isRequired,
  access: PropTypes.array.isRequired,
};

export default SaleCreate;
