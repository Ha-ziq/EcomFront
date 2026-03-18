import React, { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiShield, FiShoppingBag, FiSettings, FiLogOut } from 'react-icons/fi';

const Profile = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center pt-24">
        <p className="text-[#A3A3A3] mb-4">You need to log in to view this page.</p>
        <Link to="/" className="px-6 py-2 bg-[#3B82F6] text-white rounded-lg">Login</Link>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-24 pb-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-[#FAFAFA]">My Profile</h1>
          <p className="text-[#A3A3A3] text-sm mt-2">Manage your account settings and preferences.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column: User Card */}
          <div className="md:col-span-1 border border-[#262626] rounded-2xl bg-[#141414] p-6 flex flex-col items-center text-center sticky top-24">
            <div className="w-24 h-24 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 flex items-center justify-center text-[#3B82F6] text-4xl mb-6">
              <FiUser />
            </div>
            <h2 className="text-xl font-semibold text-[#FAFAFA] mb-1">{user.name || 'User'}</h2>
            <p className="text-[#A3A3A3] text-sm flex items-center gap-2 justify-center mb-6 truncate max-w-full px-2">
              <FiMail className="text-[#737373] flex-shrink-0" /> <span className="truncate">{user.email || 'No email provided'}</span>
            </p>
            
            <div className="w-full flex items-center justify-between py-3 border-t border-[#262626]">
              <span className="text-[#737373] text-xs uppercase tracking-wider font-semibold">Account Role</span>
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#1A1A1A] border border-[#262626] text-xs font-semibold text-[#FAFAFA] capitalize">
                <FiShield className={user.role === 'admin' ? "text-emerald-500" : "text-[#737373]"} />
                {user.role || 'customer'}
              </span>
            </div>
          </div>

          {/* Right Column: Actions */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <Link to="/MyOrders" className="flex items-center justify-between p-5 border border-[#262626] rounded-2xl bg-[#141414] hover:bg-[#1A1A1A] hover:border-[#3B82F6]/50 transition-colors group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 text-[#3B82F6] flex items-center justify-center group-hover:bg-[#3B82F6] group-hover:text-white transition-colors">
                  <FiShoppingBag size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-[#FAFAFA] mb-0.5">Order History</h3>
                  <p className="text-[#A3A3A3] text-sm">View and track your past orders</p>
                </div>
              </div>
              <div className="text-[#737373] group-hover:text-[#FAFAFA] transition-colors">&rarr;</div>
            </Link>

            <div className="flex items-center justify-between p-5 border border-[#262626] rounded-2xl bg-[#141414] opacity-60 cursor-not-allowed">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#262626] text-[#A3A3A3] flex items-center justify-center">
                  <FiSettings size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-[#FAFAFA] mb-0.5">Account Settings</h3>
                  <p className="text-[#A3A3A3] text-sm">Update your password & address (Coming soon)</p>
                </div>
              </div>
            </div>
            
            <button onClick={handleLogout} className="flex items-center justify-between p-5 border border-[#262626] rounded-2xl bg-[#141414] hover:bg-red-500/10 hover:border-red-500/30 transition-colors group mt-auto">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#1A1A1A] text-[#EF4444] border border-[#262626] flex items-center justify-center group-hover:bg-red-500 group-hover:text-white transition-colors">
                  <FiLogOut size={20} className="group-hover:text-white text-[#EF4444]" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-[#EF4444] mb-0.5">Sign Out</h3>
                  <p className="text-[#A3A3A3] text-sm">Securely log out of your device</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
