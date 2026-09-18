import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Tag, Tractor, ShoppingBag, MessageSquare, PlusCircle, Search, Wheat, Sprout,
  ArrowRight, Clock, MapPin, User, CheckCircle2, AlertCircle, FileText, Bell, Sparkles, Filter
} from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import Button from '../components/Button';
import Badge from '../components/Badge';
import EmptyState from '../components/EmptyState';
import ListingCard from '../components/ListingCard';
import DashboardSidebar from '../components/dashboard/DashboardSidebar';
import DashboardSummaryCard from '../components/dashboard/DashboardSummaryCard';
import ActivityItem from '../components/dashboard/ActivityItem';
import { useAuth } from '../context/AuthContext';
import {
  DEMO_USER, DEMO_METRICS, DEMO_USER_LISTINGS, DEMO_RENTAL_ACTIVITY,
  DEMO_PURCHASE_REQUESTS, DEMO_RECENT_ACTIVITIES, DEMO_MESSAGES_PREVIEW
} from '../data/dashboardData';
import './Dashboard.css';

export const Dashboard = () => {
  const navigate = useNavigate();

  // Try retrieving user from AuthContext (fallback to demo user)
  let currentUser = DEMO_USER;
  try {
    const auth = useAuth();
    if (auth?.user) {
      currentUser = { ...DEMO_USER, ...auth.user };
    }
  } catch (e) {
    // AuthContext fallback
  }

  // Active Sidebar Tab State: 'overview' | 'listings' | 'rentals' | 'requests' | 'messages' | 'notifications' | 'profile'
  const [activeTab, setActiveTab] = useState('overview');

  // Role filter for Role-Aware UI demo
  const [activeRoleFilter, setActiveRoleFilter] = useState('ALL');

  return (
    <MainLayout>
      <div className="agri-dashboard-page">
        <div className="container agri-dashboard-container">
          {/* Mobile Tab Drawer Switcher */}
          <div className="agri-mobile-tabs-bar">
            <button
              type="button"
              className={`mobile-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              type="button"
              className={`mobile-tab-btn ${activeTab === 'listings' ? 'active' : ''}`}
              onClick={() => setActiveTab('listings')}
            >
              Listings ({DEMO_METRICS.myListingsCount})
            </button>
            <button
              type="button"
              className={`mobile-tab-btn ${activeTab === 'rentals' ? 'active' : ''}`}
              onClick={() => setActiveTab('rentals')}
            >
              Rentals ({DEMO_METRICS.activeRentalsCount})
            </button>
            <button
              type="button"
              className={`mobile-tab-btn ${activeTab === 'requests' ? 'active' : ''}`}
              onClick={() => setActiveTab('requests')}
            >
              Requests ({DEMO_METRICS.purchaseRequestsCount})
            </button>
            <button
              type="button"
              className={`mobile-tab-btn ${activeTab === 'messages' ? 'active' : ''}`}
              onClick={() => navigate('/messages')}
            >
              Messages
            </button>
          </div>

          {/* Dashboard Layout Grid: Left Sidebar + Right Main Panel */}
          <div className="agri-dashboard-layout">
            {/* Desktop Left Sidebar */}
            <div className="agri-dashboard-sidebar-area">
              <DashboardSidebar
                activeTab={activeTab}
                setActiveTab={(tab) => {
                  if (tab === 'messages') {
                    navigate('/messages');
                  } else {
                    setActiveTab(tab);
                  }
                }}
                user={currentUser}
                metrics={DEMO_METRICS}
                onNavigate={navigate}
              />
            </div>

            {/* Right Main Content Area */}
            <main className="agri-dashboard-main">
              {/* Dashboard Welcome Header */}
              <div className="agri-dashboard-welcome">
                <div className="welcome-text">
                  <div className="welcome-badge-row">
                    <span className="welcome-hand">👋</span>
                    <Badge variant="success">{currentUser.role || 'Farmer'}</Badge>
                    <span className="location-pill">📍 {currentUser.location}</span>
                  </div>
                  <h1 className="welcome-title">Welcome back, {currentUser.name}!</h1>
                  <p className="welcome-subtitle">
                    Manage your listings, rentals, purchases, and activity in one place.
                  </p>
                </div>
                <div className="welcome-actions">
                  <Button
                    variant="primary"
                    size="md"
                    icon={<PlusCircle size={18} />}
                    onClick={() => navigate('/create-listing')}
                  >
                    + Create Listing
                  </Button>
                </div>
              </div>

              {/* OVERVIEW TAB CONTENT */}
              {(activeTab === 'overview' || activeTab === 'listings') && (
                <>
                  {/* SUMMARY STATS CARDS GRID */}
                  <div className="agri-summary-grid">
                    <DashboardSummaryCard
                      title="My Listings"
                      value={DEMO_METRICS.myListingsCount}
                      subtitle="4 Active • 1 Pending • 1 Sold"
                      icon={Tag}
                      variant="default"
                      onClick={() => setActiveTab('listings')}
                    />
                    <DashboardSummaryCard
                      title="Active Rentals"
                      value={DEMO_METRICS.activeRentalsCount}
                      subtitle="1 Harvester • 1 Sprayer"
                      icon={Tractor}
                      variant="rentals"
                      onClick={() => setActiveTab('rentals')}
                    />
                    <DashboardSummaryCard
                      title="Purchase Requests"
                      value={DEMO_METRICS.purchaseRequestsCount}
                      subtitle="3 Pending • 1 Accepted"
                      icon={ShoppingBag}
                      variant="requests"
                      onClick={() => setActiveTab('requests')}
                    />
                    <DashboardSummaryCard
                      title="Unread Messages"
                      value={DEMO_METRICS.unreadMessagesCount}
                      subtitle="Latest: Suresh Patel (10:45 AM)"
                      icon={MessageSquare}
                      variant="messages"
                      onClick={() => navigate('/messages')}
                    />
                  </div>

                  {/* QUICK ACTIONS SECTION */}
                  <div className="agri-dashboard-section">
                    <h2 className="section-title">Quick Actions</h2>
                    <div className="agri-quick-actions-grid">
                      <div className="quick-action-card" onClick={() => navigate('/create-listing')}>
                        <div className="quick-action-icon green">
                          <PlusCircle size={22} />
                        </div>
                        <div className="quick-action-info">
                          <strong>Create Listing</strong>
                          <span>Post machinery, crops or seeds</span>
                        </div>
                      </div>

                      <div className="quick-action-card" onClick={() => navigate('/rent')}>
                        <div className="quick-action-icon blue">
                          <Tractor size={22} />
                        </div>
                        <div className="quick-action-info">
                          <strong>Find Equipment</strong>
                          <span>Rent tractors & sprayers</span>
                        </div>
                      </div>

                      <div className="quick-action-card" onClick={() => navigate('/crops')}>
                        <div className="quick-action-icon amber">
                          <Sprout size={22} />
                        </div>
                        <div className="quick-action-info">
                          <strong>Browse Crops</strong>
                          <span>Buy fresh harvest produce</span>
                        </div>
                      </div>

                      <div className="quick-action-card" onClick={() => navigate('/products')}>
                        <div className="quick-action-icon purple">
                          <ShoppingBag size={22} />
                        </div>
                        <div className="quick-action-info">
                          <strong>Farm Products</strong>
                          <span>Seeds, fertilizers & tools</span>
                        </div>
                      </div>

                      <div className="quick-action-card" onClick={() => navigate('/messages')}>
                        <div className="quick-action-icon pink">
                          <MessageSquare size={22} />
                        </div>
                        <div className="quick-action-info">
                          <strong>View Messages</strong>
                          <span>3 new buyer enquiries</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* MY LISTINGS SECTION */}
                  <div className="agri-dashboard-section">
                    <div className="section-header-row">
                      <h2 className="section-title">My Listings ({DEMO_USER_LISTINGS.length})</h2>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate('/create-listing')}
                      >
                        + Add New
                      </Button>
                    </div>

                    <div className="agri-dashboard-listings-grid">
                      {DEMO_USER_LISTINGS.map((item) => (
                        <div key={item.id} className="agri-dash-listing-card">
                          <div className="dash-card-image-wrap">
                            <img src={item.image} alt={item.title} />
                            <Badge
                              variant={
                                item.status === 'Active'
                                  ? 'success'
                                  : item.status === 'Pending'
                                  ? 'warning'
                                  : item.status === 'Sold'
                                  ? 'danger'
                                  : 'info'
                              }
                              className="dash-card-badge"
                            >
                              {item.status}
                            </Badge>
                          </div>
                          <div className="dash-card-body">
                            <span className="dash-card-category">{item.category}</span>
                            <h3 className="dash-card-title">{item.title}</h3>
                            <div className="dash-card-price">{item.price}</div>
                            <div className="dash-card-loc">📍 {item.location}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* RENTAL ACTIVITY TAB / SECTION */}
              {(activeTab === 'overview' || activeTab === 'rentals') && (
                <div className="agri-dashboard-section">
                  <div className="section-header-row">
                    <h2 className="section-title">Rental Activity</h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate('/rent')}
                    >
                      Browse Equipment
                    </Button>
                  </div>

                  <div className="agri-table-wrapper">
                    <table className="agri-dash-table">
                      <thead>
                        <tr>
                          <th>Equipment</th>
                          <th>Owner / Supplier</th>
                          <th>Rental Period</th>
                          <th>Amount</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {DEMO_RENTAL_ACTIVITY.map((rent) => (
                          <tr key={rent.id}>
                            <td>
                              <strong className="table-item-title">{rent.equipmentName}</strong>
                              <span className="table-item-sub">{rent.location}</span>
                            </td>
                            <td>{rent.ownerName}</td>
                            <td>
                              <div>{rent.rentalPeriod}</div>
                              <small className="text-muted">{rent.duration}</small>
                            </td>
                            <td><strong>{rent.amount}</strong></td>
                            <td>
                              <Badge
                                variant={
                                  rent.status === 'Active'
                                    ? 'success'
                                    : rent.status === 'Upcoming'
                                    ? 'info'
                                    : rent.status === 'Completed'
                                    ? 'default'
                                    : 'danger'
                                }
                              >
                                {rent.status}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* PURCHASE REQUESTS TAB / SECTION */}
              {(activeTab === 'overview' || activeTab === 'requests') && (
                <div className="agri-dashboard-section">
                  <div className="section-header-row">
                    <h2 className="section-title">Purchase Requests ({DEMO_PURCHASE_REQUESTS.length})</h2>
                    <Badge variant="info">4 Offers</Badge>
                  </div>

                  <div className="agri-requests-list">
                    {DEMO_PURCHASE_REQUESTS.map((req) => (
                      <div key={req.id} className="agri-request-card">
                        <div className="request-card-header">
                          <div>
                            <h3 className="request-title">{req.itemTitle}</h3>
                            <span className="request-buyer">Buyer: <strong>{req.buyerName}</strong></span>
                          </div>
                          <Badge
                            variant={
                              req.status === 'Accepted'
                                ? 'success'
                                : req.status === 'Pending'
                                ? 'warning'
                                : req.status === 'Rejected'
                                ? 'danger'
                                : 'default'
                            }
                          >
                            {req.status}
                          </Badge>
                        </div>
                        <p className="request-msg">"{req.message}"</p>
                        <div className="request-footer">
                          <div className="request-price">
                            <span>Offered: <strong>{req.offeredPrice}</strong></span>
                            <span className="total">Total: {req.totalValue}</span>
                          </div>
                          <div className="request-actions">
                            {req.status === 'Pending' && (
                              <>
                                <Button variant="outline" size="sm">Decline</Button>
                                <Button variant="primary" size="sm">Accept Offer</Button>
                              </>
                            )}
                            {req.status === 'Accepted' && (
                              <Button variant="ghost" size="sm" onClick={() => navigate('/messages')}>
                                Chat with Buyer
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* RECENT ACTIVITY TIMELINE */}
              {activeTab === 'overview' && (
                <div className="agri-dashboard-section">
                  <h2 className="section-title">Recent Activity</h2>
                  <div className="agri-activity-card">
                    {DEMO_RECENT_ACTIVITIES.map((act) => (
                      <ActivityItem
                        key={act.id}
                        icon={act.icon}
                        title={act.title}
                        description={act.description}
                        timestamp={act.timestamp}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* NOTIFICATIONS TAB */}
              {activeTab === 'notifications' && (
                <div className="agri-dashboard-section">
                  <h2 className="section-title">Notifications</h2>
                  <div className="agri-activity-card">
                    <ActivityItem
                      icon="Wheat"
                      title="Paddy Listing Approved"
                      description="Your listing 'Fresh Paddy BPT 5204' is now live on the Crop Marketplace."
                      timestamp="10 minutes ago"
                    />
                    <ActivityItem
                      icon="ShoppingCart"
                      title="New Offer from Vijay Trading"
                      description="Received a ₹2,400/quintal purchase request."
                      timestamp="2 hours ago"
                    />
                  </div>
                </div>
              )}

              {/* PROFILE TAB */}
              {activeTab === 'profile' && (
                <div className="agri-dashboard-section">
                  <h2 className="section-title">My Farmer Profile</h2>
                  <div className="agri-profile-card">
                    <div className="profile-row"><strong>Full Name:</strong> <span>{currentUser.name}</span></div>
                    <div className="profile-row"><strong>Role:</strong> <span>{currentUser.role}</span></div>
                    <div className="profile-row"><strong>Phone:</strong> <span>{currentUser.phone}</span></div>
                    <div className="profile-row"><strong>Email:</strong> <span>{currentUser.email}</span></div>
                    <div className="profile-row"><strong>Location:</strong> <span>{currentUser.location}</span></div>
                    <div className="profile-row"><strong>Joined:</strong> <span>{currentUser.joinedDate}</span></div>
                  </div>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
