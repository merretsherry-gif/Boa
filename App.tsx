
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import Dashboard from './components/Dashboard';
import Transfer from './components/Transfer';
import BillPay from './components/BillPay';
import Statements from './components/Statements';
import Menu from './components/Menu';
import OTPModal from './components/OTPModal';
import Login from './components/Login';
import NotificationTray from './components/NotificationTray';
import Toast from './components/Toast';
import EricaChat from './components/EricaChat';
import { TabType, AppNotification } from './types';
import { INITIAL_BALANCE, MOCK_NOTIFICATIONS, MOCK_TRANSACTIONS } from './constants';
import { getFinancialInsights } from './services/geminiService';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('boa_logged_in') === 'true';
  });
  const [activeTab, setActiveTab] = useState<TabType>(TabType.HOME);
  const [balance, setBalance] = useState(() => {
    const saved = localStorage.getItem('boa_balance');
    return saved ? parseFloat(saved) : INITIAL_BALANCE;
  });
  const [isOTPVisible, setIsOTPVisible] = useState(false);
  const [isNotificationTrayOpen, setIsNotificationTrayOpen] = useState(false);
  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem('boa_notifications');
    return saved ? JSON.parse(saved) : MOCK_NOTIFICATIONS;
  });
  const [pendingAction, setPendingAction] = useState<{ type: string; amount: number; description?: string } | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Persistence
  useEffect(() => {
    localStorage.setItem('boa_balance', balance.toString());
    localStorage.setItem('boa_notifications', JSON.stringify(notifications));
    localStorage.setItem('boa_logged_in', isLoggedIn.toString());
  }, [balance, notifications, isLoggedIn]);

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  // Fetch AI Insights on Login
  useEffect(() => {
    if (isLoggedIn) {
      const fetchInsights = async () => {
        const hasRecentInsight = notifications.some(n => n.type === 'insight' && n.date === 'Just now');
        if (hasRecentInsight) return;

        const insightText = await getFinancialInsights(MOCK_TRANSACTIONS);
        const newInsight: AppNotification = {
          id: 'insight-' + Date.now(),
          title: 'Erica® Financial Insight',
          message: insightText,
          date: 'Just now',
          isRead: false,
          type: 'insight'
        };
        setNotifications(prev => [newInsight, ...prev]);
        showToast("New financial insight available", "info");
      };
      
      const timeout = setTimeout(fetchInsights, 2000);
      return () => clearTimeout(timeout);
    }
  }, [isLoggedIn, showToast, notifications]);

  const handleTransfer = (amount: number, recipient?: string) => {
    setPendingAction({ type: 'Transfer', amount, description: recipient ? `Transfer to ${recipient}` : 'Zelle® Transfer' });
    setIsOTPVisible(true);
  };

  const handleBillPay = (amount: number, biller: string) => {
    setPendingAction({ type: 'Bill Payment', amount, description: `Payment to ${biller}` });
    setIsOTPVisible(true);
  };

  const confirmAction = () => {
    if (pendingAction) {
      setBalance(prev => prev - pendingAction.amount);
      setPendingAction(null);
      setIsOTPVisible(false);
      setActiveTab(TabType.HOME);
      
      const newNotif: AppNotification = {
        id: Date.now().toString(),
        title: 'Transaction Complete',
        message: `Your ${pendingAction.description || pendingAction.type} of $${pendingAction.amount.toFixed(2)} was sent successfully.`,
        date: 'Just now',
        isRead: false,
        type: 'transaction'
      };
      setNotifications(prev => [newNotif, ...prev]);
      showToast(`${pendingAction.type} Successful`);
    }
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    showToast("Notifications cleared", "info");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.clear();
    window.location.reload();
  };

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const renderContent = () => {
    switch (activeTab) {
      case TabType.HOME:
        return <Dashboard balance={balance} onQuickAction={(type) => setActiveTab(type)} />;
      case TabType.TRANSFER:
        return <Transfer onTransfer={handleTransfer} balance={balance} />;
      case TabType.BILL_PAY:
        return <BillPay onPay={handleBillPay} />;
      case TabType.CHAT:
        return <EricaChat />;
      case TabType.STATEMENTS:
        return <Statements />;
      case TabType.MENU:
        return <Menu onLogout={handleLogout} />;
      default:
        return <Dashboard balance={balance} onQuickAction={(type) => setActiveTab(type)} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-20 overflow-x-hidden">
      <Header 
        unreadCount={unreadCount} 
        onBellClick={() => setIsNotificationTrayOpen(true)} 
      />
      
      <main className="flex-1 overflow-y-auto px-4 py-6">
        {renderContent()}
      </main>

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {isOTPVisible && (
        <OTPModal 
          onConfirm={confirmAction} 
          onCancel={() => setIsOTPVisible(false)} 
        />
      )}

      <NotificationTray 
        isOpen={isNotificationTrayOpen} 
        notifications={notifications}
        onClose={() => setIsNotificationTrayOpen(false)}
        onMarkRead={markNotificationRead}
        onMarkAllRead={markAllRead}
      />

      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
};

export default App;
