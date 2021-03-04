# Inventory Management System - React Application

A simple React Application for managing inventories, products and sales of a large-scale furniture retail company. The application is developed on the top of Node.js environment using React Framework and other essential NPM Packages, such as - Lodash, @Hapi/Joi, React-Bootstrap, CoreUI and so forth. The application uses Axios Framework for connecting to Backend REST API, sending HTTP requests and receiving HTTP responses. It uses CoreUI Framework in the kernel.

## Application Features:

1. A comprehensive **_CRUD_** (Create, Retrieve, Update and Delete) panel for **_Product Articles Management_**.

   - Data Table view of all the available **_Product Articles_**.
   - Details view of a specific **_Product Article_**.
   - Create new **_Product Article_** feature.
   - Update existing **_Product Article_** feature.
   - Delete existing **_Product Article_** feature.

2. A comprehensive **_CRUD_** (Create, Retrieve, Update and Delete) panel for **_Products Management_**.

   - Data Table view of all the available **_Products_** along with required **_Product Articles_**.
   - Details view of a specific **_Product_** along with required **_Product Articles_**.
   - Create new **_Product_** along with required **_Product Articles_**.
   - Update existing **_Product_** along with required **_Product Articles_**.
   - Delete existing **_Product_** along with required **_Product Articles_**.

3. A comprehensive **_CRUD_** (Create, Retrieve, Update and Delete) panel for **_Sales Record Management_**.

   - Data Table view of all the available **_Product Sale Records_** along with required **_Product_**, **_Product Articles_** and **_Sold Amount_**.
   - Details view of a specific **_Product Sale Record_** along with required **_Product_**, **_Product Articles_** and **_Sold Amount_**.
   - Register new **_Sale Records_** along with required **_Product_**, **_Product Articles_** and **_Sold Amount_**.
   - Update existing **_Register Sale Records_** along with required **_Product_**, **_Product Articles_** and **_Sold Amount_**.
   - Delete existing **_Register Sale Records_** along with required **_Product_**, **_Product Articles_** and **_Sold Amount_**.

## How to install the application:

1. Install node.js on your machine.
2. Clone the repository, then keep the folder somewhere in you machine.
3. Rename the directory as something like - **_warehouse-frontend_**.
4. Browse to the directory of Backend API **_warehouse-api_**.
5. Open **_terminal_** or **_command-line_** window from the project root directory.
6. Run **_warehouse-api_** using **_terminal_** window (command: `npm start`).
7. Browse to the directory of Frontend Application **_warehouse-frontend_**.
8. Open **_terminal_** or **_command-line_** window from the project root directory.
9. Install the **_warehouse-frontend_** applications using `npm install`.
10. The installation process may take several minutes, once installation finished.
11. Run **_warehouse-frontend_** using **_terminal_** window (command: `npm start`).
12. **_http://localhost/7000_** is the url for exploring the backend api.
13. **_http://localhost/3000_** is the url for exploring the frontend application.

## Application Dashboard

Once you are done with all the installation process, you will experience a frontend application dashboard as follows -

![Inventory Management Dashboard](https://github.com/xtremeonecoder/Inventory-Management-System/blob/master/documentation/application-dashboard.jpg)

The **_warehouse-api_** is the given backend api for this frontend application. I noticed that the given backend api is pretty slow in performing request and take time to response. As well as, the backend-api **_warehouse-api_** seems not reliable and consistent. It frequently fails to process client requests throwing 503 or 400 errors. If you face any error like the circled one on the following image, feel free to consider this as backend api unreliability and inconsistency issue, which I am talking about.

![Unreliable Backend API Error](https://github.com/xtremeonecoder/Inventory-Management-System/blob/master/documentation/unreliable-backend-api-error.jpg)
