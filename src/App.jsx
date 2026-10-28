import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import FilmsPage from './pages/FilmsPage';
import TalentPage from './pages/TalentPage';
import LocationsPage from './pages/LocationsPage';
import TeamPage from './pages/TeamPage';
import NewsPage from './pages/NewsPage';
import CareersPage from './pages/CareersPage';
import ContactPage from './pages/ContactPage';
import InvestorRelationsPage from './pages/InvestorRelationsPage';
import GovernancePage from './pages/GovernancePage';
import ProxyVotingPage from './pages/ProxyVotingPage';

// Modals
import TrailerModal from './components/modals/TrailerModal';
import FilmDetailModal from './components/modals/FilmDetailModal';
import InquiryModal from './components/modals/InquiryModal';
import StageBookingModal from './components/modals/StageBookingModal';
import TalentSubmissionModal from './components/modals/TalentSubmissionModal';
import JobApplicationModal from './components/modals/JobApplicationModal';
import ClientPortalModal from './components/modals/ClientPortalModal';

export default function App() {
  const [activePage, setActivePage] = useState('home');

  // Modals state
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [selectedTrailerFilm, setSelectedTrailerFilm] = useState(null);

  const [isFilmDetailOpen, setIsFilmDetailOpen] = useState(false);
  const [selectedDetailFilm, setSelectedDetailFilm] = useState(null);

  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [inquiryInitialService, setInquiryInitialService] = useState(null);

  const [isStageBookingOpen, setIsStageBookingOpen] = useState(false);
  const [stageBookingDefault, setStageBookingDefault] = useState(null);

  const [isTalentModalOpen, setIsTalentModalOpen] = useState(false);

  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const [isClientPortalOpen, setIsClientPortalOpen] = useState(false);

  // Handlers
  const handleScreenTrailer = (film) => {
    setSelectedTrailerFilm(film);
    setIsTrailerOpen(true);
  };

  const handleSelectFilm = (film) => {
    setSelectedDetailFilm(film);
    setIsFilmDetailOpen(true);
  };

  const handleOpenInquiry = (serviceName = null) => {
    setInquiryInitialService(serviceName);
    setIsInquiryOpen(true);
  };

  const handleOpenStageBooking = (stageName = null) => {
    setStageBookingDefault(stageName);
    setIsStageBookingOpen(true);
  };

  const handleOpenJobModal = (job) => {
    setSelectedJob(job);
    setIsJobModalOpen(true);
  };

  // Scroll to top on page change helper (called from pages that use setActivePage directly)
  const handleSetActivePage = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Page Routing
  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return (
          <HomePage
            setActivePage={handleSetActivePage}
            onOpenInquiry={handleOpenInquiry}
            onScreenTrailer={handleScreenTrailer}
            onSelectFilm={handleSelectFilm}
          />
        );
      case 'about':
        return (
          <AboutPage
            setActivePage={handleSetActivePage}
            onOpenInquiry={handleOpenInquiry}
          />
        );
      case 'services':
        return (
          <ServicesPage
            onOpenInquiry={handleOpenInquiry}
          />
        );
      case 'films':
        return (
          <FilmsPage
            onScreenTrailer={handleScreenTrailer}
            onSelectFilm={handleSelectFilm}
            onOpenInquiry={handleOpenInquiry}
          />
        );
      case 'talent':
        return (
          <TalentPage
            onOpenInquiry={handleOpenInquiry}
            onOpenTalentModal={() => setIsTalentModalOpen(true)}
          />
        );
      case 'locations':
        return (
          <LocationsPage
            onOpenInquiry={handleOpenInquiry}
            onOpenStageBooking={handleOpenStageBooking}
          />
        );
      case 'team':
        return (
          <TeamPage
            onOpenInquiry={handleOpenInquiry}
          />
        );
      case 'news':
        return (
          <NewsPage
            onOpenInquiry={handleOpenInquiry}
          />
        );
      case 'careers':
        return (
          <CareersPage
            onOpenJobModal={handleOpenJobModal}
          />
        );
      case 'contact':
        return <ContactPage />;
      case 'investor-relations':
        return (
          <InvestorRelationsPage
            setActivePage={handleSetActivePage}
            onOpenInquiry={handleOpenInquiry}
          />
        );
      case 'governance':
        return (
          <GovernancePage
            setActivePage={handleSetActivePage}
            onOpenProxyVoting={() => handleSetActivePage('proxy-voting')}
          />
        );
      case 'proxy-voting':
        return (
          <ProxyVotingPage
            setActivePage={handleSetActivePage}
          />
        );
      default:
        return (
          <HomePage
            setActivePage={handleSetActivePage}
            onOpenInquiry={handleOpenInquiry}
            onScreenTrailer={handleScreenTrailer}
            onSelectFilm={handleSelectFilm}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#07080a] text-zinc-100 flex flex-col font-sans selection:bg-orange-500/30 selection:text-amber-200">
      {/* Universal Fixed Header */}
      <Navbar
        activePage={activePage}
        setActivePage={handleSetActivePage}
        onOpenInquiry={handleOpenInquiry}
        onOpenClientPortal={() => setIsClientPortalOpen(true)}
      />

      {/* Main Dynamic View */}
      <main className="flex-1">
        {renderPage()}
      </main>

      {/* Universal Studio Footer */}
      <Footer
        setActivePage={handleSetActivePage}
        onOpenInquiry={handleOpenInquiry}
      />

      {/* Interactive Modals */}
      <TrailerModal
        film={selectedTrailerFilm}
        isOpen={isTrailerOpen}
        onClose={() => setIsTrailerOpen(false)}
      />

      <FilmDetailModal
        film={selectedDetailFilm}
        isOpen={isFilmDetailOpen}
        onClose={() => setIsFilmDetailOpen(false)}
        onScreenTrailer={handleScreenTrailer}
      />

      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        initialService={inquiryInitialService}
      />

      <StageBookingModal
        isOpen={isStageBookingOpen}
        onClose={() => setIsStageBookingOpen(false)}
        defaultStage={stageBookingDefault || undefined}
      />

      <TalentSubmissionModal
        isOpen={isTalentModalOpen}
        onClose={() => setIsTalentModalOpen(false)}
      />

      <JobApplicationModal
        isOpen={isJobModalOpen}
        onClose={() => setIsJobModalOpen(false)}
        job={selectedJob}
      />

      <ClientPortalModal
        isOpen={isClientPortalOpen}
        onClose={() => setIsClientPortalOpen(false)}
      />
    </div>
  );
}
