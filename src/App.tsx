
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import FindShare from './pages/FindShare';
import Supporters from './pages/Supporters';
import Profile from './pages/Profile';

import SwapList from './pages/swap/SwapList';
import SwapDetail from './pages/swap/SwapDetail';
import SwapCreate from './pages/swap/SwapCreate';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/app" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/app" element={<PrivateRoute />}>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="find-share" element={<FindShare />} />
              <Route path="supporters" element={<Supporters />} />
              <Route path="profile" element={<Profile />} />

              <Route path="swap">
                <Route index element={<SwapList />} />
                <Route path="create" element={<SwapCreate />} />
                <Route path=":id" element={<SwapDetail />} />
              </Route>
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
