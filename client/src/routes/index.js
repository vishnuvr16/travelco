import {createBrowserRouter} from "react-router-dom"
import App from "../App"
import HomePage from "../pages/HomePage"
import AdminDashboard from "../pages/AdminDashboard"
import TourDetails from "../pages/TourDetails"
import AddTour from "../pages/AddTour"
import TourPackages from "../pages/TourPackages"

const router = createBrowserRouter([
    {
        path: "",
        element: <App />,
        children: [
            {
                path: "",
                element: <HomePage />
            },
            {
                path: "/tours",
                element: <TourPackages />
            },
            {
                path: "/admin",
                element: <AdminDashboard />
            },
            {
                path: "/tours/:id",
                element: <TourDetails />
            },
            {
                path: "admin/add-tour",
                element: <AddTour />
            },
            {
                path: "admin/edit-tour/:tourId",
                element: <AddTour />
            }
        ]
    }
])

export default router