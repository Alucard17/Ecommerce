import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Dashboard.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Routes from "./Routes";

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Ecom</a>
          <input className="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search" />
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap">
              <a className="nav-link" href="#">Sign out</a>
            </li>
          </ul>
        </nav>
        <div className="container-fluid">
          <div className="row">
            <nav className="col-md-2 d-none d-md-block bg-light sidebar">
              <div className="sidebar-sticky">
                <ul className="nav flex-column">
                  <li className="nav-item">
                    <a className="nav-link active" href="#">
                      <span data-feather="home" />
                      Dashboard <span className="sr-only">(current)</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      <span data-feather="file" />
                      Orders
              </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      <span data-feather="shopping-cart" />
                      Products
              </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      <span data-feather="users" />
                      Customers
              </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      <span data-feather="bar-chart-2" />
                      Reports
              </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      <span data-feather="layers" />
                      Integrations
              </a>
                  </li>
                </ul>
                <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                  <span>Saved reports</span>
                  <a className="d-flex align-items-center text-muted" href="#">
                    <span data-feather="plus-circle" />
                  </a>
                </h6>
                <ul className="nav flex-column mb-2">
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      <span data-feather="file-text" />
                      Current month
              </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      <span data-feather="file-text" />
                      Last quarter
              </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      <span data-feather="file-text" />
                      Social engagement
              </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      <span data-feather="file-text" />
                      Year-end sale
              </a>
                  </li>
                </ul>
              </div>
            </nav>
            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
              <Switch>
                {Routes.map(route =>
                  <Route path={route.route} component={route.component} />)
                }
              </Switch>
            </main>
          </div>
        </div>
      </div>

    </Router>
  );
}

export default App;
