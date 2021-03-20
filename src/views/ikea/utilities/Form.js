import React, { Component } from "react";
import {
  CButton,
  CCol,
  CFormGroup,
  CValidFeedback,
  CInvalidFeedback,
  CInput,
  CLabel,
  CSelect,
  CSwitch,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import Joi from "@hapi/joi";
import ImageUploader from "react-images-upload";
import Loader from "./Loader";

class Form extends Component {
  state = {
    data: {},
    errors: {},
    valid: {},
    invalid: {},
    loading: false,
  };

  // single input validation (on change)
  validateProparty = ({ name, value }) => {
    // check field schema defined or not?
    if (!this.schema[name]) return null;

    // using Joi validation
    const obj = { [name]: value };
    const schema = Joi.object({ [name]: this.schema[name] });
    const { error } = Joi.validate(obj, schema);

    // using Joi validation
    return error && error.details[0] ? error.details[0].message : null;
  };

  // all input validation (on submission)
  validate = () => {
    // using Joi validation
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);

    // return null if no error
    if (!error) return null;

    // initialize error
    const errors = {};

    // using map method
    error.details.map((err) => {
      errors[err.path[0]] = err.message;
      return errors;
    });

    return errors;
  };

  // event object destructuring
  handleChange = ({ currentTarget: input }) => {
    // get state clone
    const { data, errors, valid, invalid } = { ...this.state };

    // validate the input data
    const errorMessage = this.validateProparty(input);
    if (errorMessage) {
      valid[input.name] = false;
      invalid[input.name] = true;
      errors[input.name] = errorMessage;
    } else {
      valid[input.name] = true;
      invalid[input.name] = false;
      delete errors[input.name];
    }

    // set state with new value
    data[input.name] = input.value;

    // if checkbox then
    if (
      input.type != null &&
      input.type === "checkbox" &&
      input.checked != null &&
      input.checked === false
    ) {
      data[input.name] = "";
    }

    // update state
    this.setState({ data, errors, valid, invalid });

    // call the callback if callback is set
    if (this.doChange) this.doChange();
  };

  // gets two arguments - pictureFiles, pictureDataURLs
  handleImageDrop = (pictureFiles) => {
    // console.log("picture: ", pictureFiles);
    const data = { ...this.state.data };
    data["images"] = pictureFiles;
    this.setState({ data });
  };

  // on submission
  handleSubmission = (event) => {
    // prevent default submission
    event.preventDefault();

    // call validation
    const errors = this.validate();

    // set state for error
    if (errors) this.setState({ errors });

    // if there is no error then call server
    if (this.doSubmit) this.doSubmit();
  };

  // returns input element
  getInputElement = (params) => {
    // get errors from state
    let errorMessage = "";
    const { errors, valid, invalid } = this.state;
    const {
      key,
      value,
      type = "text",
      label,
      required = false,
      placeholder = "",
      disabled = false,
      wrapper = true,
      groupText = null,
      groupIcon = null,
    } = params;
    if (errors && errors[key]) errorMessage = errors[key];

    // form input element
    const inputElement = (
      <CInput
        type={type}
        required={required}
        valid={valid[key]}
        invalid={invalid[key]}
        name={key}
        id={key}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        onChange={this.handleChange}
      />
    );

    // return input element without wrapper
    if (!wrapper) return inputElement;

    // return input element with wrapper and icon-label
    if (groupIcon || groupText) {
      return (
        <CInputGroup className="mb-3">
          <CInputGroupPrepend>
            <CInputGroupText>
              {groupIcon ? <CIcon name={groupIcon} /> : groupText}
            </CInputGroupText>
          </CInputGroupPrepend>
          {inputElement}
          <CValidFeedback>Cool, input is valid!</CValidFeedback>
          <CInvalidFeedback>{errorMessage}</CInvalidFeedback>
        </CInputGroup>
      );
    }

    // return input element with wrapper and text-label
    return (
      <CCol key={key} xs="12">
        <CFormGroup>
          <CLabel htmlFor={key}>{label}</CLabel>
          {inputElement}
          <CValidFeedback>Cool, input is valid!</CValidFeedback>
          <CInvalidFeedback>{errorMessage}</CInvalidFeedback>
        </CFormGroup>
      </CCol>
    );
  };

  // returns group switch element
  getSwitchElement = (params) => {
    // get errors from state
    let errorMessage = "";
    const { errors } = this.state;
    const { key, label, elements } = params;
    if (errors && errors[key]) errorMessage = errors[key];

    // return the input element
    return (
      <CCol key={key} xs="12">
        <CFormGroup row>
          <CCol md="3">
            <CLabel>{label}</CLabel>
          </CCol>
          <CCol md="9">
            {elements.map((element) => (
              <CFormGroup
                key={element.key}
                variant="checkbox"
                className="checkbox"
              >
                <CSwitch
                  id={element.key}
                  name={element.key}
                  value={element.key}
                  color={element.color ? element.color : "danger"}
                  labelOn={element.labelOn ? element.labelOn : "Yes"}
                  labelOff={element.labelOff ? element.labelOff : "No"}
                  size={element.size ? element.size : "lg"}
                  checked={element.checked ? true : false}
                  variant={element.variant ? element.variant : ""}
                  shape={element.shape ? element.shape : ""}
                  required={element.required ? true : false}
                  disabled={element.disabled ? true : false}
                  onChange={this.handleChange}
                />
                <CLabel
                  variant="checkbox"
                  className="form-check-label h5 ml-3"
                  htmlFor={element.key}
                >
                  {element.label}
                </CLabel>
              </CFormGroup>
            ))}
          </CCol>
          <CValidFeedback>Cool, input is valid!</CValidFeedback>
          <CInvalidFeedback>{errorMessage}</CInvalidFeedback>
        </CFormGroup>
      </CCol>
    );
  };

  // returns select element
  getSelectElement = (params) => {
    // get errors from state
    let errorMessage = "";
    const { errors, valid, invalid } = this.state;
    const {
      key,
      value,
      label = "",
      required = false,
      custom = false,
      disabled = false,
      data,
      wrapper = true,
    } = params;
    if (errors && errors[key]) errorMessage = errors[key];

    // form select element
    const selectElement = (
      <CSelect
        required={required}
        custom={custom}
        valid={valid[key]}
        invalid={invalid[key]}
        name={key}
        id={key}
        value={value}
        onChange={this.handleChange}
        disabled={disabled}
      >
        {data.map(({ value, label }) => (
          <option key={`${key}${value}`} value={value}>
            {label}
          </option>
        ))}
      </CSelect>
    );

    // return select element without wrapper
    if (!wrapper) return selectElement;

    // return the select element
    return (
      <CCol key={key} xs="12">
        <CFormGroup>
          <CLabel htmlFor={key}>{label}</CLabel>
          {selectElement}
          <CValidFeedback>Cool, input is valid!</CValidFeedback>
          <CInvalidFeedback>{errorMessage}</CInvalidFeedback>
        </CFormGroup>
      </CCol>
    );
  };

  // returns image uploader element
  getImageUploader = (params = {}) => {
    // destructure params
    const {
      key = "imageUploader",
      withIcon = true,
      withPreview = true,
      singleImage = false,
      buttonText = "Choose Images",
      imgExtension = [".jpg", ".gif", ".png"],
      maxFileSize = 5242880,
      label = "Max file size: 5MB, accepted: jpg, gif, png.",
    } = params;

    // return the select element
    return (
      <CCol key={key} xs="12">
        <CFormGroup>
          <ImageUploader
            label={label}
            withIcon={withIcon}
            withPreview={withPreview}
            singleImage={singleImage}
            buttonText={buttonText}
            onChange={this.handleImageDrop}
            imgExtension={imgExtension}
            maxFileSize={maxFileSize}
          />
        </CFormGroup>
      </CCol>
    );
  };

  // form submit button
  renderSubmitButton = ({ label, block = false, iconName = "cil-save" }) => {
    const { errors, loading } = { ...this.state };
    // const disabled = Object.keys(errors).length;

    return (
      <CButton
        // disabled={disabled ? true : false}
        block={block}
        type="submit"
        className="mr-2"
        size="sm"
        color="success"
        style={{ minWidth: "115px", minHeight: "32px" }}
        onClick={() => this.setState({ loading: true })}
      >
        {loading && (
          <Loader size="sm" variant="grow" color={null} style={null} />
        )}
        {!loading && (
          <>
            <CIcon name={iconName} /> {label}
          </>
        )}
      </CButton>
    );
  };

  // form reset button
  renderResetButton = ({ label, iconName = "cil-ban" }) => {
    const errors = { ...this.state.errors };
    // const disabled = Object.keys(errors).length;
    return (
      <CButton
        // disabled={disabled ? true : false}
        type="reset"
        size="sm"
        color="danger"
      >
        <CIcon name={iconName} /> {label}
      </CButton>
    );
  };
}

export default Form;
