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

// import base form component
import Form from "./../../ikea/utilities/Form";
import { updateBulkArticles } from "./../../articles/models/Articles";

class CreateForm extends Form {
  state = {
    errors: {},
    valid: {},
    invalid: {},
    data: { id: "", productId: "", amountSold: 0 },
  };

  // configure validation schema
  schema = {
    productId: Joi.string().min(2).required().label("Select Product"),
    amountSold: Joi.number().integer().min(1).required().label("Sold Amount"),
  };

  // form submission callback
  doSubmit = () => {
    try {
      // get form data from state
      const sale = { ...this.state.data };
      const { history, products, registerSale = null } = this.props;

      // register sale's record
      if (registerSale) {
        // get the sale's product
        const product = products.find((item) => item.id === sale.productId);

        // first updateBulkArticles will check for availability of articles
        // if everything is alright then registerSale will register new sale
        updateBulkArticles({
          articles: product.articles,
          amountSold: sale.amountSold,
        })
          .then((result) => {
            // register sales
            return registerSale(sale);
          })
          .then((result) => {
            // set loader to false
            this.setState({ loading: false });
            // display success message
            toast.success("The sale record registerd successfully!");
            //redirect to list
            history.push("/sales");
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
    const { header = "", products } = this.props;
    const sale = this.state.data;

    // prepare the product options
    const productOptions = [{ value: "", label: "Select Product" }];
    if (products.length) {
      products.map((product, index) => {
        productOptions[index + 1] = {
          value: product.id,
          label: product.name,
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
              {this.getSelectElement({
                key: "productId",
                value: sale.productId,
                label: "Product Name",
                required: true,
                custom: false,
                data: productOptions,
              })}
              {this.getInputElement({
                key: "amountSold",
                value: sale.amountSold,
                label: "Amount of Sold Products",
                required: true,
              })}
            </CRow>
          </CCardBody>
          <CCardFooter>
            {this.renderSubmitButton("Save Changes")}
            {this.renderResetButton("Reset Values")}
          </CCardFooter>
        </CCard>
      </CForm>
    );
  }
}

CreateForm.propTypes = {
  header: PropTypes.string.isRequired,
  products: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  history: PropTypes.shape().isRequired,
  registerSale: PropTypes.func.isRequired,
};

export default CreateForm;
