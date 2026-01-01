
export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: 'Shopping' | 'Food' | 'Transfer' | 'Bills' | 'Income';
}

export interface Bill {
  id: string;
  name: string;
  dueDate: string;
  amount: number;
  status: 'Pending' | 'Paid';
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  date: string;
  isRead: boolean;
  type: 'security' | 'transaction' | 'insight' | 'system';
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'erica';
  timestamp: string;
  status?: 'sending' | 'delivered' | 'read';
}

export enum TabType {
  HOME = 'HOME',
  TRANSFER = 'TRANSFER',
  BILL_PAY = 'BILL_PAY',
  CHAT = 'CHAT',
  STATEMENTS = 'STATEMENTS',
  MENU = 'MENU'
}
