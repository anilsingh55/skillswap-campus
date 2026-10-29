/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { ToastContainer } from './components/common/ToastContainer';
import { Navbar } from './components/layout/Navbar';
import { MobileNav } from './components/layout/MobileNav';
import { Footer } from './components/layout/Footer';

import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { MatchesPage } from './pages/MatchesPage';
import { DashboardPage } from './pages/DashboardPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { AuthModal } from './pages/AuthModal';

import { StudentDetailModal } from './components/students/StudentDetailModal';
import { SendRequestModal } from './components/requests/SendRequestModal';
import { RequestActionModal } from './components/requests/RequestActionModal';
import { ReviewModal } from './components/reviews/ReviewModal';
import { ReportModal } from './components/students/ReportModal';
import { ExportGuideModal } from './components/github/ExportGuideModal';

import { Student, SessionRequest } from './types';
import { SafetyService } from './services/safetyService';

const MainAppContent: React.FC = () => {
  const { currentStudent, isAuthenticated, refresh } = useAuth();

  // Navigation tab state
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [initialSearchQuery, setInitialSearchQuery] = useState<string>('');

  // Modal states
  const [selectedStudentForDetail, setSelectedStudentForDetail] = useState<Student | null>(null);
  const [selectedStudentForSwap, setSelectedStudentForSwap] = useState<Student | null>(null);
  const [selectedStudentForReport, setSelectedStudentForReport] = useState<Student | null>(null);
  const [activeRequestForAction, setActiveRequestForAction] = useState<SessionRequest | null>(null);
  const [activeRequestForReview, setActiveRequestForReview] = useState<SessionRequest | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isExportGuideOpen, setIsExportGuideOpen] = useState<boolean>(false);

  // Handlers
  const handleViewProfile = (student: Student) => {
    setSelectedStudentForDetail(student);
  };

  const handleRequestSwap = (student: Student) => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }
    setSelectedStudentForSwap(student);
  };

  const handleReportStudent = (student: Student) => {
    setSelectedStudentForReport(student);
  };

  const handleBlockStudent = (student: Student) => {
    if (!currentStudent) return;
    SafetyService.blockStudent(currentStudent.id, student.id);
    refresh();
  };

  const handleOpenActionModal = (request: SessionRequest) => {
    setActiveRequestForAction(request);
  };

  const handleOpenReviewModal = (request: SessionRequest) => {
    setActiveRequestForReview(request);
  };

  const handleSearchSkillFromHome = (skill: string) => {
    setInitialSearchQuery(skill);
    setCurrentTab('explore');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      
      {/* Toast Alert Container */}
      <ToastContainer />

      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenExportGuide={() => setIsExportGuideOpen(true)}
      />

      {/* Main Page Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20 md:pb-10">
        {currentTab === 'home' && (
          <HomePage
            onSelectTab={setCurrentTab}
            onViewProfile={handleViewProfile}
            onRequestSwap={handleRequestSwap}
            onOpenAuth={() => setIsAuthModalOpen(true)}
            onSearchSkill={handleSearchSkillFromHome}
          />
        )}

        {currentTab === 'explore' && (
          <ExplorePage
            onViewProfile={handleViewProfile}
            onRequestSwap={handleRequestSwap}
            initialSearchQuery={initialSearchQuery}
            onClearInitialSearch={() => setInitialSearchQuery('')}
          />
        )}

        {currentTab === 'matches' && (
          <MatchesPage
            onViewProfile={handleViewProfile}
            onRequestSwap={handleRequestSwap}
            onSelectTab={setCurrentTab}
            onOpenAuth={() => setIsAuthModalOpen(true)}
          />
        )}

        {currentTab === 'dashboard' && (
          <DashboardPage
            onSelectTab={setCurrentTab}
            onRequestAction={handleOpenActionModal}
            onOpenReview={handleOpenReviewModal}
          />
        )}

        {currentTab === 'profile' && (
          <ProfilePage />
        )}

        {currentTab === 'settings' && (
          <SettingsPage
            onOpenExportGuide={() => setIsExportGuideOpen(true)}
          />
        )}
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <MobileNav
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        onOpenAuth={() => setIsAuthModalOpen(true)}
      />

      {/* Footer */}
      <Footer
        onOpenExportGuide={() => setIsExportGuideOpen(true)}
        onSelectTab={setCurrentTab}
      />

      {/* Modals */}
      <StudentDetailModal
        student={selectedStudentForDetail}
        isOpen={!!selectedStudentForDetail}
        onClose={() => setSelectedStudentForDetail(null)}
        onRequestSwap={handleRequestSwap}
        onReportStudent={handleReportStudent}
        onBlockStudent={handleBlockStudent}
        isCurrentUser={currentStudent?.id === selectedStudentForDetail?.id}
      />

      <SendRequestModal
        targetStudent={selectedStudentForSwap}
        isOpen={!!selectedStudentForSwap}
        onClose={() => setSelectedStudentForSwap(null)}
        onRequestSent={() => {
          refresh();
          setCurrentTab('dashboard');
        }}
      />

      <RequestActionModal
        request={activeRequestForAction}
        isOpen={!!activeRequestForAction}
        onClose={() => setActiveRequestForAction(null)}
        onActionComplete={refresh}
        onOpenReviewModal={handleOpenReviewModal}
        currentUserId={currentStudent?.id || ''}
      />

      <ReviewModal
        request={activeRequestForReview}
        isOpen={!!activeRequestForReview}
        onClose={() => setActiveRequestForReview(null)}
        onReviewSubmitted={refresh}
      />

      <ReportModal
        student={selectedStudentForReport}
        isOpen={!!selectedStudentForReport}
        onClose={() => setSelectedStudentForReport(null)}
        onReportSuccess={refresh}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      <ExportGuideModal
        isOpen={isExportGuideOpen}
        onClose={() => setIsExportGuideOpen(false)}
      />

    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <MainAppContent />
      </ToastProvider>
    </AuthProvider>
  );
}
