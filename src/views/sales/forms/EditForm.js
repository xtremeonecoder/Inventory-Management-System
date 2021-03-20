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
  CFormGroup,
  CCol,
  CLabel,
} from "@coreui/react";

// import base form component
import Form from "./../../ikea/utilities/Form";
import { updateBulkArticles } from "./../../articles/models/Articles";

class EditForm extends Form {
  state = {
    errors: {},
    valid: {},
    invalid: {},
    data: { id: "", amountSold: 0 },
  };

  // configure validation schema
  schema = {
    amountSold: Joi.number().integer().min(1).required().label("Sold Amount"),
  };

  // initiate state value
  componentDidMount = () => {
    // set state from props value
    const sale = { ...this.props.sale };

    this.setState({
      data: {
        id: sale.id,
        amountSold: sale.amountSold,
      },
    });
  };

  // form submission callback
  doSubmit = () => {
    try {
      // get form data from state
      const sale = { ...this.state.data };
      const {
        sale: oldSale = {},
        articles: allArticles = [],
        product = {},
        history = {},
        updateSale = null,
      } = this.props;

      // update sales
      if (updateSale) {
        // when newAmountSold>oldAmountSold

        // when newAmountSold<oldAmountSold

        updateSale(sale)
          .then((response) => {
            // set loader to false
            this.setState({ loading: false });
            // display success message
            toast.success("The sale record updated successfully!");
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
    const { header = "", product } = this.props;
    const sale = this.state.data;

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
              <CCol xs="12">
                <CFormGroup>
                  <CLabel className="font-weight-bold">
                    Product Name: {product && product.name}
                  </CLabel>
                </CFormGroup>
              </CCol>
              {this.getInputElement({
                key: "amountSold",
                value: sale.amountSold,
                label: "Amount of Sold Products",
                required: true,
              })}
            </CRow>
          </CCardBody>
          <CCardFooter>
            {this.renderSubmitButton({ label: "Save Changes" })}
            {this.renderResetButton({ label: "Reset Values" })}
          </CCardFooter>
        </CCard>
      </CForm>
    );
  }
}

EditForm.propTypes = {
  header: PropTypes.string.isRequired,
  product: PropTypes.shape().isRequired,
  sale: PropTypes.shape().isRequired,
  articles: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  history: PropTypes.shape().isRequired,
  updateSale: PropTypes.func.isRequired,
};

export default EditForm;
