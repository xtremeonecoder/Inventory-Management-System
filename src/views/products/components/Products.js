/**
 * IKEA Inventory Management System
 *
 * @category   Application_Frontend
 * @package    warehouse-frontend
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 */

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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
import { getArticles } from "./../../articles/models/Articles";
import { getProducts, deleteProduct } from "./../models/Products";
import { handleDelete } from "./../../ikea/utilities/CallbackHandlers";

// returns table columns
const getTableColumns = () => {
  return [
    { key: "name", _classes: "font-weight-bold", sorter: true },
    {
      key: "articles",
      _classes: "font-weight-bold",
      sorter: false,
      filter: false,
    },
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
    setProducts,
    articles,
    products,
  } = slotParams;

  return {
    name: ({ id = "", name = "" }) => {
      return (
        <td className="font-weight-bold">
          <CLink to={`/products/${id}/details`}>{name}</CLink>
        </td>
      );
    },
    articles: ({ id = "", articles: productArticles = [] }) => {
      return (
        <td className="font-weight-bold">
          <ul>
            {productArticles.map((article) => {
              const productArticle = articles.find(
                (item) => item.id === article.id
              );

              return (
                <li key={article.id + id}>
                  <CLink to={`/articles/${article.id}/details`}>
                    {productArticle && productArticle.name}{" "}
                    {article.amountRequired} piece(s)
                  </CLink>
                </li>
              );
            })}
          </ul>
        </td>
      );
    },
    action: (item) => {
      return (
        <td>
          <CLink
            title="View This Product"
            className="text-dark mr-2"
            to={`/products/${item.id}/details`}
          >
            <CIcon size={"lg"} name={"cilNotes"} />
          </CLink>
          <CLink
            title="Edit This Product"
            className="text-dark mr-2"
            to={`/products/${item.id}/edit`}
          >
            <CIcon size={"lg"} name={"cilPencil"} />
          </CLink>
          <CLink
            to="#"
            title="Delete This Product"
            className="text-dark mr-2"
            onClick={() => {
              setDanger(!danger);
              setModalConfirm(() => () =>
                handleDelete({
                  items: products,
                  targetItem: item,
                  stateCallback: setProducts,
                  deleteCallback: deleteProduct,
                })
              );
              setModalHeader("Delete This Product?");
              setModalBody("Are you sure to delete this product?");
            }}
          >
            <CIcon size={"lg"} name={"cilTrash"} />
          </CLink>
        </td>
      );
    },
  };
};

const Products = ({ access }) => {
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

  // set state variables
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [articles, setArticles] = useState([]);

  // get products and articles
  useEffect(() => {
    Promise.all([getProducts(), getArticles()])
      .then((results) => {
        setLoading(false);
        setProducts(results[0] && results[0].data);
        setArticles(results[1] && results[1].data);
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
            <strong>IKEA Products</strong>
            <small className="text-muted"> (Home Appliances)</small>
          </CCardHeader>
          <CCardBody>
            <CDataTable
              items={products}
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
              // onRowClick={(item) => productDetailsLink(item)}
              scopedSlots={getScopedSlots({
                danger,
                setDanger,
                setModalConfirm,
                setModalHeader,
                setModalBody,
                setProducts,
                articles,
                products,
              })}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

Products.propTypes = {
  match: PropTypes.shape().isRequired,
  access: PropTypes.array.isRequired,
};

export default Products;
