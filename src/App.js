import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./Component/Layout";
import HomePage from "./Pages/Home";
import SportsPage from "./Pages/Sports";
import VenuePage from "./Pages/Venue";
import QuizPage from "./Pages/Quiz";
import ContactPage from "./Pages/Contact";
import NotFoundPage from "./Pages/NotFound404";

import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        { }
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="quiz" element={<QuizPage />} />
          <Route path="sports" element={<SportsPage />} />
          <Route path="sports/:sport" element={<VenuePage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}