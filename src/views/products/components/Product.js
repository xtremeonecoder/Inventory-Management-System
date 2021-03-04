/**
 * IKEA Inventory Management System
 *
 * @category   Application_Frontend
 * @package    warehouse-frontend
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 */

import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { PropTypes } from "prop-types";

import { CCol, CRow } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { CLink, CCard, CCardBody, CCardHeader } from "@coreui/react";

import { getProduct, deleteProduct } from "./../models/Products";
import { getArticles } from "./../../articles/models/Articles";
import Modal from "./../../ikea/utilities/Modals";
import Loader from "./../../ikea/utilities/Loader";
import Notification from "./../../ikea/alerts/Notification";
import { handleDelete } from "./../../ikea/utilities/CallbackHandlers";

const Product = ({ match, access }) => {
  // get state for danger alert (for modal)
  const [danger, setDanger] = useState(false);

  // get product details from server
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

  // return article details
  return (
    <CRow>
      <CCol lg={12}>
        {error && (
          <Notification
            header="Error Notification"
            body="Sorry, something went wrong during fetching the product!"
          />
        )}
        {!error && (
          <CCard>
            <CCardHeader>
              <Modal
                danger={danger}
                setDanger={setDanger}
                onConfirm={() =>
                  handleDelete({
                    targetItem: product,
                    deleteCallback: deleteProduct,
                    history: history,
                  })
                }
                header="Deleting This Product?"
                body="Are you sure to delete this product?"
              />
              <strong>{`Product ID: ${product.id}`}</strong>
              <CLink
                title="Delete This Product"
                className="ml-2 text-dark float-right"
                onClick={() => setDanger(!danger)}
                href=""
              >
                <CIcon size={"lg"} name={"cilTrash"} />
              </CLink>
              <CLink
                title="Edit This Product"
                className="text-dark mr-2 float-right"
                onClick={() => history.push(`/products/${product.id}/edit`)}
                href=""
              >
                <CIcon size={"lg"} name={"cilPencil"} />
              </CLink>
            </CCardHeader>
            <CCardBody>
              <table className="table table-striped table-hover font-weight-bold">
                <tbody>
                  <tr>
                    <td>Product Name:</td>
                    <td>{product.name}</td>
                  </tr>
                  <tr>
                    <td>Product Articles:</td>
                    <td>
                      <ul>
                        {product &&
                          product.articles &&
                          product.articles.map((article) => {
                            const productArticle = articles.find(
                              (item) => item.id === article.id
                            );

                            return (
                              <li key={article.id}>
                                <CLink to={`/articles/${article.id}/details`}>
                                  {productArticle && productArticle.name}{" "}
                                  {article.amountRequired} piece(s)
                                </CLink>
                              </li>
                            );
                          })}
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </CCardBody>
          </CCard>
        )}
      </CCol>
    </CRow>
  );
};

Product.propTypes = {
  match: PropTypes.shape().isRequired,
  access: PropTypes.array.isRequired,
};

export default Product;
