import React from "react";
import "./Footer.css";

const Footer = props => (
  <footer className="footer">
    <div className="row">
      <div className="column">
        <ul>
          <li>
            <a className="footer-link" href="privacypolicy.html">
              privacy policy
            </a>
          </li>
          <li>
            <a className="footer-link" href="privacypolicy.html">
              terms of service
            </a>
          </li>
          <li>
            <a className="footer-link" href="privacypolicy.html">
              terms of use
            </a>
          </li>
        </ul>
      </div>
      <div className="column">
        <ul>
          <li>Address:</li>
          <li>
            K j Somaiya institute of engineering and information Technology
          </li>
          <li>Maharashtra, India</li>
        </ul>
      </div>
      <div className="column">
        <ul>
          <li>Contact Us:</li>
          <li>Phone: 012-3456789</li>
          <li>Email:abcd@gmail.com</li>
        </ul>
      </div>
      <hr />
      <div className="row">
        <p className="bottom-bar">
          &copy;{new Date().getFullYear()} KJSIEIT,Inc. All Rights Reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
