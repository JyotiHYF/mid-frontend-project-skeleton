import "./Footer.css";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="about-us">
          <h3>About Us</h3>
          <p>Who we are</p>
          <p>Work with us</p>
        </div>
        <div className="contact-us">
          <h3>Contact Us</h3>
          <p>FAQ</p>
          <p>Help</p>
        </div>
        <div className="follow-us">
          <h3>Follow Us</h3>
          <ul className="footer-links">
            <li>
              <a href="https://facebook.com">Facebook</a>
            </li>
            <li>
              <a href="https://linkedin.com">LinkedIn</a>
            </li>
            <li>
              <a href="https://instagram.com">Instagram</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="eventmaster">
        <p>© 2026 HYF Eventmaster. All rights reserved.</p>
      </div>
    </footer>
  );
}
