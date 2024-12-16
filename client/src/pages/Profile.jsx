import React, { useState } from 'react';
import { 
  User, MapPin, Calendar, 
  CreditCard, ShieldCheck, 
  Edit, Save, Lock, LogOut, 
  Wallet, Heart, Settings, 
  Ticket, FileText 
} from 'lucide-react';
import { useSelector } from 'react-redux';

const UserProfile = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, USA',
    joinDate: '2023-06-15',
    birthdate: '1990-05-20',
    nationality: 'United States',
    passport: 'A12345678'
  });
  const {user} = useSelector(state => state.auth)

  const [bookingHistory, setBookingHistory] = useState([
    {
      id: 1,
      package: 'Magical Maldives Escape',
      date: '2024-02-15',
      travelers: 2,
      amount: 3999,
      status: 'Confirmed'
    },
    {
      id: 2,
      package: 'European Grand Tour',
      date: '2024-07-10',
      travelers: 3,
      amount: 5499,
      status: 'Upcoming'
    }
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const renderProfileSection = () => {
    switch(activeSection) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold flex items-center">
                  <User className="mr-2 text-blue-500"/> Personal Information
                </h3>
                <button 
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-blue-600 flex items-center"
                >
                  {isEditing ? 'Cancel' : <><Edit className="mr-2"/> Edit</>}
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {isEditing ? (
                  <>
                    <div>
                      <label className="block text-gray-700 mb-2">Full Name</label>
                      <input 
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleInputChange}
                        className="w-full p-3 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Email</label>
                      <input 
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleInputChange}
                        className="w-full p-3 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Phone Number</label>
                      <input 
                        type="tel"
                        name="phone"
                        value={user.phone}
                        onChange={handleInputChange}
                        className="w-full p-3 border rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Location</label>
                      <input 
                        type="text"
                        name="location"
                        value={user.location}
                        onChange={handleInputChange}
                        className="w-full p-3 border rounded-lg"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <p className="text-gray-600">Full Name</p>
                      <p className="font-semibold">{user.name}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Email</p>
                      <p className="font-semibold">{user.email}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Phone Number</p>
                      <p className="font-semibold">{user.phone}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Location</p>
                      <p className="font-semibold">{user.location}</p>
                    </div>
                  </>
                )}
              </div>

              {isEditing && (
                <div className="mt-6 flex justify-end">
                  <button 
                    onClick={() => {
                      // Save logic would go here
                      setIsEditing(false);
                    }}
                    className="bg-blue-600 text-white px-6 py-3 rounded-full flex items-center"
                  >
                    <Save className="mr-2"/> Save Changes
                  </button>
                </div>
              )}
            </div>

            {/* Booking History */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-2xl font-semibold flex items-center mb-6">
                <Ticket className="mr-2 text-blue-500"/> Booking History
              </h3>

              <div className="space-y-4">
                {bookingHistory.map((booking) => (
                  <div 
                    key={booking.id} 
                    className="flex justify-between items-center p-4 border rounded-lg"
                  >
                    <div>
                      <p className="font-semibold">{booking.package}</p>
                      <p className="text-gray-600">
                        {booking.date} | {booking.travelers} Travelers
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-blue-700">${booking.amount}</p>
                      <span 
                        className={`
                          px-3 py-1 rounded-full text-xs
                          ${booking.status === 'Confirmed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'}
                        `}
                      >
                        {booking.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'security':
        return (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-2xl font-semibold flex items-center mb-6">
              <Lock className="mr-2 text-blue-500"/> Security Settings
            </h3>
            
            {/* Password Change */}
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Current Password</label>
                <input 
                  type="password"
                  className="w-full p-3 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">New Password</label>
                <input 
                  type="password"
                  className="w-full p-3 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Confirm New Password</label>
                <input 
                  type="password"
                  className="w-full p-3 border rounded-lg"
                />
              </div>
              
              <button className="bg-blue-600 text-white px-6 py-3 rounded-full">
                Change Password
              </button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center mb-8">
              <img 
                src="/api/placeholder/100/100" 
                alt="Profile" 
                className="w-16 h-16 rounded-full object-cover mr-4"
              />
              <div>
                <h2 className="text-xl font-bold">{userProfile.name}</h2>
                <p className="text-gray-600">{userProfile.email}</p>
              </div>
            </div>

            <nav className="space-y-2">
              {[
                { icon: <User />, label: 'Profile', section: 'profile' },
                { icon: <Lock />, label: 'Security', section: 'security' },
                { icon: <Ticket />, label: 'My Bookings', section: 'bookings' },
                { icon: <Heart />, label: 'Favorites', section: 'favorites' },
                { icon: <Settings />, label: 'Settings', section: 'settings' },
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

              <div className="border-t mt-4 pt-4">
                <button 
                  className="w-full flex items-center p-3 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <LogOut />
                  <span className="ml-3">Logout</span>
                </button>
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3">
            {renderProfileSection()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;