import React from 'react';
import { Bell } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const NotificationsPage: React.FC = () => {
  const { dispatch } = useAppContext();

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 min-h-[100vh] flex items-center justify-center">
      <div className="text-center">

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
            <Bell className="w-12 h-12 text-gray-400" />
          </div>
        </div>

        {/* Text */}
        <h1 className="text-3xl font-bold mb-3">
          No Notifications
        </h1>
        <p className="text-gray-500 max-w-md mx-auto mb-8">
          You’re all caught up! We’ll notify you here when there’s something new for you.
        </p>

        {/* CTA */}
        <button
          onClick={() => dispatch({ type: 'SET_PAGE', payload: 'home' })}
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition shadow-lg"
        >
          ← Go to Home
        </button>

      </div>
    </div>
  );
};

export default NotificationsPage;
