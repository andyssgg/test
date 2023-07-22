import './App.css';
import Navbar from './containers/navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Establishments from './containers/Establishments/Establishments';
import { createTheme, ThemeProvider } from '@mui/material';
import Cuisines from './containers/Cuisines/Cuisines';
import Home from './containers/Home/Home';
import Stalls from './containers/Stalls/Stalls';
import StallItems from './containers/Stall_Items/Stall_items';
import Login from './containers/Authentication/login';
import SignUp from './containers/Authentication/signup';
import Reviews from './containers/Reviews/Reviews';
import ReviewForm from './containers/Reviews/Forms';
import UserContext from "./UserContext"
import { useCookies } from 'react-cookie';
import { useState } from 'react';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Poppins',
      'sans-serif'
    ].join(','),
  },
});

function App() {
  const [cookies] = useCookies(['user']);
  const [user, setUser] = useState(cookies.user || null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/establishments" element={<Establishments />} />
              <Route path="/establishments/:id" element={<Stalls />} />
              <Route path="/establishments/:id/:stallId" element={<StallItems />} />
              <Route path="/cuisines" element={<Cuisines />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/review-form" element={<ReviewForm />} />
            </Routes>
          </Router>
        </div>
      </ThemeProvider>
    </UserContext.Provider>
  );
}

export default App;
