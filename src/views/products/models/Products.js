/**
 * IKEA Inventory Management System
 *
 * @category   Application_Frontend
 * @package    warehouse-frontend
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 */

import http from "./../../../services/http-service";

// api end point
const apiEndPoint = "/products";

function productUrl(productId) {
  return `${apiEndPoint}/${productId}`;
}

export function getProducts() {
  return http.get(apiEndPoint);
}

export function getProduct(productId) {
  return http.get(productUrl(productId));
}

export function createProduct(product) {
  const body = { ...product };
  return http.post(apiEndPoint, body);
}

export function updateProduct(product) {
  const body = { ...product };
  if (body.id) delete body.id;
  return http.patch(productUrl(product.id), body);
}

export function deleteProduct(productId) {
  return http.delete(productUrl(productId));
}
