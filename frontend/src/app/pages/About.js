import React from 'react';
import { Trans } from 'react-i18next';

export default function About(){
  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title"><Trans>About Technosham</Trans></h2>
        <p className="card-text"><Trans>About Technosham description</Trans></p>
      </div>
    </div>
  );
}
