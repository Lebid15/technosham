import React from 'react';
import { Trans } from 'react-i18next';

export default function Services(){
  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title"><Trans>Services</Trans></h2>
        <p className="card-text"><Trans>Our services overview</Trans></p>
      </div>
    </div>
  );
}
