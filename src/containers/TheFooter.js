import React from "react";
import { CFooter } from "@coreui/react";

const TheFooter = () => {
  const copyrightYear = new Date().getFullYear();

  return (
    <CFooter fixed={false}>
      <div>
        <a
          href="https://www.ikea.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          IKEA Inventory Management System
        </a>
        <span className="ml-1">&copy; {copyrightYear} IKEA AB.</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
        <a
          href="https://www.ikea.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          IKEA Developers Team
        </a>
      </div>
    </CFooter>
  );
};

export default React.memo(TheFooter);
