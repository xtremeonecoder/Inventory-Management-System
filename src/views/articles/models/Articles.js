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
const apiEndPoint = "/articles";

function articleUrl(articleId) {
  return `${apiEndPoint}/${articleId}`;
}

export function getArticles() {
  return http.get(apiEndPoint);
}

export function getArticle(articleId) {
  return http.get(articleUrl(articleId));
}

export function createArticle(article) {
  const body = { ...article };
  body.amountInStock = parseInt(body.amountInStock);
  return http.post(apiEndPoint, body);
}

export function updateArticle(article) {
  const body = { ...article };
  if (body.id) delete body.id;
  body.amountInStock = parseInt(body.amountInStock);
  return http.patch(articleUrl(article.id), body);
}

export function updateBulkArticles({
  articles = [],
  amountSold = 1,
  action = null,
}) {
  let body = [];
  if (action === "delete") {
    //console.log("articles: ", articles);
    body = [...articles];
  } else {
    articles.map((item) => {
      const amountToSubtract =
        parseInt(item.amountRequired) * parseInt(amountSold);
      body.push({
        id: item.id,
        amountToSubtract,
      });
    });
  }

  return http.patch(apiEndPoint, body);
}

export function deleteArticle(articleId) {
  return http.delete(articleUrl(articleId));
}
