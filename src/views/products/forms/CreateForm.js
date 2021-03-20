/**
 * IKEA Inventory Management System
 *
 * @category   Application_Frontend
 * @package    warehouse-frontend
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 */

import React from "react";
import { PropTypes } from "prop-types";
import { toast } from "react-toastify";
import Joi from "@hapi/joi";
import {
  CRow,
  CCard,
  CCardBody,
  CCardHeader,
  CCardFooter,
  CForm,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CInputGroupAppend,
  CButton,
  CCol,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import Form from "./../../ikea/utilities/Form";

class CreateForm extends Form {
  state = {
    errors: {},
    valid: {},
    invalid: {},
    data: { id: "", name: "", articles: [] },
  };

  // configure validation schema
  schema = {
    name: Joi.string().min(2).required().label("Product Name"),
    // articles: Joi.array()
    //   .items(
    //     Joi.object({
    //       id: Joi.string().required().label("Article"),
    //       amountRequired: Joi.number()
    //         .integer()
    //         .min(0)
    //         .required()
    //         .label("Required Amount"),
    //     })
    //   )
    //   .required()
    //   .label("Product Articles"),
  };

  addNewArticle = () => {
    const product = { ...this.state.data };
    const articles = [...product.articles];
    articles.push({ id: "", amountRequired: 0 });
    this.setState({ data: { id: product.id, name: product.name, articles } });
  };

  deleteArticle = (index) => {
    const product = { ...this.state.data };
    const articles = [...product.articles];
    if (articles.length) articles.splice(index, 1);
    this.setState({ data: { id: product.id, name: product.name, articles } });
  };

  // on change callback
  doChange = () => {
    // get state data
    const product = { ...this.state.data };
    const articles = [...product.articles];

    // process state data
    articles.map((article, index) => {
      if (product[`article-${index}`]) {
        articles[index]["id"] = product[`article-${index}`];
        delete product[`article-${index}`];
      }
      if (product[`amountRequired-${index}`]) {
        articles[index]["amountRequired"] = parseInt(
          product[`amountRequired-${index}`]
        );
        delete product[`amountRequired-${index}`];
      }
    });

    // set updated data to state
    product["articles"] = articles;
    this.setState({ data: product });
  };

  // form submission callback
  doSubmit = () => {
    try {
      // get form data from state
      const product = { ...this.state.data };
      const articles = [...product.articles];
      const { history, createProduct = null } = this.props;

      // sanitize data article data
      for (let i = 0; i < articles.length; i++) {
        if (
          (articles[i] && !articles[i].id) ||
          (articles[i] && !articles[i].amountRequired)
        ) {
          articles.splice(i, 1);
          i--;
        }
      }

      // check article selected or not
      if (!articles.length) {
        return toast.error("Please product articles!");
      }

      // assign the sanitized articles
      product["articles"] = articles;

      // update product
      if (createProduct) {
        createProduct(product)
          .then((response) => {
            // set loader to false
            this.setState({ loading: false });
            // display success message
            toast.success("The product created successfully!");
            //redirect to list
            history.push("/products");
          })
          .catch((error) => {
            // handle error
            // set loader to false
            this.setState({ loading: false });
          });
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        // error
      }
    }
  };

  render() {
    // destructuring props
    const { header = "", articles } = this.props;
    const product = this.state.data;

    // prepare the article options
    const articleOptions = [{ value: "", label: "Select Article" }];
    if (articles.length) {
      articles.map((article, index) => {
        articleOptions[index + 1] = {
          value: article.id,
          label: article.name,
        };
      });
    }

    // render
    return (
      <CForm
        wasValidated={false}
        onSubmit={this.handleSubmission}
        method="post"
        className="form-horizontal"
      >
        <CCard>
          <CCardHeader>
            <strong>{header}</strong>
          </CCardHeader>
          <CCardBody>
            <CRow>
              {this.getInputElement({
                key: "name",
                value: product.name,
                label: "Product Name",
                required: true,
              })}
              <CCol xs="12" className="d-flex justify-content-center">
                <CButton
                  type="button"
                  className="mr-2"
                  size="sm"
                  color="success"
                  onClick={() => this.addNewArticle()}
                >
                  <CIcon name={"cilUserFollow"} /> Add New Article
                </CButton>
              </CCol>
              {product.articles.map((item, index) => {
                const nameKey = `article-${index}`;
                const amountKey = `amountRequired-${index}`;
                return (
                  <CCol key={nameKey} className={"mt-2 col-12"}>
                    <CInputGroup>
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          Article Name #{index + 1}
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      {this.getSelectElement({
                        key: nameKey,
                        value: item.id,
                        label: "",
                        required: true,
                        custom: false,
                        data: articleOptions,
                        wrapper: false,
                      })}
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          Required Amount #{index + 1}
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      {this.getInputElement({
                        key: amountKey,
                        value: item.amountRequired,
                        label: "",
                        required: true,
                        wrapper: false,
                      })}
                      <CInputGroupAppend>
                        <CInputGroupText
                          style={{ cursor: "pointer" }}
                          className={"bg-danger text-white"}
                          onClick={() => this.deleteArticle(index)}
                        >
                          <CIcon name={"cilTrash"} />
                        </CInputGroupText>
                      </CInputGroupAppend>
                    </CInputGroup>
                  </CCol>
                );
              })}
            </CRow>
          </CCardBody>
          <CCardFooter>
            {this.renderSubmitButton({ label: "Save Product" })}
            {this.renderResetButton({ label: "Reset Values" })}
          </CCardFooter>
        </CCard>
      </CForm>
    );
  }
}

CreateForm.propTypes = {
  header: PropTypes.string.isRequired,
  articles: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  history: PropTypes.shape().isRequired,
  createProduct: PropTypes.func.isRequired,
};

export default CreateForm;
