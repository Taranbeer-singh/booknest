import {createBrowserRouter} from "react-router-dom";
import App from "../App"
import Home from "../pages/home/home";
import Login from "../components/Login";
import Register from "../components/Register";
import CartPage from "../pages/books/CartPage";
import CheckoutPagee from "../pages/books/CheckoutPagee";
import SingleBook from "../pages/books/SingleBook";
import PrivateRoute from "./PrivateRoute";
import OrderPage from "../pages/books/OrderPage";
import AdminRoute from "./AdminRoute";
import AdminLogin from "../components/AdminLogin";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import ManageBooks from "../pages/dashboard/manageBooks/ManageBooks";
import AddBook from "../pages/dashboard/addBook/AddBook";
import UpdateBook from "../pages/dashboard/EditBook/UpdateBook";
import About from "../pages/About";
import LandingPage from "../pages/LandingPage";
import AllBooks from "../pages/books/AllBooks";
import WishlistPage from "../pages/Wishlist/WishlistPage";
import ReviewManagement from "../pages/dashboard/reviews/ReviewManagement";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
        {
            path: "/",
            element: <Home/>,
        },
        {
          path: "/orders",
          element: <PrivateRoute><OrderPage/></PrivateRoute>
        },
        {
          path: "/about",
          element: <About/>
        },
        {
          path: "/login",
          element: <Login/>
        },
        {
          path: "/register",
          element: <Register/>
        },
        {
         path: "/cart",
          element: <CartPage/> 
        },
        {
          path: "/checkout",
          element: <PrivateRoute><CheckoutPagee/></PrivateRoute>
        },
        {
          path: "/all-books",
          element: <AllBooks />,
      },
        {
          path: "/books/:id",
          element: <SingleBook/>
        },
        {
          path:"landingpage",
          element:<LandingPage/>
        },
        {
          path: "/wishlist",
          element: <WishlistPage />
        }
        
    ]
  },{
  path: "/admin",
  element: <AdminLogin />,
},

{
  path: "/dashboard",
  element: (
    <AdminRoute>
      <DashboardLayout />
    </AdminRoute>
  ),
  children: [
    {
      path: "",
      element: <Dashboard />,
    },
    {
      path: "add-new-book",
      element: <AddBook />,
    },
    {
      path: "edit-book/:id",
      element: <UpdateBook />,
    },
    {
      path: "manage-books",
      element: <ManageBooks />,
    },
    {
      path: "manage-reviews",
      element: <ReviewManagement />,
    },
    ],
  }
  ]);

export default router;