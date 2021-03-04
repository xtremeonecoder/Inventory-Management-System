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

import { getProduct } from "./../../products/models/Products";
import { getSale, deleteSale } from "./../models/Sales";
import {
  getArticles,
  updateBulkArticles,
} from "./../../articles/models/Articles";
import Modal from "./../../ikea/utilities/Modals";
import Loader from "./../../ikea/utilities/Loader";
import Notification from "./../../ikea/alerts/Notification";
import { handleDelete } from "./../../ikea/utilities/CallbackHandlers";

const Sale = ({ match, access }) => {
  // get state for danger alert (for modal)
  const [danger, setDanger] = useState(false);

  // get product details from server
  const history = useHistory();

  // set state variables
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sale, setSale] = useState({});
  const [product, setProduct] = useState({});
  const [articles, setArticles] = useState([]);

  // get sales details, product details and articles
  useEffect(() => {
    Promise.all([getSale(match.params.id), getArticles()])
      .then((results) => {
        setSale(results[0] && results[0].data);
        setArticles(results[1] && results[1].data);

        // fetch sale's product
        const productId =
          (results[0] && results[0].data && results[0].data.productId) || null;
        getProduct(productId)
          .then(({ data }) => {
            setLoading(false);
            setProduct(data);
          })
          .catch((error) => {
            setError(true);
            setLoading(false);
          });
      })
      .catch((error) => {
        setError(true);
        setLoading(false);
      });
  }, []);

  // shows loading spinner
  if (loading) return <Loader />;

  // return sales details
  return (
    <CRow>
      <CCol lg={12}>
        {error && (
          <Notification
            header="Error Notification"
            body="Sorry, something went wrong during fetching the sales!"
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
                    targetItem: sale,
                    deleteCallback: deleteSale,
                    history: history,
                    restoredProduct: product,
                    allArticles: articles,
                    resetCallback: updateBulkArticles,
                  })
                }
                header="Deleting This Sale?"
                body="Are you sure to delete this sale?"
              />
              <strong>{`Sale's ID: ${sale.id}`}</strong>
              <CLink
                title="Delete This Sale"
                className="ml-2 text-dark float-right"
                onClick={() => setDanger(!danger)}
                href=""
              >
                <CIcon size={"lg"} name={"cilTrash"} />
              </CLink>
              <CLink
                title="Edit This Sale"
                className="text-dark mr-2 float-right"
                onClick={() => history.push(`/sales/${sale.id}/edit`)}
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
                    <td>Product Sold:</td>
                    <td>{sale.amountSold} piece(s)</td>
                  </tr>
                  <tr>
                    <td>Sale Registered At:</td>
                    <td>{sale.createdAt}</td>
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

Sale.propTypes = {
  match: PropTypes.shape().isRequired,
  access: PropTypes.array.isRequired,
};

export default Sale;
