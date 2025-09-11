import React from 'react';
import { Trans } from 'react-i18next';

// Use new collage image (falls back to env URL if provided first)
const watanImage = process.env.REACT_APP_WATAN_IMAGE_URL || require('../../assets/images/dashboard/watan-collage.jpg');

const WatanTopup = () => (
  <div className="content-wrapper">
    <div className="row">
      <div className="col-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h3 className="mb-3"><Trans>Watan App & Games Top-up</Trans></h3>
            <p className="text-muted mb-2"><Trans>Top-up marketplace style showcase.</Trans></p>
            <div className="mb-4 p-3 rounded bg-light position-relative watan-hero-wrapper">
              <div className="row no-gutters align-items-stretch">
                <div className="col-md-4 mb-3 mb-md-0 pr-md-3 order-md-2 watan-hero-image">
                  <div className="h-100 rounded overflow-hidden">
                    { /* If you add watan-collage.jpg locally later, replace src={watanImage} with require('../../assets/images/dashboard/watan-collage.jpg') */ }
                    <img src={watanImage} alt="Social chat & apps collage" className="watan-hero-img img-fluid w-100 h-100 object-fit-cover" />
                  </div>
                </div>
                <div className="col-md-8 d-flex flex-column justify-content-center order-md-1">
                  <div className="pr-md-4 pl-md-2 mb-3 mb-md-0 watan-hero-text">
                    <a href="https://wtn4.com" target="_blank" rel="noopener noreferrer" className="d-inline-block font-weight-bold h5 mb-3">wtn4.com <span className="small font-weight-normal ml-2 align-middle visit-note"><Trans>Click to visit</Trans></span></a>
                    <p className="mb-4" style={{maxWidth:'520px'}}><Trans>Watan platform chat style description</Trans></p>
                    <div className="d-flex flex-wrap">
                      <span className="badge badge-secondary mr-2 mb-2">Likee</span>
                      <span className="badge badge-secondary mr-2 mb-2">Ahlan Chat</span>
                      <span className="badge badge-secondary mr-2 mb-2">IMO</span>
                      <span className="badge badge-secondary mr-2 mb-2">BIGO</span>
                      <span className="badge badge-secondary mr-2 mb-2">More...</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-4">
                <div className="pricing-box border rounded h-100 p-4 text-center position-relative overflow-hidden">
                  <div className="ribbon bg-primary text-white px-3 py-1 position-absolute" style={{top:'12px',left:'-4px',borderTopRightRadius:'4px',borderBottomRightRadius:'4px'}}>• <Trans>One-time Purchase</Trans></div>
                  <h4 className="mt-5 mb-2"><Trans>Initial Site Purchase</Trans></h4>
                  <p className="text-muted small mb-4"><Trans>Full setup & deployment first time</Trans></p>
                  <div className="display-4 font-weight-bold mb-2" style={{fontSize:'2.4rem'}}>$350</div>
                  <p className="small text-muted mb-0"><Trans>Includes first month hosting</Trans></p>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="pricing-box border rounded h-100 p-4 text-center">
                  <h4 className="mb-2"><Trans>Monthly Subscription</Trans></h4>
                  <p className="text-muted small mb-4"><Trans>Ongoing platform & support</Trans></p>
                  <div className="display-4 font-weight-bold mb-2" style={{fontSize:'2.4rem'}}>$50</div>
                  <p className="small text-muted mb-0"><Trans>Billed every month after first</Trans></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default WatanTopup;
