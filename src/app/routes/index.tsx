import { lazy } from "react";
import { Routes, Route } from "react-router";

const Home = lazy(() => import("../../pages/Home"));
const Profile = lazy(() => import("../../pages/Profile"));
const AIAssistant = lazy(() => import("../../pages/AIAssistant"));
const BuyCourse = lazy(() => import("../../pages/BuyCourse"));
const Course = lazy(() => import("../../pages/Course"));

export default function RoutesComponent() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/ai-assistant" element={<AIAssistant />} />
      <Route path="/buy-access" element={<BuyCourse />} />
      <Route path="/course" element={<Course />} />
    </Routes>
  );
}
