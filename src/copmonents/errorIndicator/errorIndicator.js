import "./error-indicator.css";

const ErrorIndicator = () => (
  <div className="error-indicator">
    <span className="boom">BOOOM! </span>
    <span>Something has gone terribly wrong</span>
    <span>(but i`m not gonna fix it)</span>
    <div className="err-pic"></div>
  </div>
);

export default ErrorIndicator;
