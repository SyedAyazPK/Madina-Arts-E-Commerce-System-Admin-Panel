import SignInPage from './SignInPage';
import authRoles from '../../auth/authRoles';
import VerifyOTP from './VerifyOTP';
import LoginPage from './LoginPage';

const SignInConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false,
        },
        toolbar: {
          display: false,
        },
        footer: {
          display: false,
        },
        leftSidePanel: {
          display: false,
        },
        rightSidePanel: {
          display: false,
        },
      },
    },
  },
  auth: authRoles.onlyGuest,
  routes: [
    // {
    //   path: 'sign-in',
    //   element: <SignInPage />,
    // },
    {
      path: 'sign-in',
      element: <LoginPage />,
    },
    {
      path: 'sign-in/verify',
      element: <VerifyOTP />,
    },
  ],
};

export default SignInConfig;
