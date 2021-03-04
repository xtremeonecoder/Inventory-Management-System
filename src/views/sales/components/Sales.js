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
import {
  getArticles,
  updateBulkArticles,
} from "./../../articles/models/Articles";
import { getProducts } from "./../../products/models/Products";
import { getSales, deleteSale } from "./../models/Sales";
import { handleDelete } from "./../../ikea/utilities/CallbackHandlers";

// returns table columns
const getTableColumns = () => {
  return [
    { key: "productName", _classes: "font-weight-bold", sorter: true },
    {
      key: "productArticles",
      _classes: "font-weight-bold",
      sorter: false,
      filter: false,
    },
    { key: "amountSold", _classes: "font-weight-bold", sorter: true },
    { key: "createdAt", _classes: "font-weight-bold", sorter: true },
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
    setSales,
    articles,
    products,
    sales,
  } = slotParams;

  return {
    productName: ({ productId }) => {
      const product = products.find((item) => item.id === productId);
      return (
        <td className="font-weight-bold">
          <CLink to={`/products/${productId}/details`}>{product.name}</CLink>
        </td>
      );
    },
    productArticles: ({ id, productId }) => {
      const { articles: productArticles = [] } = products.find(
        (item) => item.id === productId
      );
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
    amountSold: ({ amountSold = 0 }) => {
      return <td className="font-weight-bold">Sold {amountSold} Piece(s)</td>;
    },
    createdAt: ({ createdAt }) => {
      return <td className="font-weight-bold">{createdAt}</td>;
    },
    action: (item) => {
      const product = products.find((itm) => itm.id === item.productId);
      return (
        <td>
          <CLink
            title="View This Sale"
            className="text-dark mr-2"
            to={`/sales/${item.id}/details`}
          >
            <CIcon size={"lg"} name={"cilNotes"} />
          </CLink>
          <CLink
            title="Edit This Sale"
            className="text-dark mr-2"
            to={`/sales/${item.id}/edit`}
          >
            <CIcon size={"lg"} name={"cilPencil"} />
          </CLink>
          <CLink
            to="#"
            title="Delete This Sale"
            className="text-dark mr-2"
            onClick={() => {
              setDanger(!danger);
              setModalConfirm(() => () =>
                handleDelete({
                  items: sales,
                  targetItem: item,
                  stateCallback: setSales,
                  deleteCallback: deleteSale,
                  restoredProduct: product,
                  allArticles: articles,
                  resetCallback: updateBulkArticles,
                })
              );
              setModalHeader("Delete This Sale?");
              setModalBody("Are you sure to delete this sale?");
            }}
          >
            <CIcon size={"lg"} name={"cilTrash"} />
          </CLink>
        </td>
      );
    },
  };
};

const Sales = ({ access }) => {
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
  const [sales, setSales] = useState([]);
  const [products, setProducts] = useState([]);
  const [articles, setArticles] = useState([]);

  // get sales, products and articles
  useEffect(() => {
    Promise.all([getSales(), getProducts(), getArticles()])
      .then((results) => {
        setSales(results[0] && results[0].data);
        setProducts(results[1] && results[1].data);
        setArticles(results[2] && results[2].data);
        setLoading(false);
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
            <strong>IKEA Sales of Products</strong>
            <small className="text-muted"> (Sales List)</small>
          </CCardHeader>
          <CCardBody>
            <CDataTable
              items={sales}
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
              itemsPerPageSelect={true}
              pagination={{
                doubleArrows: true,
                align: "center",
              }}
              scopedSlots={getScopedSlots({
                danger,
                setDanger,
                setModalConfirm,
                setModalHeader,
                setModalBody,
                setSales,
                articles,
                products,
                sales,
              })}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

Sales.propTypes = {
  match: PropTypes.shape().isRequired,
  access: PropTypes.array.isRequired,
};

export default Sales;
