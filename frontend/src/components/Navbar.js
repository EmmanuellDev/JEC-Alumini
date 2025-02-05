import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MdDashboard, MdOutlineVolunteerActivism, MdPayment } from 'react-icons/md';
import { FiSettings, FiLogOut } from 'react-icons/fi';

const NavItem = ({ icon: Icon, label, active, onClick, className }) => (
  <li>
    <button
      onClick={onClick}
      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
        active 
          ? 'bg-indigo-50 text-indigo-600'
          : 'text-gray-600 hover:bg-gray-50'
      } ${className}`}
    >
      <Icon className={`w-5 h-5 ${active ? 'text-indigo-600' : 'text-gray-400'}`} />
      <span className="font-medium">{label}</span>
    </button>
  </li>
);

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add your logout logic here
    console.log('Logging out...');
  };

  return (
    <nav className="w-64 bg-white shadow-xl border-r border-gray-100 fixed left-0 top-0 h-full flex flex-col">
      {/* Logo Section */}
      <div className="px-6 py-8">
        <h1 className="text-2xl font-bold text-indigo-600">JEC</h1>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 px-4">
        <ul className="space-y-2">
          <NavItem 
            icon={MdDashboard} 
            label="Dashboard"
            active={location.pathname === '/dashboard'}
            onClick={() => navigate("/dashboard")}
          />
          <NavItem
            icon={MdOutlineVolunteerActivism}
            label="Donate"
            active={location.pathname === '/donate'}
            onClick={() => navigate("/donate")}
          />
          <NavItem
            icon={MdPayment}
            label="Payments"
            active={location.pathname === '/payments'}
            onClick={() => navigate("/payments")}
          />
          <NavItem
            icon={FiSettings}
            label="Settings"
            active={location.pathname === '/settings'}
            onClick={() => navigate("/settings")}
          />
        </ul>
      </div>

      {/* Logout Section */}
      <div className="border-t border-gray-100 px-4 py-6">
        <NavItem
          icon={FiLogOut}
          label="Log Out"
          onClick={handleLogout}
          className="text-red-500 hover:bg-red-50"
        />
      </div>
    </nav>
  );
};

export default Navbar;