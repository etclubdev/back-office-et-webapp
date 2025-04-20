import './App.css';
import { useEffect } from 'react';
import { generateTraceId } from './utils/trace';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
// import { LogInPage } from './pages/LogInPage';
import { RequireAuth } from './components/RequireAuth/RequireAuth';
import { MainLayout } from './layouts/MainLayout/MainLayout';
import { WelcomePage } from './pages/WelcomePage';
import { UnauthorizedPage } from './pages/UnauthorizedPage';
import { ETNewsFormPage } from './pages/ETNewsManagementPage/ETNewsFormPage';
import { ETNewsOverviewPage } from './pages/ETNewsManagementPage/ETNewsOverviewPage';

function App() {
  useEffect(() => {
    generateTraceId();
  }, []);

  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <div className="root-container">
            <Routes>
              {/* Catch-all route */}
              <Route path="*" element={<Navigate to="/" replace />} />
              {/* Public route */}
              {/* <Route path="/login" element={<LogInPage />} /> */}

              {/* Protected routes */}
              <Route element={<MainLayout />}>
                {/* All roles */}
                <Route element={<RequireAuth />}>
                  <Route path="/" element={<WelcomePage />} />
                  {/* <Route path="/profile" element={<PersonalProfilePage />} /> */}
                  {/* <Route path="/collaborator-status" element={<CollaboratorStatusPage />} />
                  <Route path="/collaborator-archive" element={<CollaboratorArchivePage />} />*/}
                  <Route path="/et-news" element={<ETNewsOverviewPage />} />
                  <Route path="/et-news/create" element={<ETNewsFormPage action="create" />} />
                  <Route path="/et-news/edit/:id" element={<ETNewsFormPage action="edit" />} />
                </Route>

                {/* Account Management */}
                <Route element={<RequireAuth allowedRoles={['Administrator']} />}>
                  {/* <Route path="/accounts" element={<WelcomePage />} /> 
                  <Route path="/accounts/create" element={<AccountsFormPage action="create" />} />
                  <Route path="/accounts/edit/:id" element={<AccountsFormPage action="edit" />} /> */}
                </Route>

                {/* Except CTV/TV */}
                <Route element={<RequireAuth allowedRoles={[
                  'Administrator', 'Trưởng ban Tech', 'Trưởng ban HR', 'Trưởng ban Event', 'Trưởng ban FER', 'Trưởng ban PR'
                ]} />}>
                  {/* <Route path="/tech" element={<PersonnelOverviewPage department_name="tech" />} />
                  <Route path="/hr" element={<PersonnelOverviewPage department_name="hr" />} />
                  <Route path="/event" element={<PersonnelOverviewPage department_name="event" />} />
                  <Route path="/fer" element={<PersonnelOverviewPage department_name="fer" />} />
                  <Route path="/pr" element={<PersonnelOverviewPage department_name="pr" />} /> */}
                </Route>

                {/* Head Tech */}
                <Route element={<RequireAuth allowedRoles={['Administrator', 'Trưởng ban Tech']} />}>
                  {/* <Route path="/tech/create" element={<PersonnelFormPage action="create" department_name="tech" />} />
                  <Route path="/tech/edit/:id" element={<PersonnelFormPage action="edit" department_name="tech" />} /> */}
                </Route>

                {/* Head PR */}
                <Route element={<RequireAuth allowedRoles={['Administrator', 'Trưởng ban PR']} />}>
                  {/*<Route path="/pr/create" element={<PersonnelFormPage action="create" department_name="pr" />} />
                  <Route path="/pr/edit/:id" element={<PersonnelFormPage action="edit" department_name="pr" />} 

                  <Route path="/homepage-faqs" element={<FAQsSelectionPage />} />

                  <Route path="/homepage-partners" element={<PartnersSelectionPage />} />

                  <Route path="/homepage-achievements" element={<AchievementsSelectionPage />} />

                  <Route path="/homepage-banners" element={<BannersOverviewPage />} />
                  <Route path="/homepage-banners/create" element={<BannersFormPage action="create" />} />
                  <Route path="/homepage-banners/edit/:id" element={<BannersFormPage action="edit" />} />

                  <Route path="/faqs" element={<FAQsOverviewPage />} />
                  <Route path="/faqs/edit/:id" element={<FAQsFormPage action="edit"/>} />
                  <Route path="/faqs/create" element={<FAQsFormPage action="create"/>} />
                  */}
                </Route>

                {/* Head Event */}
                <Route element={<RequireAuth allowedRoles={['Administrator', 'Trưởng ban Event']} />}>
                  {/*<Route path="/event/create" element={<PersonnelFormPage action="create" department_name="event" />} />
                  <Route path="/event/edit/:id" element={<PersonnelFormPage action="edit" department_name="event" />} /> */}
                </Route>

                {/* Head FER */}
                <Route element={<RequireAuth allowedRoles={['Administrator', 'Trưởng ban FER']} />}>
                  {/*<Route path="/fer/create" element={<PersonnelFormPage action="create" department_name="fer" />} />
                  <Route path="/fer/edit/:id" element={<PersonnelFormPage action="edit" department_name="fer" />} /> 
                  
                  <Route path="/partners" element={<PartnersOverviewPage />} />
                  <Route path="/partners/create" element={<PartnersFormPage action="create"/>} />
                  <Route path="/partners/edit/:id" element={<PartnersFormPage action="edit"/>} />
                  */}
                </Route>

                {/* Head HR */}
                <Route element={<RequireAuth allowedRoles={['Administrator', 'Trưởng ban HR']} />}>
                  {/*<Route path="/hr/create" element={<PersonnelFormPage action="create" department_name="hr" />} />
                  <Route path="/hr/edit/:id" element={<PersonnelFormPage action="edit" department_name="hr" />} /> */}
                </Route>

                {/* Unauthorized */}
                <Route path="/unauthorized" element={<UnauthorizedPage />} />
              </Route>
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
