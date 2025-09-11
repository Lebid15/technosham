import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';
import { Trans } from 'react-i18next';

class Sidebar extends Component {
  state = {
    servicesMenuOpen: false,
    productsMenuOpen: false,
    appsMenuOpen: false,
    basicUiMenuOpen: false,
    advancedUiMenuOpen: false,
    tablesMenuOpen: false,
    mapsMenuOpen: false,
    chartsMenuOpen: false,
    userPagesMenuOpen: false,
    errorPagesMenuOpen: false,
    generalPagesMenuOpen: false,
    ecommercePagesMenuOpen: false,
  };

  toggleMenuState(menuState) {
    if (this.state[menuState]) {
      this.setState({[menuState] : false});
    } else if(Object.keys(this.state).length === 0) {
      this.setState({[menuState] : true});
    } else {
      Object.keys(this.state).forEach(i => {
        this.setState({[i]: false});
      });
      this.setState({[menuState] : true});
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  componentDidMount() {
    this.onRouteChanged();
    // restore theme preference
    const savedTheme = localStorage.getItem('theme');
    if(savedTheme === 'dark') {
      document.body.classList.add('dark');
    }
    // add className 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    const body = document.querySelector('body');
    document.querySelectorAll('.sidebar .nav-item').forEach((el) => {
      el.addEventListener('mouseover', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
  }

  toggleDarkMode = (e) => {
    e.preventDefault();
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    this.forceUpdate();
  }

  onRouteChanged() {
    document.querySelector('#sidebar').classList.remove('active');
    Object.keys(this.state).forEach(i => {
      this.setState({[i]: false});
    });

    const dropdownPaths = [
      {path:'/apps', state: 'appsMenuOpen'},
      {path:'/basic-ui', state: 'basicUiMenuOpen'},
      {path:'/advanced-ui', state: 'advancedUiMenuOpen'},
      {path:'/tables', state: 'tablesMenuOpen'},
      {path:'/maps', state: 'mapsMenuOpen'},
      {path:'/charts', state: 'chartsMenuOpen'},
      {path:'/user-pages', state: 'userPagesMenuOpen'},
      {path:'/error-pages', state: 'errorPagesMenuOpen'},
      {path:'/general-pages', state: 'generalPagesMenuOpen'},
      {path:'/ecommerce', state: 'ecommercePagesMenuOpen'},
    ];

    dropdownPaths.forEach((obj => {
      if (this.isPathActive(obj.path)) {
        this.setState({[obj.state] : true})
      }
    }));
 
  } 
  render () {
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <ul className="nav">
          <li className={ this.isPathActive('/dashboard') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/dashboard">
              <span className="icon-bg"><i className="mdi mdi-cube menu-icon"></i></span>
              <span className="menu-title"><Trans>Dashboard</Trans></span>
            </Link>
          </li>
          <li className={ this.isPathActive('/services') ? 'nav-item active' : 'nav-item' }>
            <div className={ this.state.servicesMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('servicesMenuOpen') } data-toggle="collapse">
              <span className="icon-bg"><i className="mdi mdi-briefcase-check menu-icon"></i></span>
              <span className="menu-title"><Trans>Services Category</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.servicesMenuOpen }>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item"> <Link className={ this.isPathActive('/services/training') ? 'nav-link active' : 'nav-link' } to="/services/training"><Trans>Training Courses</Trans></Link></li>
                <li className="nav-item"> <Link className={ this.isPathActive('/services/remote') ? 'nav-link active' : 'nav-link' } to="/services/remote"><Trans>Remote Services</Trans></Link></li>
              </ul>
            </Collapse>
          </li>
          <li className={ this.isPathActive('/products') ? 'nav-item active' : 'nav-item' }>
            <div className={ this.state.productsMenuOpen ? 'nav-link menu-expanded' : 'nav-link' } onClick={ () => this.toggleMenuState('productsMenuOpen') } data-toggle="collapse">
              <span className="icon-bg"><i className="mdi mdi-package-variant-closed menu-icon"></i></span>
              <span className="menu-title"><Trans>Products Category</Trans></span>
              <i className="menu-arrow"></i>
            </div>
            <Collapse in={ this.state.productsMenuOpen }>
              <ul className="nav flex-column sub-menu">
                <li className="nav-item">
                  <Link className={ this.isPathActive('/products/watan') ? 'nav-link active' : 'nav-link' } to="/products/watan">
                    <Trans>Watan App & Games Top-up</Trans>
                  </Link>
                </li>
              </ul>
            </Collapse>
          </li>
          
          <li className="nav-item sidebar-user-actions">
            <div className="user-details">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="d-flex align-items-center">
                    <div className="sidebar-profile-img">
                      <img src={require("../../assets/images/faces/face28.png")} alt="profile" />
                    </div>
                    <div className="sidebar-profile-text">
                      <p className="mb-1"><Trans>Henry Klein</Trans></p>
                    </div>
                  </div>
                </div>
                <div className="badge badge-danger">3</div>
              </div>
            </div>
          </li>
            {/* About Technosham moved into sidebar above Settings */}
            <li className="nav-item sidebar-user-actions">
              <div className="sidebar-user-menu">
                <Link to="/about" className="nav-link"><i className="mdi mdi-information-outline menu-icon"></i>
                  <span className="menu-title"><Trans>About Technosham</Trans></span>
                </Link>
              </div>
            </li>
          <li className="nav-item sidebar-user-actions">
            <div className="sidebar-user-menu">
              <a href="!#" onClick={event => event.preventDefault()} className="nav-link"><i className="mdi mdi-settings menu-icon"></i>
                <span className="menu-title"><Trans>Settings</Trans></span>
              </a>
            </div>
          </li>
          <li className="nav-item sidebar-user-actions">
            <div className="sidebar-user-menu">
              <a href="!#" onClick={event => event.preventDefault()} className="nav-link"><i className="mdi mdi-speedometer menu-icon"></i>
                <span className="menu-title"><Trans>Take Tour</Trans></span></a>
            </div>
          </li>
            {/* Dark mode toggle button placed above logout */}
            <li className="nav-item sidebar-user-actions">
              <div className="sidebar-user-menu">
                <a href="!#" onClick={this.toggleDarkMode} className="nav-link"><i className="mdi mdi-weather-night menu-icon"></i>
                  <span className="menu-title"><Trans>Dark Mode</Trans></span></a>
              </div>
            </li>
          <li className="nav-item sidebar-user-actions">
            <div className="sidebar-user-menu">
              <a href="!#" onClick={event => event.preventDefault()} className="nav-link"><i className="mdi mdi-logout menu-icon"></i>
                <span className="menu-title"><Trans>Log Out</Trans></span></a>
            </div>
          </li>
        </ul>
      </nav>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }

}

export default withRouter(Sidebar);