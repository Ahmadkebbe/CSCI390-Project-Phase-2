import { Link } from "react-router-dom";
import { sportsData } from "../Pages/SportsData";

export default function HomePage() {
  return (
    <div className="hero">
      <div className="hero-tag">🇱🇧 Based in Lebanon</div>

      <h1>
        Find Your
        <br />
        <span>Perfect Sport</span>
      </h1>

      <p>
        Discover which sport fits your lifestyle — then find the best venues
        near you in Lebanon.
      </p>

      <div className="hero-actions">
        <Link to="/quiz" className="btn-primary">
          Take the Quiz →
        </Link>
        <Link to="/sports" className="btn-outline">
          Browse Sports
        </Link>
      </div>

      <div className="sports-strip">
        {Object.entries(sportsData).map(([name, s]) => (
          <Link key={name} to={`/sports/${name.toLowerCase()}`} className="sport-pill">
            <span>{s.emoji}</span>
            <span>{name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}