import { Navigate, useRoutes } from 'react-router-dom';
import HomePage from './pages/homepage';
import MainQuestionaire from './pages/questionaire/main';
import AddNewListing from './pages/listings/addNewLisitng';
import AddUserInList from './pages/listings/addUserInListing';
import Dashboard from './pages/dashboard/dashboard';
import MultiStepForm from './pages/questionaire/multistepForm/newQuestionaire';
import ResultPage from './pages/resultpage.js/resultpage';
import Login from './pages/LoginPages/login';
import SignUp from './pages/LoginPages/signup';
import MSFDemo from './pages/questionaire/multistepForm/multistepform';
import FormHandler from './pages/questionaire/multistepForm/newformhandler';
import FillTest from './pages/tester/filltest';
import Temp from './pages/questionaire/temp';
import CreateTest from './pages/Testee/MyTest/createTest';
import MailingPageIndex from './pages/mailingList/mailingListPage';
import SendTestFunctionality from './pages/questionaire/sendTestFunctionality';
import MailingPageUI from './pages/mailingList/components/mailingList';
import LandingPages from './pages/mailingList/components/mailingList';
import EditLandingPage from './pages/mailingList/editLandingPage';
export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <Dashboard />,
      children: [
        { element: <Navigate to="/dashboard" />, index: true },
        { path: 'mytest', element: <MainQuestionaire /> },
        { path: 'questionaire-history', element: <MainQuestionaire /> },
        { path: 'landing-pages', element: <LandingPages /> },
        { path: 'my-landing-pages', element: <MainQuestionaire /> },
        { path: 'my-mailing-list', element: <MainQuestionaire /> },

      ],
    },
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: '/questionare',
      element: <MainQuestionaire />,
    },
    {
      path: '/newlisting',
      element: <AddNewListing />,
    },
    {
      path: '/addusersinlisting',
      element: <AddUserInList />,
    },
    {
      path: '/newquestion',
      element: <MultiStepForm />,
    },
    {
      path: '/resultpage/*',
      element: <ResultPage />,
    },
    {
      path: '/login/:email?',
      element: <Login />,
    },
    {
      path: '/signup',
      element: <SignUp />,
    },
    {
      path: '/msf',
      element: <MSFDemo />,
    },
    {
      path: '/formhandler',
      element: <FormHandler />,
    },
    {
      path: '/filltest/*',
      element: <FillTest />,
    },
    {
      path: '/temp/*',
      element: <Temp />,
    },
    {
      path: '/dashboard/mytest/createtest',
      element: <CreateTest />
    },

    {
      path: '/dashboard/landingPage',
      element: <MailingPageIndex />
    },
    {
      path: '/dashboard/editLandingPage/:id?',
      element: <EditLandingPage />
    }
  ]);
  return routes;
}