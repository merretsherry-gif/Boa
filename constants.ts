
import { Transaction, Bill, AppNotification } from './types';

export const USER_NAME = "Thomas Michael";
export const MOCK_USER_ID = "thomas_michael";
export const MOCK_PASSCODE = "BoA@2024";
export const MOCK_EMAIL = "thomasgggf513@gmail.com";
export const INITIAL_BALANCE = 20000.00;

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: '1', date: 'Oct 24', description: 'Apple Store Purchase', amount: -129.00, category: 'Shopping' },
  { id: '2', date: 'Oct 23', description: 'Starbucks Coffee', amount: -6.45, category: 'Food' },
  { id: '3', date: 'Oct 22', description: 'Payroll Deposit', amount: 3250.00, category: 'Income' },
  { id: '4', date: 'Oct 20', description: 'Verizon Wireless Bill', amount: -85.00, category: 'Bills' },
  { id: '5', date: 'Oct 18', description: 'Zelle Transfer - Mom', amount: -200.00, category: 'Transfer' },
  { id: '6', date: 'Oct 15', description: 'Whole Foods Market', amount: -145.20, category: 'Food' },
];

export const MOCK_BILLS: Bill[] = [
  { id: 'b1', name: 'Pacific Gas & Electric', dueDate: 'Nov 05', amount: 142.50, status: 'Pending' },
  { id: 'b2', name: 'State Farm Insurance', dueDate: 'Nov 12', amount: 89.00, status: 'Pending' },
  { id: 'b3', name: 'Gym Membership', dueDate: 'Nov 15', amount: 45.00, status: 'Pending' },
];

export const MOCK_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'n1',
    title: 'Security Alert',
    message: 'A new sign-in was detected on a Chrome browser from San Francisco, CA.',
    date: '2h ago',
    isRead: false,
    type: 'security'
  },
  {
    id: 'n2',
    title: 'Transaction Alert',
    message: 'Your direct deposit of $3,250.00 was successfully credited to your Advantage Plus Checking.',
    date: 'Yesterday',
    isRead: true,
    type: 'transaction'
  },
  {
    id: 'n3',
    title: 'Low Balance Warning',
    message: 'Your Savings account (...1102) is below your set threshold of $1,000.',
    date: 'Oct 22',
    isRead: false,
    type: 'system'
  }
];

export const CHART_DATA = [
  { name: 'Jul', spending: 2400 },
  { name: 'Aug', spending: 1398 },
  { name: 'Sep', spending: 3800 },
  { name: 'Oct', spending: 2630 },
];
