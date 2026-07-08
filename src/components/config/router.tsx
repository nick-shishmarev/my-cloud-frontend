import { createBrowserRouter } from "react-router";
import { NotFoundPage } from "../pages/NotFoundPage";
import { LoginPage } from "../pages/login-register/loginpage";
import { RegisterPage } from "../pages/login-register/register";
import { MainPage } from "../pages/mainpage/mainpage";
import { MyCloud } from "../mycloud";
import { LogoutPage } from "../pages/login-register/logoutpage";
import { HomePage } from "../pages/homepage/homepage";
import { AdminPage } from "../pages/adminpage/adminpage";
import { UploadFilePage } from "../pages/file-upload/fileinputpage";

export const  router= createBrowserRouter([
  {
    path: "/",
    element: <MyCloud />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/main",
        element: <MainPage />,
      },
      {
        path: "/admin",
        element: <AdminPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/logout",
        element: <LogoutPage />,
      },
      {
        path: "/upload",
        element: <UploadFilePage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      }
    ]
  }
])