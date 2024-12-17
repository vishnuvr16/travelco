const backendDomain = `${process.env.REACT_APP_API_URL}/api` || "http://localhost:8000/api";

const summaryApi = {
    register: {
        url: `${backendDomain}/auth/register`,
        method: "post"
    },
    login: {
        url: `${backendDomain}/auth/login`,
        method: "post"
    },
    logout: {
        url: `${backendDomain}/auth/logout`,
        method: "post"
    },
    getAllCustomers: {
        url: `${backendDomain}/auth/customers`,
        method: "get"
    },
    addTour: {
        url: `${backendDomain}/tours/add`,
        method: "post"
    },
    getAllTours: {
        url: `${backendDomain}/tours`,
        method: "get"
    },
    getBookings: {
        url: `${backendDomain}/bookings`,
        method: "get"
    },
    createBookings: {
        url: `${backendDomain}/bookings`,
        method: "post"
    },
    defaultUrl : backendDomain,

    
}

export default summaryApi;