import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, ArrowLeft, Info, Sprout } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import Button from '../components/Button';
import Badge from '../components/Badge';
import { DEMO_MESSAGES_PREVIEW } from '../data/dashboardData';
import './MessagesPlaceholder.css';

export const MessagesPlaceholder = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="agri-messages-page">
        <div className="container agri-messages-container">
          <button
            type="button"
            className="agri-messages-back"
            onClick={() => navigate('/dashboard')}
          >
            <ArrowLeft size={18} /> Back to Dashboard
          </button>

          <div className="agri-messages-header">
            <div className="header-left">
              <Badge variant="info">AgriMart Chat</Badge>
              <h1 className="agri-messages-title">Messages & Buyer Enquiries</h1>
              <p className="agri-messages-subtitle">
                Direct farmer-to-buyer communication channel.
              </p>
            </div>
            <Button
              variant="outline"
              size="md"
              onClick={() => navigate('/dashboard')}
            >
              Return to Dashboard
            </Button>
          </div>

          {/* Demo Notice Banner */}
          <div className="agri-messages-notice">
            <Info size={20} className="notice-icon" />
            <div>
              <strong>Demo Messaging Interface</strong>
              <p>
                Real-time WebSocket chat and SMS notifications will be enabled in a future backend integration phase. Below is a preview of your recent messages.
              </p>
            </div>
          </div>

          {/* Demo Messages Inbox List */}
          <div className="agri-messages-card">
            <div className="agri-messages-card-header">
              <h2>Recent Conversations</h2>
              <Badge variant="success">3 Unread</Badge>
            </div>

            <div className="agri-messages-list">
              {DEMO_MESSAGES_PREVIEW.map((msg) => (
                <div key={msg.id} className={`agri-message-item ${msg.unread ? 'unread' : ''}`}>
                  <div className="msg-avatar">{msg.avatar}</div>
                  <div className="msg-content">
                    <div className="msg-top">
                      <strong className="msg-sender">{msg.sender}</strong>
                      <span className="msg-time">{msg.time}</span>
                    </div>
                    <p className="msg-text">{msg.text}</p>
                  </div>
                  {msg.unread && <span className="unread-dot" title="Unread message" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default MessagesPlaceholder;
