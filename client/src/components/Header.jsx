import React, { useState,useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Menu, User, Search, X, ChevronDown, LogIn, LogInIcon, LogOutIcon } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import summaryApi from '../common';
import { loginAction, logoutAction } from '../redux/slices/authSlice';
import { Link } from 'react-router-dom';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto relative shadow-xl"
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        {children}
      </motion.div>
    </div>
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const { user } = useSelector(state => state.auth);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setFormData({
      fullName: '',
      email: '',
      password: ''
    });
  }, [activeTab]);

  const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'Tours', href: '/tours' },
  ];

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delayChildren: 0.2,
        staggerChildren: 0.1 
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
    setActiveTab('login');
  };

  const handleCloseModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const endpoint = activeTab === 'login' 
        ? summaryApi.login.url
        : summaryApi.register.url;

      const res = await fetch(endpoint, {
        credentials: "include",
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(activeTab === 'login' 
          ? { email: formData.email, password: formData.password }
          : formData
        )
      });

      if (!res.ok) {
        throw new Error("Authentication failed");
      }

      const dataApi = await res.json();
      dispatch(loginAction(dataApi));
      setIsLoginModalOpen(false)
      navigate('/');
    } catch (error) {
      console.error(error);
     
    }
  };

  const handleLogout = async () => {
    try {
      await fetch(summaryApi.logout.url, {
        credentials: "include",
        method: summaryApi.logout.method,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      dispatch(logoutAction());
      setIsMenuOpen(false)
      setIsProfileDropdownOpen(false)
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };


  const ProfileDropdown = () => (
    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border overflow-hidden">
      <div className="px-4 py-3 border-b">
        <p className="text-sm text-gray-500">Signed in as</p>
        <p className="font-medium text-gray-800 truncate">{user?.fullName || user?.email}</p>
      </div>
      <div className="py-1">
        <button 
          onClick={handleLogout}
          className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
        >
          <LogInIcon className="mr-3" size={18} />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      <motion.header 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm"
      >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <Globe className="text-blue-600" size={32} />
            <span className="text-2xl font-bold text-gray-900">TravelCo</span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <motion.ul 
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              className="flex space-x-8"
            >
              {menuItems.map((item, index) => (
                <motion.li 
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a 
                    href={item.href} 
                    className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
              {user?.role === "admin" && (
                <motion.li 
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a 
                  href="/admin"
                  className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                >
                    Admin
                </a>
              </motion.li>
              )}
            </motion.ul>

            {/* Header Actions */}
            <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg transition"
                >
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mr-2">
                    {user?.name ? user.name[0].toUpperCase() : <User size={18} />}
                  </div>
                  {user?.name?.split(" ")[0]}
                  <ChevronDown size={18} className="text-gray-500" />
                </button>
                {isProfileDropdownOpen && <ProfileDropdown />}
              </div>
            ) : (
              <>
                <button 
                  onClick={handleLoginClick}
                  className="text-gray-700 hover:text-blue-600 transition flex items-center space-x-2"
                >
                  <LogIn className="mr-2" size={18} /> Login
                </button>
              </>
            )}
          </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <motion.button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.95 }}
            className="md:hidden text-gray-700"
          >
            <Menu size={24} />
          </motion.button>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full bg-white shadow-lg md:hidden"
            >
              <ul className="py-4">
                {menuItems.map((item, index) => (
                  <li key={index} className="px-6 py-3 border-b">
                    <a 
                      href={item.href} 
                      className="text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
                <li className='px-6 py-3 border-b'>
                    {user?.role!="admin" && (
                        <a 
                        href="/admin"
                     className="text-gray-700 hover:text-orange-600 transition-colors flex items-center gap-2"
                   >
                     <span>Admin</span>
                   </a>
                    )}
                </li>
                <li className="px-6 py-3 flex space-x-4">
                 {user ? (
                     <button 
                     onClick={handleLogout}
                     className="text-red-700 hover:text-red-600 transition-colors flex items-center gap-2"
                   >
                     <LogOutIcon size={16} />
                     <span>Logout</span>
                   </button> 
                 ) : (
                    <button 
                    onClick={handleLoginClick}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                  >
                    <User size={16} />
                    <span>Login</span>
                  </button>
                 )}
                </li>
              </ul>
            </motion.div>
          )}
        </div>
      </motion.header>

      {/* Login/Register Modal */}
      <Modal isOpen={isLoginModalOpen} onClose={handleCloseModal}>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-center mb-4">
            Welcome to TravelCo
          </h2>
          <p className="text-center text-gray-500 mb-6">
            {activeTab === 'login' 
              ? 'Log in to your account' 
              : 'Create a new account'}
          </p>

          {/* Tabs */}
          <div className="flex border-b mb-6">
            <button
              className={`flex-1 py-2 ${
                activeTab === 'login' 
                  ? 'border-b-2 border-blue-600 text-blue-600' 
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('login')}
            >
              Login
            </button>
            <button
              className={`flex-1 py-2 ${
                activeTab === 'register' 
                  ? 'border-b-2 border-blue-600 text-blue-600' 
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('register')}
            >
              Register
            </button>
          </div>

          {/* Login Form */}
          {activeTab === 'login' && (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label 
                  htmlFor="email" 
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email
                </label>
                <input 
                  type="email" 
                  id="email"
                  value={formData.email}
                onChange={handleInputChange}
                  placeholder="you@example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required 
                />
              </div>
              <div>
                <label 
                  htmlFor="password" 
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <input 
                  type="password" 
                  id="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required 
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                Log In
              </button>
              <div className="text-center text-sm text-gray-500 mt-2">
                <a href="#" className="hover:underline">
                  Forgot Password?
                </a>
              </div>
            </form>
          )}

          {/* Register Form */}
          {activeTab === 'register' && (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label 
                  htmlFor="name" 
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Full Name
                </label>
                <input 
                  type="text" 
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required 
                />
              </div>
              <div>
                <label 
                  htmlFor="register-email" 
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email
                </label>
                <input 
                  type="email" 
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required 
                />
              </div>
              <div>
                <label 
                  htmlFor="register-password" 
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <input 
                  type="password" 
                  id="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required 
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                Create Account
              </button>
            </form>
          )}
        </div>
      </Modal>
    </>
  );
};

export default Header;