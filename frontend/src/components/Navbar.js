import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MdDashboard, MdOutlineVolunteerActivism, MdPayment } from 'react-icons/md';
import { FiSettings, FiLogOut } from 'react-icons/fi';

const NavItem = ({ icon: Icon, label, active, onClick, className }) => (
  <li>
    <button
      onClick={onClick}
      className={`w-full flex items-center  space-x-5 px-4 py-3 rounded-lg transition-all ${
        active 
          ? 'bg-teal-500 text-white'
          : 'text-black hover:bg-teal-100'
      } ${className}`}
    >
      <Icon className={`w-8 h-8 ${active ? 'text-white' : 'text-gray-600'}`} />
      <span className="font-medium text-xl rye-regular">{label}</span>
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
    <nav className="w-64 bg-white z-20 shadow-xl border-r border-gray-200 fixed left-0 top-0 h-full flex flex-col">
      {/* Logo Section */}
      <div className="px-6 py-8">
        <h1 className="text-4xl font-bold text-black text-center kumar-one-regular">JEC</h1>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 rye-regular px-4">
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
          className="text-red-500 hover:bg-red-200"
        />
      </div>
    </nav>
  );
};

export default Navbar;