import React, { useState } from 'react';

const GraceDashboard = () => {
  const [graceQueue, setGraceQueue] = useState([
    { id: 72, action: "John Frank — AGLC dictation session coordination", source: "Day 12, 🦋#113", status: "pending" },
    { id: 75, action: "John Frank — Store #3 banner: 'Lines of Credit up to $10,000'", source: "Day 12, 🦋#114", status: "pending" },
    { id: 76, action: "Vaishali — Accordion card graphic update", source: "Day 12, 🦋#117", status: "pending" },
    { id: 77, action: "Lucas — Bebop access request", source: "Day 12, 🦋#118", status: "pending" },
    { id: 58, action: "Marcy — Distribute Maven + Nicole stories", source: "Day 11, 🦋#112", status: "pending" },
    { id: 59, action: "John Frank — Farmers market pictures (2 emails)", source: "Day 11, 🦋#111", status: "pending" },
    { id: 60, action: "John Frank — Italy trip follow-up", source: "Day 11, 🦋#111", status: "pending" },
  ]);

  const [ptkMade, setPtkMade] = useState([
    { id: 1, promise: "Send John Frank farmers market pictures", to: "John Frank", date: "Jan 21", status: "outstanding", source: "Day 11" },
    { id: 2, promise: "Buy John Frank & Julie Italy tickets", to: "John Frank", date: "Jan 21", status: "outstanding", source: "Day 11" },
    { id: 3, promise: "Distribute Maven doorstep + Nicole stories", to: "Marcy/Team", date: "Jan 21", status: "outstanding", source: "Day 11" },
    { id: 4, promise: "Get Jesse & Samantha Manus invites", to: "Jesse/Samantha", date: "Jan 21", status: "outstanding", source: "Day 11" },
    { id: 5, promise: "Talk to Sharon re: Samantha nanny wedding gift", to: "Sharon", date: "Jan 12", status: "outstanding", source: "Day 2" },
  ]);

  const [ptkToTim, setPtkToTim] = useState([
    { id: 1, promise: "Empower Lift extraction from Replit", from: "Fidel", date: "Jan 21", dueDate: "TBD", status: "waiting", daysOverdue: null },
    { id: 2, promise: "Manus invites to Jesse/Samantha", from: "Fidel", date: "Jan 21", dueDate: "TBD", status: "waiting", daysOverdue: null },
    { id: 3, promise: "Cauliflower brain image", from: "Lukas", date: "Jan 11", dueDate: "TBD", status: "overdue", daysOverdue: 14 },
    { id: 4, promise: "Bebop login access", from: "Lucas", date: "Jan 22", dueDate: "TBD", status: "waiting", daysOverdue: null },
    { id: 5, promise: "Accordion card graphic with core values", from: "Vaishali", date: "Jan 22", dueDate: "TBD", status: "waiting", daysOverdue: null },
  ]);

  const handleGraceAction = (id, action) => {
    setGraceQueue(prev => prev.map(item => 
      item.id === id ? { ...item, status: action } : item
    ));
  };

  const handlePtkMadeAction = (id, action) => {
    setPtkMade(prev => prev.map(item =>
      item.id === id ? { ...item, status: action } : item
    ));
  };

  const handleGhostBuster = (id) => {
    setPtkToTim(prev => prev.map(item =>
      item.id === id ? { ...item, status: 'nudged' } : item
    ));
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'editing': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'snoozed': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'outstanding': return 'bg-orange-100 text-orange-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'waiting': return 'bg-gray-100 text-gray-800';
      case 'nudged': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">🧞 GRACE DASHBOARD</h1>
          <p className="text-gray-600 mt-2">Cloud Butterfly Library — Day 12 | YTD: 119 🦋</p>
        </div>

        {/* Grace Execution Queue */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            🧞 Grace Execution Queue
            <span className="text-sm font-normal text-gray-500">— Drafts Ready for Action</span>
          </h2>
          
          <div className="space-y-4">
            {graceQueue.map(item => (
              <div key={item.id} className="border rounded-lg p-4 bg-gray-50">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="font-mono text-sm text-gray-500">#{item.id}</span>
                    <p className="font-medium text-gray-900">{item.action}</p>
                    <p className="text-sm text-gray-500">{item.source}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(item.status)}`}>
                    {item.status.toUpperCase()}
                  </span>
                </div>
                
                {item.status === 'pending' && (
                  <div className="flex gap-2 flex-wrap">
                    <button 
                      onClick={() => handleGraceAction(item.id, 'approved')}
                      className="px-3 py-1.5 bg-green-500 text-white rounded hover:bg-green-600 text-sm font-medium"
                    >
                      ✅ Approve
                    </button>
                    <button 
                      onClick={() => handleGraceAction(item.id, 'editing')}
                      className="px-3 py-1.5 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm font-medium"
                    >
                      ✏️ Edit
                    </button>
                    <button 
                      onClick={() => handleGraceAction(item.id, 'rejected')}
                      className="px-3 py-1.5 bg-red-500 text-white rounded hover:bg-red-600 text-sm font-medium"
                    >
                      ❌ Reject
                    </button>
                    <button 
                      onClick={() => handleGraceAction(item.id, 'snoozed')}
                      className="px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm font-medium"
                    >
                      ⏰ Snooze
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* PTK - Promises Tim Made */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            📤 PTK — Promises Tim Made
            <span className="text-sm font-normal text-gray-500">— Outstanding Commitments</span>
          </h2>
          
          <div className="space-y-3">
            {ptkMade.map(item => (
              <div key={item.id} className="border rounded-lg p-4 bg-gray-50 flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-900">{item.promise}</p>
                  <p className="text-sm text-gray-500">To: {item.to} | {item.date} | {item.source}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(item.status)}`}>
                    {item.status.toUpperCase()}
                  </span>
                  {item.status === 'outstanding' && (
                    <button 
                      onClick={() => handlePtkMadeAction(item.id, 'completed')}
                      className="px-3 py-1.5 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
                    >
                      ✅ Done
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t flex justify-between text-sm">
            <span className="text-orange-600 font-medium">
              Outstanding: {ptkMade.filter(p => p.status === 'outstanding').length}
            </span>
            <span className="text-green-600 font-medium">
              Completed: {ptkMade.filter(p => p.status === 'completed').length}
            </span>
          </div>
        </div>

        {/* PTK - Promises TO Tim (Ghost Buster) */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            👻 Ghost Buster — Promises TO Tim
            <span className="text-sm font-normal text-gray-500">— May Need a Nudge</span>
          </h2>
          
          <div className="space-y-3">
            {ptkToTim.map(item => (
              <div key={item.id} className={`border rounded-lg p-4 ${item.status === 'overdue' ? 'bg-red-50 border-red-200' : 'bg-gray-50'}`}>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-900">{item.promise}</p>
                    <p className="text-sm text-gray-500">
                      From: <span className="font-medium">{item.from}</span> | Requested: {item.date}
                      {item.daysOverdue && <span className="text-red-600 ml-2">({item.daysOverdue} days overdue)</span>}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(item.status)}`}>
                      {item.status.toUpperCase()}
                    </span>
                    {(item.status === 'waiting' || item.status === 'overdue') && (
                      <button 
                        onClick={() => handleGhostBuster(item.id)}
                        className="px-3 py-1.5 bg-purple-500 text-white rounded hover:bg-purple-600 text-sm"
                      >
                        👻 Nudge
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t flex justify-between text-sm">
            <span className="text-red-600 font-medium">
              Overdue: {ptkToTim.filter(p => p.status === 'overdue').length}
            </span>
            <span className="text-gray-600 font-medium">
              Waiting: {ptkToTim.filter(p => p.status === 'waiting').length}
            </span>
            <span className="text-purple-600 font-medium">
              Nudged: {ptkToTim.filter(p => p.status === 'nudged').length}
            </span>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-green-50 rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-green-700">
              {graceQueue.filter(g => g.status === 'approved').length}
            </p>
            <p className="text-sm text-green-600">Grace Approved</p>
          </div>
          <div className="bg-orange-50 rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-orange-700">
              {ptkMade.filter(p => p.status === 'outstanding').length}
            </p>
            <p className="text-sm text-orange-600">Promises Outstanding</p>
          </div>
          <div className="bg-red-50 rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-red-700">
              {ptkToTim.filter(p => p.status === 'overdue').length}
            </p>
            <p className="text-sm text-red-600">Need Nudge</p>
          </div>
        </div>

        <p className="text-center text-gray-500 text-sm">
          PTK = Conscious Promises | Cloud Butterflies = Unconscious Insights | Grace Executes Both
        </p>
      </div>
    </div>
  );
};

export default GraceDashboard;
