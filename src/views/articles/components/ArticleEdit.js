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

import { getArticle, updateArticle } from "./../models/Articles";
import Loader from "./../../ikea/utilities/Loader";
import Notification from "./../../ikea/alerts/Notification";

// import widgets
const EditForm = lazy(() => import("./../forms/EditForm.js"));

const ArticleEdit = ({ match, access }) => {
  // get history object
  const history = useHistory();

  // set state variables
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [article, setArticles] = useState({});

  // get article details
  useEffect(() => {
    getArticle(match.params.id)
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

  // prepare widget headers
  const articleEditHeader = `Edit Article: ${article.name}`;

  return (
    <CRow>
      <CCol lg={12}>
        {error && !article.name && (
          <Notification
            header="Error Notification"
            body="Sorry, something went wrong during updating article!"
          />
        )}
        {!error && article.name && (
          <EditForm
            updateArticle={updateArticle}
            header={articleEditHeader}
            article={article}
            history={history}
          />
        )}
      </CCol>
    </CRow>
  );
};

ArticleEdit.propTypes = {
  match: PropTypes.shape().isRequired,
  access: PropTypes.array.isRequired,
};

export default ArticleEdit;
