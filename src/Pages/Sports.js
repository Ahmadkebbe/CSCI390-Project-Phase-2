import { Link } from "react-router-dom";
import { sportsData } from "../Pages/SportsData";

export default function SportsPage() {
  return (
    <div className="page">
      <h1 className="page-title">All Sports</h1>
      <p className="page-sub">
        Select a sport to see venues and registration info near you.
      </p>

      <div className="sports-grid">
        {Object.entries(sportsData).map(([name, s]) => (
          <Link
            key={name}
            to={`/sports/${name.toLowerCase()}`}
            className="sport-card"
            style={{ "--sport-color": s.color }}
          >
            <span className="sport-emoji">{s.emoji}</span>
            <div className="sport-name">{name}</div>
            <div className="sport-tagline">{s.tagline}</div>
            <div className="sport-tags">
              {s.tags.map((t) => (
                <span key={t} className="sport-tag">
                  {t}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}