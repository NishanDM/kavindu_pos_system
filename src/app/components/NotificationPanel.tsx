import { X, AlertCircle, DollarSign, Package, Bell } from 'lucide-react';

interface Notification {
  id: string;
  type: 'low-stock' | 'payment-due' | 'outstanding';
  title: string;
  message: string;
  time: string;
  severity: 'high' | 'medium' | 'low';
}

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationPanel({ isOpen, onClose }: NotificationPanelProps) {
  const notifications: Notification[] = [
    {
      id: '1',
      type: 'low-stock',
      title: 'Low Stock Alert',
      message: 'Engine Oil 10W-40 is below reorder level (5 units remaining)',
      time: '2 hours ago',
      severity: 'high',
    },
    {
      id: '2',
      type: 'payment-due',
      title: 'Payment Due',
      message: 'Supplier payment for ABC Auto Parts Ltd due in 3 days (Rs. 45,000)',
      time: '5 hours ago',
      severity: 'medium',
    },
    {
      id: '3',
      type: 'outstanding',
      title: 'Outstanding Payment',
      message: 'Customer John Auto Parts has outstanding amount of Rs. 12,500',
      time: '1 day ago',
      severity: 'medium',
    },
    {
      id: '4',
      type: 'low-stock',
      title: 'Low Stock Alert',
      message: 'Brake Pad Set is below reorder level (3 units remaining)',
      time: '1 day ago',
      severity: 'high',
    },
    {
      id: '5',
      type: 'outstanding',
      title: 'Outstanding Payment',
      message: 'Invoice INV-202 pending payment Rs. 8,750',
      time: '2 days ago',
      severity: 'low',
    },
  ];

  if (!isOpen) return null;

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'low-stock':
        return <Package className="w-4 h-4" />;
      case 'payment-due':
        return <DollarSign className="w-4 h-4" />;
      case 'outstanding':
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getColor = (severity: Notification['severity']) => {
    switch (severity) {
      case 'high':
        return 'bg-red-50 border-red-200 text-red-900';
      case 'medium':
        return 'bg-yellow-50 border-yellow-200 text-yellow-900';
      case 'low':
        return 'bg-blue-50 border-blue-200 text-blue-900';
    }
  };

  const getIconColor = (severity: Notification['severity']) => {
    switch (severity) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-blue-600';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[100] flex justify-end" onClick={onClose}>
      <div
        className="w-full max-w-md bg-white shadow-2xl h-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-blue-600">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-white" />
            <h3 className="text-base font-semibold text-white">Notifications</h3>
            <span className="px-2 py-0.5 bg-white text-blue-600 text-xs rounded-full font-medium">
              {notifications.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-blue-700 p-1 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notification List */}
        <div className="overflow-y-auto h-[calc(100%-64px)]">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Bell className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p className="text-sm">No notifications</p>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg border ${getColor(notification.severity)} transition-all hover:shadow-md`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-full ${getIconColor(notification.severity)}`}>
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold mb-1">{notification.title}</p>
                      <p className="text-xs text-gray-700 mb-2">{notification.message}</p>
                      <p className="text-xs text-gray-500">{notification.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <button className="w-full py-2 text-xs text-blue-600 hover:bg-blue-50 rounded transition-colors">
            Mark all as read
          </button>
        </div>
      </div>
    </div>
  );
}