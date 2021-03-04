/**
 * IKEA Inventory Management System
 *
 * @category   Application_Frontend
 * @package    warehouse-frontend
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 */

import React, { useState, useEffect } from "react";
import { useLocation, Redirect } from "react-router-dom";
import { PropTypes } from "prop-types";

import {
  CLink,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import Loader from "./../../ikea/utilities/Loader";
import Modal from "./../../ikea/utilities/Modal";
import Notification from "./../../ikea/alerts/Notification";
import { getArticles, deleteArticle } from "./../models/Articles";
import { handleDelete } from "./../../ikea/utilities/CallbackHandlers";

// returns table columns
const getTableColumns = () => {
  return [
    { key: "name", _classes: "font-weight-bold", sorter: true },
    { key: "amountInStock", _classes: "font-weight-bold", sorter: true },
    {
      key: "action",
      _classes: "font-weight-bold",
      sorter: false,
      filter: false,
    },
  ];
};

// returns table cell contents
const getScopedSlots = (slotParams = {}) => {
  const {
    danger,
    setDanger,
    setModalConfirm,
    setModalHeader,
    setModalBody,
    setArticles,
    articles,
  } = slotParams;

  return {
    name: ({ id = "", name = "" }) => {
      return (
        <td className="font-weight-bold">
          <CLink to={`/articles/${id}/details`}>{name}</CLink>
        </td>
      );
    },
    amountInStock: ({ id = "", amountInStock = "" }) => {
      return (
        <td className="font-weight-bold">
          <CLink to={`/articles/${id}/details`}>{amountInStock} piece(s)</CLink>
        </td>
      );
    },
    action: (item) => {
      return (
        <td>
          <CLink
            title="View This Article"
            className="text-dark mr-2"
            to={`/articles/${item.id}/details`}
          >
            <CIcon size={"lg"} name={"cilNotes"} />
          </CLink>
          <CLink
            title="Edit This Article"
            className="text-dark mr-2"
            to={`/articles/${item.id}/edit`}
          >
            <CIcon size={"lg"} name={"cilPencil"} />
          </CLink>
          <CLink
            to="#"
            title="Delete This Article"
            className="text-dark mr-2"
            onClick={() => {
              setDanger(!danger);
              setModalConfirm(() => () =>
                handleDelete({
                  items: articles,
                  targetItem: item,
                  stateCallback: setArticles,
                  deleteCallback: deleteArticle,
                })
              );
              setModalHeader("Delete This Article?");
              setModalBody(
                "Are you sure to delete this article? It may create issues for the products sharing this article!"
              );
            }}
          >
            <CIcon size={"lg"} name={"cilTrash"} />
          </CLink>
        </td>
      );
    },
  };
};

const Articles = ({ access }) => {
  // get state for danger alert (for modal)
  const [danger, setDanger] = useState(false);
  const [modalHeader, setModalHeader] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [modalConfirm, setModalConfirm] = useState(null);

  const queryPage = useLocation().search.match(/page=([0-9]+)/, "");
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1);
  const [page, setPage] = useState(currentPage);

  useEffect(() => {
    currentPage !== page && setPage(currentPage);
  }, [currentPage, page]);

  // get articles
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);

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

  // pagination variables
  const itemsPerPage = 20;

  return (
    <CRow>
      <CCol xl={12}>
        {error && (
          <Notification
            header="Error Notification"
            body="Sorry, something went wrong during executing the operation!"
          />
        )}
        <CCard>
          <CCardHeader>
            <Modal
              onConfirm={modalConfirm}
              stateSetter={{
                setDanger,
                setModalBody,
                setModalHeader,
                setModalConfirm,
              }}
              params={{
                danger: danger,
                header: modalHeader,
                body: modalBody,
              }}
            />
            <strong>IKEA Product Articles</strong>
            <small className="text-muted"> (Product Properties)</small>
          </CCardHeader>
          <CCardBody>
            <CDataTable
              items={articles}
              fields={getTableColumns()}
              hover={true}
              sorter={true}
              header={true}
              loading={loading}
              dark={false}
              striped={true}
              responsive={true}
              itemsPerPage={itemsPerPage}
              activePage={page}
              columnFilter={true}
              tableFilter={true}
              //clickableRows={true}
              itemsPerPageSelect={true}
              pagination={{
                doubleArrows: true,
                align: "center",
              }}
              // onRowClick={(item) => articleDetailsLink(item)}
              scopedSlots={getScopedSlots({
                danger,
                setDanger,
                setModalConfirm,
                setModalHeader,
                setModalBody,
                setArticles,
                articles,
              })}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

Articles.propTypes = {
  match: PropTypes.shape().isRequired,
  access: PropTypes.array.isRequired,
};

export default Articles;
