import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Landing from "../pages/Landing/Landing";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Notifications from "../pages/Notifications/Notifications";
import Home from "../pages/Home/Home";
import Explore from "../pages/Explore/Explore";
import Showcase from "../pages/Showcase/Showcase";
import Chat from "../pages/Chat/Chat";
import Profile from "../pages/Profile/Profile";
import Settings from "../pages/Settings/Settings";
import MembersList from "../pages/Chat/members";
import NotFound from "../pages/NotFound";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import DashboardLayout from "../components/layout/DashboardLayout";

const AppRouter = () => {
  return (
    <Router>
      {/* Navbar + Footer only for public pages */}
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Landing />
              <Footer />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Login />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <Register />
            </>
          }
        />

        {/* Dashboard Routes (Sidebar + Workspace) */}
        <Route
          path="/home"
          element={
            <DashboardLayout>
              <Home />
            </DashboardLayout>
          }
        />

          <Route
          path="/members"
          element={
            <DashboardLayout>
              <MembersList/>
            </DashboardLayout>
          }
        />

        <Route
          path="/explore"
          element={
            <DashboardLayout>
              <Explore />
            </DashboardLayout>
          }
        />
        <Route
          path="/chat"
          element={
            <DashboardLayout>
              <Chat />
            </DashboardLayout>
          }
        />
        <Route
          path="/showcase"
          element={
            <DashboardLayout>
              <Showcase />
            </DashboardLayout>
          }
        />
        <Route
          path="/notifications"
          element={
            <DashboardLayout>
              <Notifications />
            </DashboardLayout>
          }
        />
        <Route
          path="/profile"
          element={
            <DashboardLayout>
              <Profile />
            </DashboardLayout>
          }
        />
        <Route
          path="/settings"
          element={
            <DashboardLayout>
              <Settings />
            </DashboardLayout>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
