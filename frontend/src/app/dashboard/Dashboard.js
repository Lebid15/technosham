import React from 'react';
import { Trans } from 'react-i18next';

// Simplified clean dashboard replacing legacy analytics & chart code
const Dashboard = () => {
  return (
    <div className="content-wrapper">
      <div className="row">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-body text-center py-5">
              <h2 className="mb-3"><Trans>Dashboard Intro</Trans></h2>
              <p className="lead mb-4"><Trans>Select an item from the sidebar to begin</Trans></p>
              <div className="row justify-content-center">
                <div className="col-md-8">
                  <div className="row">
                    <div className="col-sm-6 mb-4">
                      <div className="p-4 border rounded h-100 bg-light">
                        <h5 className="text-uppercase text-muted mb-2"><Trans>Services Category</Trans></h5>
                        <p className="mb-0 small"><Trans>Training Courses</Trans> / <Trans>Remote Services</Trans></p>
                      </div>
                    </div>
                    <div className="col-sm-6 mb-4">
                      <div className="p-4 border rounded h-100 bg-light">
                        <h5 className="text-uppercase text-muted mb-2"><Trans>Products Category</Trans></h5>
                        <p className="mb-0 small"><Trans>Watan App & Games Top-up</Trans>, <Trans>Product Courses</Trans>, <Trans>Global Market SaaS</Trans></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;