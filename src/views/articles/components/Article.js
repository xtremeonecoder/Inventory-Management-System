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

import { getArticle, deleteArticle } from "./../models/Articles";
import Modal from "./../../ikea/utilities/Modals";
import Loader from "./../../ikea/utilities/Loader";
import Notification from "./../../ikea/alerts/Notification";
import { handleDelete } from "./../../ikea/utilities/CallbackHandlers";

const Article = ({ match, access }) => {
  // get state for danger alert (for modal)
  const [danger, setDanger] = useState(false);

  // get article details from server
  const history = useHistory();

  // get article details
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState({});

  useEffect(() => {
    getArticle(match.params.id)
      .then(({ data }) => {
        setLoading(false);
        setArticle(data);
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
            body="Sorry, something went wrong during fetching the article!"
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
                    targetItem: article,
                    deleteCallback: deleteArticle,
                    history: history,
                  })
                }
                header="Deleting This Article?"
                body="You are going to delete this article from the system! Are you sure to
              perform this delete operation? Please note that this delete operation
              cannot be undone later!"
              />
              <strong>{`Article ID: ${article.id}`}</strong>
              <CLink
                title="Delete This Article"
                className="ml-2 text-dark float-right"
                onClick={() => setDanger(!danger)}
                href=""
              >
                <CIcon size={"lg"} name={"cilTrash"} />
              </CLink>
              <CLink
                title="Edit This Article"
                className="text-dark mr-2 float-right"
                onClick={() => history.push(`/articles/${article.id}/edit`)}
                href=""
              >
                <CIcon size={"lg"} name={"cilPencil"} />
              </CLink>
            </CCardHeader>
            <CCardBody>
              <table className="table table-striped table-hover font-weight-bold">
                <tbody>
                  <tr>
                    <td>Article Name:</td>
                    <td>{article.name}</td>
                  </tr>
                  <tr>
                    <td>Amount in Stock:</td>
                    <td>{article.amountInStock} pieces(s)</td>
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

Article.propTypes = {
  match: PropTypes.shape().isRequired,
  access: PropTypes.array.isRequired,
};

export default Article;
