/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ChefProfile from "./pages/ChefProfile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateProfile from "./pages/CreateProfile";
import ForgotPassword from "./pages/ForgotPassword";
import Favorites from "./pages/Favorites";
import ChefDashboard from "./pages/ChefDashboard";
import Personal from "./pages/Personal";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";

import { FavoritesProvider } from "./context/FavoritesContext";
import { BookingsProvider } from "./context/BookingsContext";
import { AuthProvider } from "./context/AuthContext";
import { LocationProvider } from "./context/LocationContext";
import { ReviewsProvider } from "./context/ReviewsContext";

export default function App() {
  return (
    <LocationProvider>
      <AuthProvider>
        <FavoritesProvider>
          <BookingsProvider>
            <ReviewsProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="chef/:id" element={<ChefProfile />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="create-profile" element={<CreateProfile />} />
                    <Route path="forgot-password" element={<ForgotPassword />} />
                    <Route path="favorites" element={<Favorites />} />
                    <Route path="dashboard" element={<ChefDashboard />} />
                    <Route path="personal" element={<Personal />} />
                    <Route path="about" element={<About />} />
                    <Route path="faq" element={<FAQ />} />
                    <Route path="terms" element={<Terms />} />
                    <Route path="privacy" element={<Privacy />} />
                  </Route>
                </Routes>
              </BrowserRouter>
            </ReviewsProvider>
          </BookingsProvider>
        </FavoritesProvider>
      </AuthProvider>
    </LocationProvider>
  );
}
