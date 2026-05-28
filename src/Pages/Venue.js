import { useParams, Link, Navigate } from "react-router-dom";
import { sportsData } from "../Pages/SportsData";

export default function VenuePage() {
    const { sport: sportParam } = useParams();

    const sportKey = Object.keys(sportsData).find(
        (k) => k.toLowerCase() === sportParam?.toLowerCase()
    );

    if (!sportKey) {
        return <Navigate to="/sports" replace />;
    }

    const sport = sportsData[sportKey];

    return (
        <div className="page">
            <Link to="/sports" className="back-btn">
                ← Back to Sports
            </Link>

            { }
            <div
                className="venue-hero"
                style={{ "--sport-emoji": `"${sport.emoji}"` }}
            >
                <div className="venue-hero-tag">{sportKey}</div>
                <h2>{sport.tagline}</h2>
                <p>{sport.description}</p>
                <div className="venue-tags-row">
                    {sport.tags.map((t) => (
                        <span key={t} className="venue-tag-chip">
                            {t}
                        </span>
                    ))}
                </div>
            </div>

            <h3 className="venues-section-title">Venues in Lebanon</h3>

            <div className="venues-grid">
                {sport.venues.map((v, i) => (
                    <div key={i} className="venue-card">
                        <div
                            className="venue-card-top"
                            style={{ background: sport.color }}
                        />
                        <div className="venue-card-body">
                            <div className="venue-card-name">{v.name}</div>
                            <div className="venue-info-row">
                                <span className="venue-info-icon">📍</span>
                                <span className="venue-info-text">{v.location}</span>
                            </div>
                            <div className="venue-info-row">
                                <span className="venue-info-icon">📞</span>
                                <span className="venue-phone">{v.phone}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}