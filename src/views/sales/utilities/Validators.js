// check for the available required inventories
// reset the number of inventories as per sales
export function checkAndResetInventoriesOnSale(params) {
  // destructuring params variable
  const { product: { articles = [] } = {} } = params;
  console.log("articles: ", articles);
}

export default {
  checkAndResetInventoriesOnSale,
};
