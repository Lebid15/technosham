import React from 'react';
import { Trans } from 'react-i18next';

const ProductCourses = () => (
  <div className="content-wrapper">
    <div className="row">
      <div className="col-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h3 className="mb-4"><Trans>Product Courses</Trans></h3>
            <p className="text-muted"><Trans>Educational product modules.</Trans></p>
            <ul className="list-arrow">
              <li><Trans>Architecture fundamentals</Trans></li>
              <li><Trans>Scalable design patterns</Trans></li>
              <li><Trans>API integration strategies</Trans></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ProductCourses;
