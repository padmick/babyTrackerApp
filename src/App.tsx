import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import ChildProfile from './pages/ChildProfile';
import FeedingTracker from './pages/FeedingTracker';
import SleepTracker from './pages/SleepTracker';
import Journal from './pages/Journal';
import Tasks from './pages/Tasks';
import Settings from './pages/Settings';
import Medications from './pages/Medications';
import EmergencyContacts from './pages/EmergencyContacts';
import NotFound from './pages/NotFound';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="/child/:id" element={<ChildProfile />} />
            <Route path="/child/:id/feeding" element={<FeedingTracker />} />
            <Route path="/child/:id/sleep" element={<SleepTracker />} />
            <Route path="/child/:id/journal" element={<Journal />} />
            <Route path="/child/:id/medications" element={<Medications />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/contacts" element={<EmergencyContacts />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        <Toaster position="top-right" />
      </Router>
    </QueryClientProvider>
  );
}

export default App;