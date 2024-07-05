import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';

const App: React.FC = () => {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
    </Router>
  );
};

export default App;

