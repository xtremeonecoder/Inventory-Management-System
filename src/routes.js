import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const Settings = React.lazy(() => import("./views/settings/Settings"));

// articles
const Articles = React.lazy(() =>
  import("./views/articles/components/Articles")
);
const Article = React.lazy(() => import("./views/articles/components/Article"));
const ArticleCreate = React.lazy(() =>
  import("./views/articles/components/ArticleCreate")
);
const ArticleEdit = React.lazy(() =>
  import("./views/articles/components/ArticleEdit")
);

// products
const Products = React.lazy(() =>
  import("./views/products/components/Products")
);
const Product = React.lazy(() => import("./views/products/components/Product"));
const ProductCreate = React.lazy(() =>
  import("./views/products/components/ProductCreate")
);
const ProductEdit = React.lazy(() =>
  import("./views/products/components/ProductEdit")
);

// sales
const Sales = React.lazy(() => import("./views/sales/components/Sales"));
const Sale = React.lazy(() => import("./views/sales/components/Sale"));
const SaleCreate = React.lazy(() =>
  import("./views/sales/components/SaleCreate")
);
const SaleEdit = React.lazy(() => import("./views/sales/components/SaleEdit"));

const routes = [
  { path: "/", exact: true, name: "Home" },
  {
    path: "/dashboard",
    name: "Dashboard",
    access: ["admin", "hr"],
    component: Dashboard,
  },
  {
    path: "/settings",
    name: "Settings",
    access: ["admin", "hr"],
    component: Settings,
  },
  {
    path: "/articles",
    exact: true,
    name: "Articles",
    access: ["admin", "hr"],
    component: Articles,
  },
  {
    path: "/articles/:id/details",
    exact: true,
    name: "Article Details",
    access: ["admin", "hr"],
    component: Article,
  },
  {
    path: "/articles/create",
    exact: true,
    name: "Create New Article",
    access: ["admin", "hr"],
    component: ArticleCreate,
  },
  {
    path: "/articles/:id/edit",
    exact: true,
    name: "Edit Article",
    access: ["admin", "hr"],
    component: ArticleEdit,
  },
  {
    path: "/products",
    exact: true,
    name: "Products",
    access: ["admin", "hr"],
    component: Products,
  },
  {
    path: "/products/:id/details",
    exact: true,
    name: "Product Details",
    access: ["admin", "hr"],
    component: Product,
  },
  {
    path: "/products/create",
    exact: true,
    name: "Create New Product",
    access: ["admin", "hr"],
    component: ProductCreate,
  },
  {
    path: "/products/:id/edit",
    exact: true,
    name: "Edit Product",
    access: ["admin", "hr"],
    component: ProductEdit,
  },
  {
    path: "/sales",
    exact: true,
    name: "Sales",
    access: ["admin", "hr"],
    component: Sales,
  },
  {
    path: "/sales/:id/details",
    exact: true,
    name: "Sale Details",
    access: ["admin", "hr"],
    component: Sale,
  },
  {
    path: "/sales/create",
    exact: true,
    name: "Register New Sale",
    access: ["admin", "hr"],
    component: SaleCreate,
  },
  {
    path: "/sales/:id/edit",
    exact: true,
    name: "Edit Sale",
    access: ["admin", "hr"],
    component: SaleEdit,
  },
];

export default routes;
