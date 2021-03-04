import { toast } from "react-toastify";

// handle delete operation
export async function handleDelete({
  items = [],
  targetItem = {},
  stateCallback = null,
  deleteCallback = null,
  history = null,
  restoredProduct = null,
  allArticles = [],
  resetCallback = null,
}) {
  // optimistic method (updates frontend first and updates backend later)
  if (stateCallback && items && items.length && targetItem && targetItem.id) {
    const filteredItems = items.filter((item) => item.id !== targetItem.id);
    stateCallback(filteredItems);
  }

  // call backend for deleting
  try {
    // delete from server
    if (deleteCallback && targetItem && targetItem.id) {
      await deleteCallback(targetItem.id);
    }

    // reset the number of inventories
    // while any sale record is deleted
    if (restoredProduct && resetCallback) {
      resetInventoriesOnSalesDelete({
        amountSold: targetItem.amountSold,
        allArticles,
        restoredProduct,
        resetCallback,
      });
    }

    // show success message
    toast.success("The item successfully deleted from database!");

    // redirect to list page
    if (history && history.goBack) history.goBack();
  } catch (error) {
    // show error message for 404
    if (error.response && error.response.status === 404) {
      toast.error("The item has already been deleted!");
    }

    // roll back to the original data on failure
    if (stateCallback && items && items.length) {
      stateCallback(items);
    }
  }
}

export async function resetInventoriesOnSalesDelete({
  amountSold,
  allArticles,
  restoredProduct: { articles },
  resetCallback,
}) {
  const updateArticles = [];
  articles.map((item1) => {
    const article = allArticles.find((item2) => item1.id === item2.id);

    // calculate in stock value
    const newValue =
      parseInt(article.amountInStock) +
      parseInt(item1.amountRequired) * parseInt(amountSold);

    // store the updated articles
    updateArticles.push({
      id: item1.id,
      amountInStock: newValue,
    });
  });

  await resetCallback({
    articles: updateArticles,
    amountSold,
    action: "delete",
  });
}

export default {
  handleDelete,
  resetInventoriesOnSalesDelete,
};
