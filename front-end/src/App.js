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
import { ComingSoonPage } from './pages/ComingSoonPage';
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
              {/* Catch-all route */}
              <Route path="*" element={<Navigate to="/" replace />} />
              {/* Public route */}
              <Route path="/login" element={<LogInPage />} />

              {/* Protected routes */}
              <Route element={<MainLayout />}>
                {/* All roles */}
                <Route element={<RequireAuth allowedRoles={[
                  'Administrator', 'Trưởng ban Tech', 'Trưởng ban HR', 'Trưởng ban Event', 'Trưởng ban FER', 'Trưởng ban PR', 'CTV/TV'
                ]} />}>
                  {/* Unauthorized */}
                  <Route path="/unauthorized" element={<UnauthorizedPage />} />

                  <Route path="/" element={<WelcomePage />} />
                  <Route path="/profile" element={<PersonalProfilePage />} />
                </Route>

                {/* Activities Management */}
                <Route element={<RequireAuth allowedRoles={['Administrator', 'Trưởng ban HR', 'Trưởng ban Event', 'CTV/TV']} />}>
                  <Route path="/activities" element={<ActivitiesOverviewPage />} />
                  <Route path="/activities/create" element={<ActivitiesFormPage action="create" />} />
                  <Route path="/activities/edit/:id" element={<ActivitiesFormPage action="edit" />} />
                </Route>

                {/* ET News Management */}
                <Route element={<RequireAuth allowedRoles={['Administrator', 'Trưởng ban HR', 'CTV/TV']} />}>
                  <Route path="/et-news" element={<ETNewsOverviewPage />} />
                  <Route path="/et-news/create" element={<ETNewsFormPage action="create" />} />
                  <Route path="/et-news/edit/:id" element={<ETNewsFormPage action="edit" />} />
                </Route>

                {/* ET Blog Management */}
                <Route element={<RequireAuth allowedRoles={['Administrator', 'Trưởng ban HR', 'Trưởng ban Tech', 'CTV/TV']} />}>
                  <Route path="/et-blog" element={<ETBlogOverviewPage />} />
                  <Route path="/et-blog/create" element={<ETBlogFormPage action="create" />} />
                  <Route path="/et-blog/edit/:id" element={<ETBlogFormPage action="edit" />} />
                </Route>

                {/* Account Management */}
                <Route element={<RequireAuth allowedRoles={['Administrator']} />}>
                  <Route path="/accounts" element={<AccountsOverviewPage />} />
                  <Route path="/accounts/create" element={<AccountsFormPage action="create" />} />
                  <Route path="/accounts/edit/:id" element={<AccountsFormPage action="edit" />} />
                </Route>

                {/* Except CTV/TV */}
                <Route element={<RequireAuth allowedRoles={[
                  'Administrator', 'Trưởng ban Tech', 'Trưởng ban HR', 'Trưởng ban Event', 'Trưởng ban FER', 'Trưởng ban PR'
                ]} />}>
                  <Route path="/collaborator/overview" element={<CollaboratorsOverviewPage />} />
                  <Route path="/collaborator/approve" element={<CollaboratorsManagementPage isApprovingPage={true} />} />
                  <Route path="/collaborator/archive" element={<CollaboratorsManagementPage isApprovingPage={false} />} />

                  <Route path="/colleague/tech" element={<PersonnelOverviewPage department_name="tech" />} />
                  <Route path="/colleague/hr" element={<PersonnelOverviewPage department_name="hr" />} />
                  <Route path="/colleague/event" element={<PersonnelOverviewPage department_name="event" />} />
                  <Route path="/colleague/fer" element={<PersonnelOverviewPage department_name="fer" />} />
                  <Route path="/colleague/pr" element={<PersonnelOverviewPage department_name="pr" />} />
                </Route>

                {/* Head Tech */}
                <Route element={<RequireAuth allowedRoles={['Administrator', 'Trưởng ban Tech']} />}>
                  <Route path="/colleague/tech/create" element={<PersonnelFormPage action="create" department_name="tech" />} />
                  <Route path="/colleague/tech/edit/:id" element={<PersonnelFormPage action="edit" department_name="tech" />} />
                </Route>

                {/* Head PR */}
                <Route element={<RequireAuth allowedRoles={['Administrator', 'Trưởng ban PR']} />}>
                  <Route path="/colleague/pr/create" element={<PersonnelFormPage action="create" department_name="pr" />} />
                  <Route path="/colleague/pr/edit/:id" element={<PersonnelFormPage action="edit" department_name="pr" />} />

                  <Route path="/homepage-achievements" element={<AchievementsSelectionPage />} />
                  <Route path="/homepage-partners" element={<PartnersSelectionPage />} />
                  <Route path="/homepage-faqs" element={<FAQsSelectionPage />} />
                  <Route path="/homepage-banners" element={<BannersOverviewPage />} />
                  <Route path="/homepage-banners/create" element={<BannersFormPage action="create" />} />
                  <Route path="/homepage-banners/edit/:id" element={<BannersFormPage action="edit" />} />

                  <Route path="/faqs" element={<FAQsOverviewPage />} />
                  <Route path="/faqs/edit/:id" element={<FAQsFormPage action="edit" />} />
                  <Route path="/faqs/create" element={<FAQsFormPage action="create" />} />
                </Route>

                {/* Head Event */}
                <Route element={<RequireAuth allowedRoles={['Administrator', 'Trưởng ban Event']} />}>
                  <Route path="/colleague/event/create" element={<PersonnelFormPage action="create" department_name="event" />} />
                  <Route path="/colleague/event/edit/:id" element={<PersonnelFormPage action="edit" department_name="event" />} />
                </Route>

                {/* Head FER */}
                <Route element={<RequireAuth allowedRoles={['Administrator', 'Trưởng ban FER']} />}>
                  <Route path="/colleague/fer/create" element={<PersonnelFormPage action="create" department_name="fer" />} />
                  <Route path="/colleague/fer/edit/:id" element={<PersonnelFormPage action="edit" department_name="fer" />} />

                  <Route path="/partners" element={<PartnersOverviewPage />} />
                  <Route path="/partners/create" element={<PartnersFormPage action="create" />} />
                  <Route path="/partners/edit/:id" element={<PartnersFormPage action="edit" />} />

                </Route>

                {/* Head HR */}
                <Route element={<RequireAuth allowedRoles={['Administrator', 'Trưởng ban HR']} />}>
                  <Route path="/colleague/hr/create" element={<PersonnelFormPage action="create" department_name="hr" />} />
                  <Route path="/colleague/hr/edit/:id" element={<PersonnelFormPage action="edit" department_name="hr" />} />
                </Route>
              </Route>
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
