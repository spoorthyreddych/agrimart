import React from 'react';
import {
  LayoutDashboard, Tag, Tractor, ShoppingBag, MessageSquare, Bell, User, PlusCircle, ArrowUpRight
} from 'lucide-react';
import Badge from '../Badge';
import Button from '../Button';
import './DashboardSidebar.css';

export const DashboardSidebar = ({
  activeTab = 'overview',
  setActiveTab,
  user,
  metrics,
  onNavigate,
}) => {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'listings', label: 'My Listings', icon: Tag, badge: metrics?.myListingsCount },
    { id: 'rentals', label: 'Rental Activity', icon: Tractor, badge: metrics?.activeRentalsCount },
    { id: 'requests', label: 'Purchase Requests', icon: ShoppingBag, badge: metrics?.purchaseRequestsCount },
    { id: 'messages', label: 'Messages', icon: MessageSquare, badge: metrics?.unreadMessagesCount, badgeVariant: 'accent' },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'profile', label: 'My Profile', icon: User },
  ];

  return (
    <aside className="agri-dashboard-sidebar" aria-label="Dashboard Sidebar Navigation">
      {/* User Profile Summary Card */}
      <div className="agri-sidebar-user-card">
        <div className="agri-sidebar-avatar">
          {user?.avatar || '🌾'}
        </div>
        <div className="agri-sidebar-user-info">
          <h3 className="agri-sidebar-user-name">{user?.name || 'Ramesh Kumar'}</h3>
          <div className="agri-sidebar-user-role-row">
            <Badge variant="success">{user?.role || 'Farmer'}</Badge>
            <span className="agri-sidebar-verified" title="Verified Farmer">✓ Verified</span>
          </div>
          <span className="agri-sidebar-location">📍 {user?.location || 'Telangana'}</span>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <nav className="agri-sidebar-nav">
        <ul className="agri-sidebar-list">
          {navItems.map((item) => {
            const IconComp = item.icon;
            const isActive = activeTab === item.id;
            return (
              <li key={item.id} className="agri-sidebar-item">
                <button
                  type="button"
                  className={`agri-sidebar-link ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveTab(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <IconComp size={18} className="agri-sidebar-icon" />
                  <span className="agri-sidebar-label">{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className={`agri-sidebar-pill ${item.badgeVariant === 'accent' ? 'accent' : ''}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Sidebar Quick Action Banner */}
      <div className="agri-sidebar-action-box">
        <div className="box-title">Sell or Rent Equipment</div>
        <p className="box-desc">List your crops or machinery in 2 minutes.</p>
        <Button
          variant="primary"
          size="sm"
          fullWidth
          icon={<PlusCircle size={16} />}
          onClick={() => onNavigate('/create-listing')}
        >
          Create Listing
        </Button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
