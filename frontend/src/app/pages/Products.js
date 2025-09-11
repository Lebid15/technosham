import React from 'react';
import { Trans } from 'react-i18next';

export default function Products(){
  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title"><Trans>Products</Trans></h2>
        <p className="card-text"><Trans>Our products overview</Trans></p>
      </div>
    </div>
  );
}
