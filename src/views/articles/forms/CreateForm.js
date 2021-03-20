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
} from "@coreui/react";
import Form from "./../../ikea/utilities/Form";

class CreateForm extends Form {
  state = {
    errors: {},
    valid: {},
    invalid: {},
    data: { name: "", amountInStock: 0 },
  };

  // configure validation schema
  schema = {
    name: Joi.string().min(2).required().label("Article Name"),
    amountInStock: Joi.number()
      .integer()
      .min(0)
      .required()
      .label("Amount In Stock"),
  };

  // form submission callback
  doSubmit = () => {
    try {
      // get form data from state
      const article = { ...this.state.data };
      const { history, createArticle = null } = this.props;

      // create new article
      if (createArticle) {
        createArticle(article)
          .then((response) => {
            // set loader to false
            this.setState({ loading: false });
            // display success message
            toast.success("The article created successfully!");
            // redirect to list page
            history.push("/articles");
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
    const { header = "" } = this.props;
    const article = this.state.data;

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
                value: article.name,
                placeholder: "Example: Leg or Screw or Seat",
                label: "Article Name",
                required: true,
              })}
              {this.getInputElement({
                key: "amountInStock",
                value: article.amountInStock,
                placeholder: "Example: 200",
                label: "Amount In Stock",
                required: true,
              })}
            </CRow>
          </CCardBody>
          <CCardFooter>
            {this.renderSubmitButton({ label: "Save Article" })}
            {this.renderResetButton({ label: "Reset Values" })}
          </CCardFooter>
        </CCard>
      </CForm>
    );
  }
}

CreateForm.propTypes = {
  header: PropTypes.string.isRequired,
  history: PropTypes.shape().isRequired,
  createArticle: PropTypes.func.isRequired,
};

export default CreateForm;
