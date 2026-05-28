import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="not-found">
      <div className="not-found-emoji">🏳️</div>
      <h1 className="not-found-title">404 — Page Not Found</h1>
      <p className="not-found-sub">
        Looks like this page is out of bounds.
      </p>
      <Link to="/" className="btn-primary">
        Go Home
      </Link>
    </div>
  );
}