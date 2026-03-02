/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Splash from './pages/Splash';
import Onboarding from './pages/Onboarding';
import TestIntro from './pages/TestIntro';
import TestIntroConfirm from './pages/TestIntroConfirm';
import Test from './pages/Test';
import TestResult from './pages/TestResult';
import ChatInitial from './pages/ChatInitial';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Experts from './pages/Experts';
import Learning from './pages/Learning';
import Profile from './pages/Profile';
import Booking from './pages/Booking';
import Discover from './pages/Discover';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Splash />} />
          <Route path="onboarding" element={<Onboarding />} />
          <Route path="test-intro" element={<TestIntro />} />
          <Route path="test-intro-confirm" element={<TestIntroConfirm />} />
          <Route path="test" element={<Test />} />
          <Route path="test-result" element={<TestResult />} />
          <Route path="chat-initial" element={<ChatInitial />} />
          <Route path="home" element={<Home />} />
          <Route path="chat" element={<Chat />} />
          <Route path="experts" element={<Experts />} />
          <Route path="learning" element={<Learning />} />
          <Route path="profile" element={<Profile />} />
          <Route path="booking" element={<Booking />} />
          <Route path="discover" element={<Discover />} />
        </Route>
      </Routes>
    </Router>
  );
}
