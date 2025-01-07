import { FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center mt-5">
      <FaExclamationTriangle style={{ fontSize: "3rem" }} />
      <h1 className="display-1">404</h1>
      <h2>Page Not Found</h2>
      <Link to="/" className="btn btn-primary">
        Go Back Home
      </Link>
    </div>
  );
}
