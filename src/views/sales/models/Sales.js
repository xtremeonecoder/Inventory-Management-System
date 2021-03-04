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
const apiEndPoint = "/sales";

function saleUrl(saleId) {
  return `${apiEndPoint}/${saleId}`;
}

export function getSales() {
  return http.get(apiEndPoint);
}

export function getSale(saleId) {
  return http.get(saleUrl(saleId));
}

export function registerSale(sale) {
  const body = { ...sale };
  body.amountSold = parseInt(body.amountSold);
  return http.post(apiEndPoint, body);
}

export function updateSale(sale) {
  const body = { ...sale };
  if (body.id) delete body.id;
  body.amountSold = parseInt(body.amountSold);
  return http.patch(saleUrl(sale.id), body);
}

export function deleteSale(saleId) {
  return http.delete(saleUrl(saleId));
}
