import { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ResidentHome from './pages/ResidentHome';
import FileComplaintStep1 from './pages/FileComplaintStep1';
import FileComplaintStep2 from './pages/FileComplaintStep2';
import FileComplaintStep3 from './pages/FileComplaintStep3';
import FileComplaintStep4 from './pages/FileComplaintStep4';
import FileComplaintStep5 from './pages/FileComplaintStep5';
import FileComplaintStep6 from './pages/FileComplaintStep6';
import FileComplaintSubmitted from './pages/FileComplaintSubmitted';
import TrackCase from './pages/TrackCase';
import TrackCaseResult from './pages/TrackCaseResult';
import LuponLogin from './pages/LuponLogin';
import LuponRegister from './pages/LuponRegister';
import LuponRegisterSubmitted from './pages/LuponRegisterSubmitted';
import LuponDashboard from './pages/LuponDashboard';
import LuponAllCases from './pages/LuponAllCases';
import LuponCaseView from './pages/LuponCaseView';
import LuponHearings from './pages/LuponHearings';
import LuponMembers from './pages/LuponMembers';
import LuponProfile from './pages/LuponProfile';
import LuponArchive from './pages/LuponArchive';
import LuponAbout from './pages/LuponAbout';
import './App.css';

function AppShell({ language, setLanguage }) {
  const location = useLocation();

  const handleOpenReportModal = () => {
    console.log('Report problem clicked');
  };

  const isLuponWorkspace =
    location.pathname.startsWith('/lupon-dashboard') ||
    location.pathname.startsWith('/lupon-cases') ||
    location.pathname.startsWith('/lupon-hearings') ||
    location.pathname.startsWith('/lupon-members') ||
    location.pathname.startsWith('/lupon-settings');

  // Show Footer only on Resident Home
  const showFooter = location.pathname === '/';

  return (
    <div className="app-layout">
      {!isLuponWorkspace && (
        <Navbar language={language} onLanguageChange={setLanguage} />
      )}

      <Routes>
        <Route path="/" element={<ResidentHome language={language} />} />
        <Route
          path="/file-complaint"
          element={<FileComplaintStep1 language={language} />}
        />
        <Route
          path="/file-complaint/step-2"
          element={<FileComplaintStep2 language={language} />}
        />
        <Route
          path="/file-complaint/step-3"
          element={<FileComplaintStep3 language={language} />}
        />
        <Route
          path="/file-complaint/step-4"
          element={<FileComplaintStep4 language={language} />}
        />
        <Route
          path="/file-complaint/step-5"
          element={<FileComplaintStep5 language={language} />}
        />
        <Route
          path="/file-complaint/step-6"
          element={<FileComplaintStep6 language={language} />}
        />
        <Route
          path="/file-complaint/submitted"
          element={<FileComplaintSubmitted language={language} />}
        />
        <Route
          path="/track-case"
          element={<TrackCase language={language} />}
        />
        <Route
          path="/track-case/status"
          element={<TrackCaseResult language={language} />}
        />
        <Route
          path="/lupon-login"
          element={<LuponLogin language={language} />}
        />
        <Route
          path="/lupon-register"
          element={<LuponRegister language={language} />}
        />
        <Route
          path="/lupon-register/submitted"
          element={<LuponRegisterSubmitted language={language} />}
        />
        <Route
          path="/lupon-dashboard"
          element={
            <LuponDashboard
              language={language}
              onLanguageChange={setLanguage}
            />
          }
        />
        <Route
          path="/lupon-cases"
          element={
            <LuponAllCases
              language={language}
              onLanguageChange={setLanguage}
            />
          }
        />
        <Route
          path="/lupon-cases/:caseId"
          element={
            <LuponCaseView
              language={language}
              onLanguageChange={setLanguage}
            />
          }
        />
        <Route
          path="/lupon-hearings"
          element={
            <LuponHearings
              language={language}
              onLanguageChange={setLanguage}
            />
          }
        />
        <Route
          path="/lupon-members"
          element={
            <LuponMembers
              language={language}
              onLanguageChange={setLanguage}
            />
          }
        />
        <Route
          path="/lupon-settings"
          element={
            <LuponProfile
              language={language}
              onLanguageChange={setLanguage}
            />
          }
        />
        <Route
          path="/lupon-settings/profile"
          element={
            <LuponProfile
              language={language}
              onLanguageChange={setLanguage}
            />
          }
        />
        <Route
          path="/lupon-settings/archive"
          element={
            <LuponArchive
              language={language}
              onLanguageChange={setLanguage}
            />
          }
        />
        <Route
          path="/lupon-settings/about"
          element={
            <LuponAbout
              language={language}
              onLanguageChange={setLanguage}
            />
          }
        />
      </Routes>

      {showFooter && (
        <Footer
          language={language}
          onOpenReportModal={handleOpenReportModal}
        />
      )}
    </div>
  );
}

function App() {
  const [language, setLanguage] = useState('bikol');

  return (
    <BrowserRouter>
      <AppShell language={language} setLanguage={setLanguage} />
    </BrowserRouter>
  );
}

export default App;