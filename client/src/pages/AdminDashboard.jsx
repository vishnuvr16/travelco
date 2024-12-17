import React, { useState ,useEffect } from 'react';
import { 
  Users, Package, DollarSign, 
  Calendar, ChevronDown, 
  BarChart, PieChart, ListOrdered, 
  Edit, Trash2, Plus, 
  IndianRupee
} from 'lucide-react';
import { Link } from 'react-router-dom';
import summaryApi from '../common';
import AddTour from './AddTour';
import BookingDetailsModal from '../components/BookingDetailsModel';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [loading,setLoading] = useState(false);
  const [tourPackages,setTourPackages] = useState([]);
  const [customers,setCustomers] = useState([]);
  const [bookings,setBookings] = useState([]);
  const [totalRevenue,setTotalRevenue] = useState(0);
  const [totalBookings,setTotalBookings] = useState(0);
  const [activePackages,setActivePackages] = useState(0);
  const [totalCustomers,setTotalCustomers] = useState(0);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const handleViewBookingDetails = (booking) => {
    setSelectedBooking(booking);
  };

  const handleCloseBookingModal = () => {
    setSelectedBooking(null);
  };


  useEffect(() => {
    const getAllCustomers = async() =>{
      try {
        const response = await fetch(summaryApi.getAllCustomers.url,{
          method: summaryApi.getAllCustomers.method,
          credentials: "include",
          headers: {
            'Content-Type': 'application/json'
          }
        })

        if(!response.ok){
          throw new Error(`Failed to fetch jobs: ${response.statusText}`)
        }

        const allCustomers = await response.json();
        setCustomers(allCustomers.response);
        setTotalCustomers(allCustomers.results)
      } catch (error) {
        console.log(error)
      }
    }
    getAllCustomers()
  },[])

  useEffect(() => {
    const getpackages = async () => {
      try {
        setLoading(true)
        const response = await fetch(summaryApi.getAllTours.url, {
          method: summaryApi.getAllTours.method,
          credentials: "include",
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch jobs: ${response.statusText}`);
        }

        const allPackages = await response.json();
        setTourPackages(allPackages.Tours);
        setActivePackages(allPackages.totalTours)
        setLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    getpackages();
  }, []);

  useEffect(()=> {
    const getAllBookings = async() =>{
      const response = await fetch(summaryApi.getBookings.url,{
        method: summaryApi.getBookings.method,
        credentials: "include",
        headers: {
          'Content-Type': "application/json"
        }
      })

      if(!response.ok){
        throw new Error("failed to fetch bookings");
      }

      const data = await response.json();
      const totalPrice = data.bookings.reduce((sum, booking) => sum + booking.price, 0);
      setTotalRevenue(totalPrice)
      setBookings(data.bookings);
      setTotalBookings(data.results)
    }
    getAllBookings();
  },[])

  const handleDeleteTour = async (tourId) => {
    if (!window.confirm('Are you sure you want to delete this tour package?')) {
      return;
    }

    try {
      const response = await fetch(`${summaryApi.deleteTour.url}/${tourId}`, {
        method: summaryApi.deleteTour.method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete tour package');
      }

      // Update the local state to remove the deleted tour
      setTourPackages(prev => prev.filter(pkg => pkg.id !== tourId));
      setActivePackages(prev => prev - 1);
      alert('Tour package deleted successfully!');
    } catch (error) {
      console.error('Error deleting tour:', error);
      alert('Failed to delete tour package. Please try again.');
    }
  };



  return (
    <div className="min-h-screen bg-gray-50 flex mt-20">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-8 text-blue-900">
          Travel Admin
        </h2>
        
        <nav className="space-y-2">
          {[
            { icon: <BarChart />, label: 'Dashboard', section: 'dashboard' },
            { icon: <Package />, label: 'Tour Packages', section: 'packages' },
            { icon: <ListOrdered />, label: 'Bookings', section: 'bookings' },
          ].map((item) => (
            <button
              key={item.section}
              className={`
                w-full flex items-center p-3 rounded-lg transition
                ${activeSection === item.section 
                  ? 'bg-blue-600 text-white' 
                  : 'hover:bg-blue-50 text-gray-700'}
              `}
              onClick={() => setActiveSection(item.section)}
            >
              {item.icon}
              <span className="ml-3">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        {/* Dashboard Section */}
        {activeSection === 'dashboard' && (
          <>
            {/* Dashboard Stats */}
            <div className="grid md:grid-cols-4 gap-6 mb-10">
              {[
                { 
                  icon: <IndianRupee />, 
                  label: 'Total Revenue', 
                  value: totalRevenue.toLocaleString()
                },
                { 
                  icon: <Package />, 
                  label: 'Active Packages', 
                  value: activePackages
                },
                { 
                  icon: <Calendar />, 
                  label: 'Total Bookings', 
                  value: totalBookings
                },
                { 
                  icon: <Users />, 
                  label: 'Customers', 
                  value: totalCustomers
                }
              ].map((stat, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-2xl shadow-md p-6 flex items-center"
                >
                  <div className="bg-blue-100 text-blue-600 rounded-full p-3 mr-4">
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">{stat.label}</p>
                    <h3 className="text-2xl font-bold text-blue-900">{stat.value}</h3>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Bookings */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Recent Bookings</h3>
                <button className="text-blue-600 flex items-center">
                  View All <ChevronDown className="ml-2"/>
                </button>
              </div>

              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 text-left">Booking ID</th>
                    <th className="p-3 text-left">Customer</th>
                    <th className="p-3 text-left">Package</th>
                    <th className="p-3 text-left">Tour Date</th>
                    <th className="p-3 text-left">Amount</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings?.map((booking) => (
                    <tr key={booking.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">#{booking.id}</td>
                      <td className="p-3">{booking.primaryCustomer.name}</td>
                      <td className="p-3">{booking.tour.name}</td>
                      <td className="p-3">{booking.tourDate.split("T")[0]}</td>
                      <td className="p-3">₹{booking.price}</td>
                      <td className="p-3">
                        <span className={`
                          px-3 py-1 rounded-full text-xs
                          ${booking.status === 'Confirmed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'}
                        `}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="p-3 flex space-x-2">
                        <button className="text-blue-600 hover:bg-blue-100 p-2 rounded">
                          <Edit size={18}/>
                        </button>
                        <button className="text-red-600 hover:bg-red-100 p-2 rounded">
                          <Trash2 size={18}/>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Tour Packages Section */}
        {activeSection === 'packages' && (
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">Tour Packages</h3>
              <Link to="add-tour" className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
                <Plus className="mr-2"/> Add Package
              </Link>
            </div>

            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-center">Package Name</th>
                  <th className="p-3 text-center">Price</th>
                  <th className="p-3 text-center">Duration</th>
                  <th className="p-3 text-center">Tour Dates</th>
                  <th className='p-3 text-center'>Location</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tourPackages.map((pkg) => (
                  <tr key={pkg.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 text-center">{pkg.name}</td>
                    <td className="p-3 text-center">${pkg.price}</td>
                    <td className="p-3 text-center">{pkg.duration}</td>
                    <td className="p-3 text-center">
                    {pkg?.availableDates?.map((item) => (
                      <p key={item}>{item.split("T")[0]}</p> 
                      ))}

                    </td>
                    <td className='p-3 text-center'>{pkg.destination}</td>
                    <td className="p-3 flex space-x-2 justify-center">
                    <Link 
                  to={`edit-tour/${pkg._id}`}
                  className="text-blue-600 hover:bg-blue-100 p-2 rounded"
                >
                  <Edit size={18}/>
                </Link>
                <button 
                  className="text-red-600 hover:bg-red-100 p-2 rounded"
                  onClick={() => handleDeleteTour(pkg._id)}
                >
                  <Trash2 size={18}/>
                </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Bookings Section */}
        {activeSection === 'bookings' && (
          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">All Bookings</h3>

            </div>

            <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-center">Booking ID</th>
                <th className="p-3 text-center">Customer</th>
                <th className="p-3 text-center">Package</th>
                <th className="p-3 text-center">Date</th>
                <th className="p-3 text-center">Amount</th>
                <th className="p-3 text-center">Phone</th>
                <th className="p-3 text-center">No.of Travelers</th>
                <th className='p-3 text-center'>Actions</th>
              </tr>
            </thead>
              <tbody>
              {bookings?.map((booking) => (
                <tr key={booking.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 text-center">#{booking.id}</td>
                  <td className="p-3 text-center">{booking.primaryCustomer.name}</td>
                  <td className="p-3 text-center">{booking.tour.name}</td>
                  <td className="p-3 text-center">{booking.tourDate.split("T")[0]}</td>
                  <td className="p-3 text-center">${booking.price}</td>
                  <td className="p-3 text-center">
                      {booking.primaryCustomer.phone}
                  </td>
                  <td className='p-3 text-center'>{booking.additionalTravelers.length + 1}</td>
                  <td className='p-3 text-center'>
                    <button 
                      onClick={() => handleViewBookingDetails(booking)}
                      className="text-blue-600 hover:underline"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            </table>
          </div>
        )}
         {selectedBooking && (
        <BookingDetailsModal 
          booking={selectedBooking} 
          onClose={handleCloseBookingModal} 
        />
      )}

      </div>
    </div>
  );
};

export default AdminDashboard;