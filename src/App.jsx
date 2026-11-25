import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ResidentHome from './pages/ResidentHome';
import './App.css';

function App() {
  const [language, setLanguage] = useState('bikol');

  const handleOpenReportModal = () => {
    console.log('Report problem clicked');
  };

  return (
    <BrowserRouter>
      <div className="app-layout">
        <Navbar language={language} onLanguageChange={setLanguage} />

        <Routes>
          <Route path="/" element={<ResidentHome language={language} />} />
        </Routes>

        <Footer
          language={language}
          onOpenReportModal={handleOpenReportModal}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;