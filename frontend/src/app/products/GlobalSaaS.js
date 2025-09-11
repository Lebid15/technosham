import React from 'react';
import { Trans } from 'react-i18next';

const GlobalSaaS = () => (
  <div className="content-wrapper">
    <div className="row">
      <div className="col-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h3 className="mb-4"><Trans>Global Market SaaS</Trans></h3>
            <p className="text-muted"><Trans>Showcasing SaaS platform capabilities.</Trans></p>
            <div className="row">
              <div className="col-md-4 mb-4">
                <div className="border rounded p-3 h-100">
                  <h6 className="text-primary mb-2"><Trans>Multi-tenant</Trans></h6>
                  <p className="small mb-0"><Trans>Isolated tenant data model.</Trans></p>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="border rounded p-3 h-100">
                  <h6 className="text-primary mb-2"><Trans>Billing Engine</Trans></h6>
                  <p className="small mb-0"><Trans>Subscription & usage pricing.</Trans></p>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="border rounded p-3 h-100">
                  <h6 className="text-primary mb-2"><Trans>Analytics</Trans></h6>
                  <p className="small mb-0"><Trans>Real-time dashboards.</Trans></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default GlobalSaaS;