import React, { useEffect, useState  } from 'react';
import { NavLink } from 'react-router-dom';
import api from '../api';
export const AgentNav = () => {
  const [sellerbos, setSellerBos] = useState('');
  const [deallerbos, setDeallerBos] = useState('');
  const storedAgentId = sessionStorage.getItem('agentId'); 
  useEffect(() => {
    fetchData();
 }, []);

  const fetchData = async () => {
    try {
       const response = await api.get(`/agent/agentlist/${storedAgentId}`);
        const Agentdata = (response.data.Agent)
        setSellerBos(Agentdata.Dealer_BOS_Allowed)
        setDeallerBos(Agentdata.Seller_BOS_Allowed)
      } catch (error) {
        console.error('Error fetching vehicle details:', error);
    }
 };
  return (
    <header className="py-3">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light p-0">
          <NavLink className="navbar-brand" to="/">
            <img src="/images/logo.png" alt="logo-img" />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink
                  exact
                  to="/agent-car-inspection"
                  className="nav-link"
                  activeClassName="active"
                >
                  New Cars For Inspection
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/agent-car-calender"
                  className="nav-link"
                  activeClassName="active"
                >
                  Calendar
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/agent-view-inspection"
                  className="nav-link"
                  activeClassName="active"
                >
                  View Posted Inspection Reports
                </NavLink>
              </li>
              {(sellerbos === 1 || deallerbos === 1) && (
                <li className="nav-item">
                  <NavLink
                    to="/bos"
                    className="nav-link"
                    activeClassName="active"
                  >
                    BOS
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
          <div className="signout-btn">
            <a href="/" className="btn btn-primary">
              Sign Out
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};
