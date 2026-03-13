
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Talepler from './pages/Talepler';
import TaleplerCreate from './pages/talepler/TaleplerCreate';
import Tracker from './pages/talepler/Tracker';
import Profile from './pages/Profile';
import Market from './pages/Market';

import SwapDetail from './pages/swap/SwapDetail';
import SwapCreate from './pages/swap/SwapCreate';
import MessagesPage from './pages/Messages';
import NotificationsPage from './pages/Notifications';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/app" element={<PrivateRoute />}>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="talepler">
                <Route index element={<Talepler />} />
                <Route path="create" element={<TaleplerCreate />} />
              </Route>
              <Route path="profile" element={<Profile />} />

              <Route path="market">
                <Route index element={<Market />} />
                <Route path="create" element={<SwapCreate />} />
                <Route path=":id" element={<SwapDetail />} />
              </Route>

              <Route path="messages">
                <Route index element={<MessagesPage />} />
                <Route path=":thread_id" element={<MessagesPage />} />
              </Route>

              <Route path="notifications" element={<NotificationsPage />} />
            </Route>

            {/* Fullscreen pages outside layout */}
            <Route path="tracker/:id" element={<Tracker />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
