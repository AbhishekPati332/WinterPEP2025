import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

// Import components
import Login from './pages/Login';
import Register from './pages/Register';
import Hospitals from './pages/Hospitals';
import HospitalCreate from './pages/HospitalCreate';
import HospitalEdit from './pages/HospitalEdit';
import HospitalDetails from './pages/HospitalDetails';
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/hospitals" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route element={<Layout />}>
            <Route element={<PrivateRoute />}>
              <Route path="/hospitals" element={<Hospitals />} />
              <Route path="/hospitals/create" element={<HospitalCreate />} />
              <Route path="/hospitals/:id" element={<HospitalDetails />} />
              <Route path="/hospitals/:id/edit" element={<HospitalEdit />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
