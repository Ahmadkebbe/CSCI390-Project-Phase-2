import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { getMatches, sportsData, quizQuestions } from "./data/sportsData";

function renderAt(path = "/") {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>
  );
}

import HomePage    from "./pages/HomePage";
import SportsPage  from "./pages/SportsPage";
import QuizPage    from "./pages/QuizPage";
import ContactPage from "./pages/ContactPage";
import VenuePage   from "./pages/VenuePage";

function renderPage(Component, path = "/") {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Component />
    </MemoryRouter>
  );
}


describe("sportsData", () => {
  test("contains exactly 4 sports", () => {
    expect(Object.keys(sportsData)).toHaveLength(4);
  });

  test("each sport has all required fields", () => {
    Object.values(sportsData).forEach((sport) => {
      expect(sport).toHaveProperty("emoji");
      expect(sport).toHaveProperty("tagline");
      expect(sport).toHaveProperty("description");
      expect(sport).toHaveProperty("tags");
      expect(sport).toHaveProperty("color");
      expect(sport).toHaveProperty("venues");
    });
  });

  test("each sport has exactly 3 venues", () => {
    Object.values(sportsData).forEach((sport) => {
      expect(sport.venues).toHaveLength(3);
    });
  });

  test("every venue has name, location, and phone", () => {
    Object.values(sportsData).forEach((sport) => {
      sport.venues.forEach((venue) => {
        expect(venue.name.length).toBeGreaterThan(0);
        expect(venue.location.length).toBeGreaterThan(0);
        expect(venue.phone.length).toBeGreaterThan(0);
      });
    });
  });
});

describe("quizQuestions", () => {
  test("has 3 questions with ids: location, social, intensity", () => {
    expect(quizQuestions).toHaveLength(3);
    const ids = quizQuestions.map((q) => q.id);
    expect(ids).toEqual(["location", "social", "intensity"]);
  });

  test("each question has text and at least 2 options", () => {
    quizQuestions.forEach((q) => {
      expect(q.text.length).toBeGreaterThan(0);
      expect(q.options.length).toBeGreaterThanOrEqual(2);
    });
  });

  test("every option has value, label, and icon", () => {
    quizQuestions.forEach((q) => {
      q.options.forEach((opt) => {
        expect(opt).toHaveProperty("value");
        expect(opt).toHaveProperty("label");
        expect(opt).toHaveProperty("icon");
      });
    });
  });
});


describe("getMatches", () => {
  test("returns all 4 sports", () => {
    const result = getMatches({ location: "either", social: "either", intensity: "moderate" });
    expect(result).toHaveLength(4);
  });

  test("Football is top match for outdoor + team + high", () => {
    const result = getMatches({ location: "outdoor", social: "team", intensity: "high" });
    expect(result[0]).toBe("Football");
  });

  test("Swimming is top match for indoor + individual + low", () => {
    const result = getMatches({ location: "indoor", social: "individual", intensity: "low" });
    expect(result[0]).toBe("Swimming");
  });

  test("Tennis ranks highly for outdoor + individual + moderate", () => {
    const result = getMatches({ location: "outdoor", social: "individual", intensity: "moderate" });
    expect(result.indexOf("Tennis")).toBeLessThanOrEqual(1);
  });

  test("Basketball ranks highly for indoor + team + high", () => {
    const result = getMatches({ location: "indoor", social: "team", intensity: "high" });
    expect(result.indexOf("Basketball")).toBeLessThanOrEqual(1);
  });

  test("results are stable (deterministic)", () => {
    const a = { location: "outdoor", social: "team", intensity: "high" };
    expect(getMatches(a)).toEqual(getMatches(a));
  });
});


describe("HomePage", () => {
  test("renders hero headline", () => {
    renderPage(HomePage);
    expect(screen.getByText(/Find Your/i)).toBeInTheDocument();
    expect(screen.getByText(/Perfect Sport/i)).toBeInTheDocument();
  });

  test("renders Take the Quiz and Browse Sports links", () => {
    renderPage(HomePage);
    expect(screen.getByText(/Take the Quiz/i)).toBeInTheDocument();
    expect(screen.getByText(/Browse Sports/i)).toBeInTheDocument();
  });

  test("renders a pill for each sport", () => {
    renderPage(HomePage);
    Object.keys(sportsData).forEach((name) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });
});

describe("SportsPage", () => {
  test("renders All Sports heading", () => {
    renderPage(SportsPage);
    expect(screen.getByText("All Sports")).toBeInTheDocument();
  });

  test("renders a card for each sport", () => {
    renderPage(SportsPage);
    Object.keys(sportsData).forEach((name) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });
});

describe("VenuePage", () => {
  test("renders Football venues when given /sports/football", () => {
    renderPage(VenuePage, "/sports/football");
    expect(screen.getByText("Venues in Lebanon")).toBeInTheDocument();
    expect(screen.getByText("Aramoun Field")).toBeInTheDocument();
  });

  test("renders Tennis venues when given /sports/tennis", () => {
    renderPage(VenuePage, "/sports/tennis");
    expect(screen.getByText("Sports Avenue")).toBeInTheDocument();
  });

  test("is case-insensitive for sport param", () => {
    renderPage(VenuePage, "/sports/BASKETBALL");
    expect(screen.getByText("Sport Ville")).toBeInTheDocument();
  });
});

describe("QuizPage", () => {
  test("renders first question", () => {
    renderPage(QuizPage);
    expect(screen.getByText(/Question 1 of 3/i)).toBeInTheDocument();
    expect(screen.getByText(/Where do you prefer to train/i)).toBeInTheDocument();
  });

  test("renders all options for first question", () => {
    renderPage(QuizPage);
    expect(screen.getByText("Indoors")).toBeInTheDocument();
    expect(screen.getByText("Outdoors")).toBeInTheDocument();
    expect(screen.getByText("Doesn't matter")).toBeInTheDocument();
  });

  test("progress bar is present", () => {
    renderPage(QuizPage);
    expect(document.querySelector(".quiz-progress-bar")).toBeInTheDocument();
  });
});

describe("ContactPage", () => {
  test("renders heading and form fields", () => {
    renderPage(ContactPage);
    expect(screen.getByText("Contact Us")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Ali Hassan")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("ali@example.com")).toBeInTheDocument();
    expect(screen.getByText("Send Message")).toBeInTheDocument();
  });

  test("shows success state after submission", () => {
    renderPage(ContactPage);
    fireEvent.change(screen.getByPlaceholderText("Ali Hassan"),      { target: { value: "Test User" } });
    fireEvent.change(screen.getByPlaceholderText("ali@example.com"), { target: { value: "test@test.com" } });
    fireEvent.change(screen.getByPlaceholderText("Your message..."), { target: { value: "Hello!" } });
    fireEvent.click(screen.getByText("Send Message"));
    expect(screen.getByText(/Message sent/i)).toBeInTheDocument();
  });
});