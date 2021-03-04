/**
 * IKEA Inventory Management System
 *
 * @category   Application_Frontend
 * @package    warehouse-frontend
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 */

import axios from "axios";
import { toast } from "react-toastify";
import logger from "./log-service";
import { apiUrl } from "./../config.json";

// custom axios configuration
const instance = axios.create({
  baseURL: apiUrl,
  timeout: 8000,
  headers: {
    "Content-Type": "application/json",
    Authorization: "no-token-specified",
  },
});

// catch unexpected request errors
instance.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// catch unexpected response errors
instance.interceptors.response.use(
  (response) => {
    // For status code 2xx
    // Do something with response data
    return response;
  },
  (error) => {
    const expectedException =
      error &&
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;

    let errorMessage = error.message;
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.message
    ) {
      errorMessage += "\n" + error.response.data.message;
    }

    if (!expectedException) {
      logger.log(error);
      toast.error("An unexpected error occurred: " + errorMessage);
    } else if (expectedException) {
      logger.log(error);
      toast.error("Error: " + errorMessage);
    }

    return Promise.reject(error);
  }
);

export default {
  get: instance.get,
  post: instance.post,
  put: instance.put,
  patch: instance.patch,
  delete: instance.delete,
};
