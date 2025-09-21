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

import roles from './global/roles';

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
                <Route element={<RequireAuth allowedRoles={roles.managePersonalInfoRoles} />}>
                  {/* Unauthorized */}
                  <Route path="/unauthorized" element={<UnauthorizedPage />} />

                  {/* Welcome pages */}
                  <Route path="/" element={<WelcomePage />} />

                  {/* Personal Profile */}
                  <Route path="/profile" element={<PersonalProfilePage />} />
                </Route>

                {/* ACCOUNT */}
                <Route element={<RequireAuth allowedRoles={roles.manageAccountRoles} />}>
                  <Route path="/accounts" element={<AccountsOverviewPage />} />
                  <Route path="/accounts/create" element={<AccountsFormPage action="create" />} />
                  <Route path="/accounts/edit/:id" element={<AccountsFormPage action="edit" />} />
                </Route>

                {/* PERSONNELS */}
                {/* Get Personnels */}
                <Route element={<RequireAuth allowedRoles={roles.manageGetAllPersonnelsRoles} />}>
                  <Route path="/colleague/tech" element={<PersonnelOverviewPage department_name="tech" />} />
                  <Route path="/colleague/hr" element={<PersonnelOverviewPage department_name="hr" />} />
                  <Route path="/colleague/event" element={<PersonnelOverviewPage department_name="event" />} />
                  <Route path="/colleague/fer" element={<PersonnelOverviewPage department_name="fer" />} />
                  <Route path="/colleague/pr" element={<PersonnelOverviewPage department_name="pr" />} />
                </Route>

                {/* Change HR Personnels */}
                <Route element={<RequireAuth allowedRoles={roles.manageChangeHRPersonnelRoles} />}>
                  <Route path="/colleague/hr/create" element={<PersonnelFormPage action="create" department_name="hr" />} />
                  <Route path="/colleague/hr/edit/:id" element={<PersonnelFormPage action="edit" department_name="hr" />} />
                </Route>

                {/* Change Tech Personnels */}
                <Route element={<RequireAuth allowedRoles={roles.manageChangeTechPersonnelRoles} />}>
                  <Route path="/colleague/tech/create" element={<PersonnelFormPage action="create" department_name="tech" />} />
                  <Route path="/colleague/tech/edit/:id" element={<PersonnelFormPage action="edit" department_name="tech" />} />
                </Route>

                {/* Change PR Personnels */}
                <Route element={<RequireAuth allowedRoles={roles.manageChangePRPersonnelRoles} />}>
                  <Route path="/colleague/pr/create" element={<PersonnelFormPage action="create" department_name="pr" />} />
                  <Route path="/colleague/pr/edit/:id" element={<PersonnelFormPage action="edit" department_name="pr" />} />
                </Route>

                {/* Change EV Personnels */}
                <Route element={<RequireAuth allowedRoles={roles.manageChangeEVPersonnelRoles} />}>
                  <Route path="/colleague/event/create" element={<PersonnelFormPage action="create" department_name="event" />} />
                  <Route path="/colleague/event/edit/:id" element={<PersonnelFormPage action="edit" department_name="event" />} />
                </Route>

                {/* Change FER Personnels */}
                <Route element={<RequireAuth allowedRoles={roles.manageChangeFERPersonnelRoles} />}>
                  <Route path="/colleague/fer/create" element={<PersonnelFormPage action="create" department_name="fer" />} />
                  <Route path="/colleague/fer/edit/:id" element={<PersonnelFormPage action="edit" department_name="fer" />} />
                </Route>


                {/* PARTNER */}
                {/* Get Partners */}
                <Route element={<RequireAuth allowedRoles={roles.manageGetPartnerRoles} />}>
                  <Route path="/partners" element={<PartnersOverviewPage />} />
                </Route>

                {/* Change Partners */}
                <Route element={<RequireAuth allowedRoles={roles.manageChangePartnerRoles} />}>
                  <Route path="/partners/create" element={<PartnersFormPage action="create" />} />
                  <Route path="/partners/edit/:id" element={<PartnersFormPage action="edit" />} />
                </Route>

                {/* HOMEPAGE */}
                <Route element={<RequireAuth allowedRoles={roles.manageHomePageRoles} />}>
                  {/* Achievement */}
                  <Route path="/homepage-achievements" element={<AchievementsSelectionPage />} />

                  {/* Partner */}
                  <Route path="/homepage-partners" element={<PartnersSelectionPage />} />

                  {/* FAQs */}
                  <Route path="/homepage-faqs" element={<FAQsSelectionPage />} />

                  {/* Banners */}
                  <Route path="/homepage-banners" element={<BannersOverviewPage />} />
                  <Route path="/homepage-banners/create" element={<BannersFormPage action="create" />} />
                  <Route path="/homepage-banners/edit/:id" element={<BannersFormPage action="edit" />} />
                </Route>

                {/* FAQ */}
                {/* Get FAQs */}
                <Route element={<RequireAuth allowedRoles={roles.manageGetFAQRoles} />}>
                  <Route path="/faqs" element={<FAQsOverviewPage />} />
                </Route>

                {/* Change FAQs */}
                <Route element={<RequireAuth allowedRoles={roles.manageChangeFAQRoles} />}>
                  <Route path="/faqs/edit/:id" element={<FAQsFormPage action="edit" />} />
                  <Route path="/faqs/create" element={<FAQsFormPage action="create" />} />
                </Route>

                {/* ACTIVITIES */}
                <Route element={<RequireAuth allowedRoles={roles.manageActivityRoles} />}>
                  <Route path="/activities" element={<ActivitiesOverviewPage />} />
                  <Route path="/activities/create" element={<ActivitiesFormPage action="create" />} />
                  <Route path="/activities/edit/:id" element={<ActivitiesFormPage action="edit" />} />
                </Route>

                {/* ET NEWS */}
                <Route element={<RequireAuth allowedRoles={roles.manageEtNewsRoles} />}>
                  <Route path="/et-news" element={<ETNewsOverviewPage />} />
                  <Route path="/et-news/create" element={<ETNewsFormPage action="create" />} />
                  <Route path="/et-news/edit/:id" element={<ETNewsFormPage action="edit" />} />
                </Route>

                {/* ET BLOG */}
                <Route element={<RequireAuth allowedRoles={roles.manageEtBlogRoles} />}>
                  <Route path="/et-blog" element={<ETBlogOverviewPage />} />
                  <Route path="/et-blog/create" element={<ETBlogFormPage action="create" />} />
                  <Route path="/et-blog/edit/:id" element={<ETBlogFormPage action="edit" />} />
                </Route>

                {/* COLLABORATION */}
                <Route element={<RequireAuth allowedRoles={roles.manageCollaborationRoles} />}>
                  <Route path="/collaborator/overview" element={<CollaboratorsOverviewPage />} />
                  <Route path="/collaborator/approve" element={<CollaboratorsManagementPage isApprovingPage={true} />} />
                  <Route path="/collaborator/archive" element={<CollaboratorsManagementPage isApprovingPage={false} />} />
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
