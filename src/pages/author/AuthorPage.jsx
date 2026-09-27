// Packages
import { useEffect } from "react";

// Components

// Logic

// Context

// Services

// Styles
import "./AuthorPage.css";

// Assets

export const AuthorPage = () => {
  useEffect(() => {
    document.title = "Author | Turing Explorer";
  }, []);

  const navigate = (e, url) => {
    e?.preventDefault();
    if (e?.button === 1) return window.open(url, "_blank");
    window.location.href = url;
  };

  return (
    <div className="page author-page">
      <div className="page-content">
        <div className="author-title">
          <img src="/images/pfp.png" alt="Daniel Davies" />
          <span>Daniel Davies</span>
        </div>
        <div className="author-links">
          {[
            { label: "Portfolio", url: "https://www.danieljdavies.com" },
            { label: "LinkedIn", url: "https://www.linkedin.com/in/daniel-james-davies/" },
          ]?.map((link, index) => (
            <a
              key={index}
              href={link?.url}
              rel="noopener noreferrer"
              onMouseDown={(e) => e?.preventDefault()}
              onClick={(e) => navigate(e, link?.url)}
              onAuxClick={(e) => navigate(e, link?.url)}
            >
              <button className="button">
                <span>{link?.label}</span>
              </button>
            </a>
          ))}
        </div>
        <div className="author-text">
          I'm deeply interested in maximising the probability of the best possible future for all.
          <br />
          Passionate about building AI systems responsibly to solve complex real-world problems.
        </div>
        <div className="author-subtitles">
          <div className="author-subtitle">
            <span>🥼</span>
            <span>Independent Mechanistic Interpretability Researcher</span>
          </div>
          <div className="author-subtitle">
            <span>👨‍💻</span>
            <span>AI Engineer / Founding Researcher at Projekt Rising</span>
          </div>
          <div className="author-subtitle">
            <span>🎓</span>
            <span>Artificial Intelligence MSc (Distinction) at Brunel University London</span>
          </div>
          <div className="author-subtitle">
            <span>🌍</span>
            <span>London, United Kingdom</span>
          </div>
        </div>
      </div>
    </div>
  );
};
