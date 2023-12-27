import React from "react";

import ContentWripper from "../../components/ContentWripper/ContentWripper";
import "./style.scss";
ContentWripper;
const PageNotFound = () => {
  return (
    <div className="pageNotFound">
      <ContentWripper>
        <span className="bigText">404</span>
        <span className="smallText">Page not found!</span>
      </ContentWripper>
    </div>
  );
};

export default PageNotFound;
