import './App.css';
import { useEffect } from 'react';
import { generateTraceId } from './utils/trace';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import { LogInPage } from './pages/LogInPage';
import { RequireAuth } from './components/RequireAuth/RequireAuth';
import { MainLayout } from './layouts/MainLayout/MainLayout';
import { WelcomePage } from './pages/WelcomePage';
import { UnauthorizedPage } from './pages/UnauthorizedPage';
import { ETBlogOverviewPage } from './pages/ETBlogManagementPage/ETBlogOverviewPage';
import { ETBlogFormPage } from './pages/ETBlogManagementPage/ETBlogFormPage';
import { ActivitiesFormPage } from './pages/ActivitiesManagementPage/ActivitiesFormPage';
import { ActivitiesOverviewPage } from './pages/ActivitiesManagementPage/ActivitiesOverviewPage';
import { FAQsOverviewPage } from './pages/FAQsManagementPages/FAQsOverviewPage';
import { FAQsFormPage } from './pages/FAQsManagementPages/FAQsFormPage';
import { FAQsSelectionPage } from './pages/FAQsSelectionPage'
import { PersonnelOverviewPage } from './pages/PersonnelManagementPage/PersonnelOverviewPage';
import { PersonnelFormPage } from './pages/PersonnelManagementPage/PersonnelFormPage';
import { AccountsFormPage } from './pages/AccountsManagementPage/AccountsFormPage';
import { AccountsOverviewPage } from './pages/AccountsManagementPage/AccountsOverviewPage';
import { PersonalProfilePage } from './pages/PersonalProfilePage';
import { PartnersOverviewPage } from './pages/PartnersManagementPage/PartnersOverviewPage';
import { PartnersFormPage } from './pages/PartnersManagementPage/PartnersFormPage';
import { AchievementsSelectionPage } from './pages/AchievementsSelectionPage'
import { PartnersSelectionPage } from './pages/PartnersSelectionPage';
import { BannersFormPage } from './pages/BannersManagementPage/BannersFormPage';
import { BannersOverviewPage } from './pages/BannersManagementPage/BannersOverviewPage';
import { ETNewsFormPage } from './pages/ETNewsManagementPage/ETNewsFormPage';
import { ETNewsOverviewPage } from './pages/ETNewsManagementPage/ETNewsOverviewPage';
import { CollaboratorsManagementPage } from './pages/CollaboratorsSeekingPage/CollaboratorsManagementPage';
import { CollaboratorsOverviewPage } from './pages/CollaboratorsSeekingPage/CollaboratorsOverviewPage';
// import { ComingSoonPage } from './pages/ComingSoonPage';
import { ToastNotifier } from './components/ToastNotifier';

function App() {
  useEffect(() => {
    generateTraceId();
  }, []);

  return (
    <div className="App">
      <AuthProvider>
        <ToastNotifier />
        <Router>
          <div className="root-container">
            <Routes>
              {/* CATCH-ALL ROUTE */}
              <Route path="*" element={<Navigate to="/" replace />} />
              {/* PUBLIC ROUTE */}
              <Route path="/login" element={<LogInPage />} />

              {/* PROTECTED ROUTES */}
              <Route element={<MainLayout />}>

                {/* PERSONAL INFO */}
                <Route path="/unauthorized"
                  element={
                    <RequireAuth path="/unauthorized">
                      <UnauthorizedPage />
                    </RequireAuth>
                  }
                />

                <Route path="/"
                  element={
                    <RequireAuth path="/">
                      <WelcomePage />
                    </RequireAuth>
                  }
                />

                <Route path="/profile"
                  element={
                    <RequireAuth path="/profile">
                      <PersonalProfilePage />
                    </RequireAuth>
                  }
                />

                {/* ACCOUNT */}
                <Route path="/accounts"
                  element={
                    <RequireAuth path="/accounts">
                      <AccountsOverviewPage />
                    </RequireAuth>
                  }
                />

                <Route path="/accounts/create"
                  element={
                    <RequireAuth path="/accounts">
                      <AccountsFormPage action="create" />
                    </RequireAuth>
                  }
                />

                <Route path="/accounts"
                  element={
                    <RequireAuth path="/accounts/edit/:id">
                      <AccountsFormPage action="edit" />
                    </RequireAuth>
                  }
                />

                {/* PERSONNELS */}
                {/* Get Personnels */}
                <Route path="/colleague/tech"
                  element={
                    <RequireAuth path="/colleague/tech">
                      <PersonnelOverviewPage department_name="tech" />
                    </RequireAuth>
                  }
                />

                <Route path="/colleague/hr"
                  element={
                    <RequireAuth path="/colleague/hr">
                      <PersonnelOverviewPage department_name="hr" />
                    </RequireAuth>
                  }
                />

                <Route path="/colleague/event"
                  element={
                    <RequireAuth path="/colleague/event">
                      <PersonnelOverviewPage department_name="event" />
                    </RequireAuth>
                  }
                />

                <Route path="/colleague/fer"
                  element={
                    <RequireAuth path="/colleague/fer">
                      <PersonnelOverviewPage department_name="fer" />
                    </RequireAuth>
                  }
                />

                <Route path="/colleague/pr"
                  element={
                    <RequireAuth path="/colleague/pr">
                      <PersonnelOverviewPage department_name="pr" />
                    </RequireAuth>
                  }
                />

                {/* Change HR Personnels */}
                <Route path="/colleague/hr/create"
                  element={
                    <RequireAuth path="/colleague/hr/create">
                      <PersonnelFormPage action="create" department_name="hr" />
                    </RequireAuth>
                  }
                />

                <Route path="/colleague/hr/edit/:id"
                  element={
                    <RequireAuth path="/colleague/hr/edit/:id">
                      <PersonnelFormPage action="edit" department_name="hr" />
                    </RequireAuth>
                  }
                />

                {/* Change Tech Personnels */}
                <Route path="/colleague/tech/create"
                  element={
                    <RequireAuth path="/colleague/tech/create">
                      <PersonnelFormPage action="create" department_name="tech" />
                    </RequireAuth>
                  }
                />

                <Route path="/colleague/tech/edit/:id"
                  element={
                    <RequireAuth path="/colleague/tech/edit/:id">
                      <PersonnelFormPage action="edit" department_name="tech" />
                    </RequireAuth>
                  }
                />

                {/* Change PR Personnels */}
                <Route path="/colleague/pr/create"
                  element={
                    <RequireAuth path="/colleague/pr/create">
                      <PersonnelFormPage action="create" department_name="pr" />
                    </RequireAuth>
                  }
                />

                <Route path="/colleague/pr/edit/:id"
                  element={
                    <RequireAuth path="/colleague/pr/edit/:id">
                      <PersonnelFormPage action="edit" department_name="pr" />
                    </RequireAuth>
                  }
                />

                {/* Change EV Personnels */}
                <Route path="/colleague/event/create"
                  element={
                    <RequireAuth path="/colleague/event/create">
                      <PersonnelFormPage action="create" department_name="event" />
                    </RequireAuth>
                  }
                />

                <Route path="/colleague/event/edit/:id"
                  element={
                    <RequireAuth path="/colleague/event/edit/:id">
                      <PersonnelFormPage action="edit" department_name="event" />
                    </RequireAuth>
                  }
                />

                {/* Change FER Personnels */}
                <Route path="/colleague/fer/create"
                  element={
                    <RequireAuth path="/colleague/fer/create">
                      <PersonnelFormPage action="create" department_name="fer" />
                    </RequireAuth>
                  }
                />

                <Route path="/colleague/fer/edit/:id"
                  element={
                    <RequireAuth path="/colleague/fer/edit/:id">
                      <PersonnelFormPage action="edit" department_name="fer" />
                    </RequireAuth>
                  }
                />

                {/* PARTNER */}
                {/* Get Partners */}
                <Route path="/partners"
                  element={
                    <RequireAuth path="/partners">
                      <PartnersOverviewPage />
                    </RequireAuth>
                  }
                />

                {/* Change Partners */}
                <Route path="/partners/create"
                  element={
                    <RequireAuth path="/partners/create">
                      <PartnersFormPage action="create" />
                    </RequireAuth>
                  }
                />

                <Route path="/partners/edit/:id"
                  element={
                    <RequireAuth path="/partners/edit/:id">
                      <PartnersFormPage action="edit" />
                    </RequireAuth>
                  }
                />

                {/* HOMEPAGE */}
                <Route path="/homepage-achievements"
                  element={
                    <RequireAuth path="/homepage-achievements">
                      <AchievementsSelectionPage />
                    </RequireAuth>
                  }
                />

                <Route path="/homepage-partners"
                  element={
                    <RequireAuth path="/homepage-partners">
                      <PartnersSelectionPage />
                    </RequireAuth>
                  }
                />

                <Route path="/homepage-faqs"
                  element={
                    <RequireAuth path="/homepage-faqs">
                      <FAQsSelectionPage />
                    </RequireAuth>
                  }
                />

                <Route path="/homepage-banners"
                  element={
                    <RequireAuth path="/homepage-banners">
                      <BannersOverviewPage />
                    </RequireAuth>
                  }
                />

                <Route path="/homepage-banners/create"
                  element={
                    <RequireAuth path="/homepage-banners/create">
                      <BannersFormPage action="create" />
                    </RequireAuth>
                  }
                />

                <Route path="/homepage-banners/edit/:id"
                  element={
                    <RequireAuth path="/homepage-banners/edit/:id">
                      <BannersFormPage action="edit" />
                    </RequireAuth>
                  }
                />

                {/* FAQ */}
                {/* Get FAQs */}
                <Route path="/faqs"
                  element={
                    <RequireAuth path="/faqs">
                      <FAQsOverviewPage />
                    </RequireAuth>
                  }
                />

                {/* Change FAQs */}
                <Route path="/faqs/edit/:id"
                  element={
                    <RequireAuth path="/faqs/edit/:id">
                      <FAQsFormPage action="edit" />
                    </RequireAuth>
                  }
                />

                <Route path="/faqs/create"
                  element={
                    <RequireAuth path="/faqs/create">
                      <FAQsFormPage action="create" />
                    </RequireAuth>
                  }
                />

                {/* ACTIVITIES */}
                 <Route path="/activities"
                  element={
                    <RequireAuth path="/activities">
                      <ActivitiesOverviewPage />
                    </RequireAuth>
                  }
                />

                <Route path="/activities/edit/:id"
                  element={
                    <RequireAuth path="/activities/edit/:id">
                      <ActivitiesFormPage action="edit" />
                    </RequireAuth>
                  }
                />

                <Route path="/activities/create"
                  element={
                    <RequireAuth path="/activities/create">
                      <ActivitiesFormPage action="create" />
                    </RequireAuth>
                  }
                />

                {/* ET NEWS */}
                <Route path="/et-news"
                  element={
                    <RequireAuth path="/et-news">
                      <ETNewsOverviewPage />
                    </RequireAuth>
                  }
                />

                <Route path="/et-news/edit/:id"
                  element={
                    <RequireAuth path="/et-news/edit/:id">
                      <ETNewsFormPage action="edit" />
                    </RequireAuth>
                  }
                />

                <Route path="/et-news/create"
                  element={
                    <RequireAuth path="/et-news/create">
                      <ETNewsFormPage action="create" />
                    </RequireAuth>
                  }
                />

                {/* ET BLOG */}
                <Route path="/et-blog"
                  element={
                    <RequireAuth path="/et-blog">
                      <ETBlogOverviewPage />
                    </RequireAuth>
                  }
                />

                <Route path="/et-blog/edit/:id"
                  element={
                    <RequireAuth path="/et-blog/edit/:id">
                      <ETBlogFormPage action="edit" />
                    </RequireAuth>
                  }
                />

                <Route path="/et-blog/create"
                  element={
                    <RequireAuth path="/et-blog/create">
                      <ETBlogFormPage action="create" />
                    </RequireAuth>
                  }
                />

                {/* COLLABORATION */}
                <Route path="/collaborator/overview"
                  element={
                    <RequireAuth path="/collaborator/overview">
                      <CollaboratorsOverviewPage />
                    </RequireAuth>
                  }
                />

                <Route path="/collaborator/approve"
                  element={
                    <RequireAuth path="/collaborator/approve">
                      <CollaboratorsManagementPage isApprovingPage={true} />
                    </RequireAuth>
                  }
                />

                <Route path="/collaborator/archive"
                  element={
                    <RequireAuth path="/collaborator/archive">
                      <CollaboratorsManagementPage isApprovingPage={false} />
                    </RequireAuth>
                  }
                />
              </Route>
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
