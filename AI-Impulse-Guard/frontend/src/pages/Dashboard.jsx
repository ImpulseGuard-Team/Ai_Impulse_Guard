import React, { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/* ─── MOCK DATA ─── */
const SPENDING_DATA = [120, 85, 200, 45, 310, 90, 160];
const TRANSACTIONS_DATA = [
  { id: 1, title: 'TechNova VR Headset', category: 'Electronics', time: '2h ago', amount: 549.00, status: 'IMPULSIVE' },
  { id: 2, title: 'Whole Foods Market',  category: 'Groceries',   time: '5h ago', amount: 84.20,  status: 'SAFE' },
  { id: 3, title: 'Starbucks Coffee',    category: 'Dining',      time: 'Yesterday', amount: 6.50, status: 'RISKY' },
];

const WEEK_SPENDING  = [320, 280, 410, 190, 530, 260, 380];
const MONTH_SPENDING = [1200, 980, 1540, 870, 1120];

const NAV_ITEMS = [
  { path: '/dashboard',    label: 'Dashboard',    icon: 'dashboard' },
  { path: '/insights',     label: 'Insights',     icon: 'insights' },
  { path: '/transactions', label: 'Transactions', icon: 'transactions' },
  { path: '/ai-advisor',   label: 'AI Advisor',   icon: 'advisor' },
];

/* ─── HELPER FUNCTIONS ─── */
const calculateGuardScore = (transactions, spendingData) => {
  let score = 100;
  const averageSpend = spendingData.reduce((sum, val) => sum + val, 0) / spendingData.length;
  
  score -= Math.min(30, Math.floor(averageSpend / 20));
  
  transactions.forEach(transaction => {
    if (transaction.status === 'IMPULSIVE') score -= Math.min(15, Math.floor(transaction.amount / 50));
    else if (transaction.status === 'RISKY') score -= 5;
    else score += 1;
  });
  
  return Math.max(0, Math.min(100, Math.round(score)));
};

const getScoreMessage = (score) => {
  if (score >= 80) return { text: 'Your self-control is excellent. Guard is actively filtering recurring triggers.', color: '#34d399' };
  if (score >= 60) return { text: 'Moderate risk detected. Consider reviewing recent spending patterns.', color: '#fbbf24' };
  return { text: 'High risk! Spending is elevated. AI recommends activating purchase locks.', color: '#f87171' };
};

const generateSmoothSvgPath = (data, width, height, padding) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  
  const points = data.map((value, index) => ({
    x: padding + (index / (data.length - 1)) * (width - padding * 2),
    y: padding + (1 - (value - min) / range) * (height - padding * 2),
  }));

  let path = `M${points[0].x},${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const controlPoint1X = points[i - 1].x + (points[i].x - points[i - 1].x) / 3;
    const controlPoint2X = points[i].x - (points[i].x - points[i - 1].x) / 3;
    path += ` C${controlPoint1X},${points[i - 1].y} ${controlPoint2X},${points[i].y} ${points[i].x},${points[i].y}`;
  }
  
  return { path, points };
};

/* ─── COMPONENTS ─── */
const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // State
  const [transactions] = useState(TRANSACTIONS_DATA);
  const [timeframe, setTimeframe] = useState('MONTH');
  const [showIntervention, setShowIntervention] = useState(true);

  // Computed Values
  const guardScore = useMemo(() => calculateGuardScore(transactions, SPENDING_DATA), [transactions]);
  const scoreMessage = getScoreMessage(guardScore); // Removed unnecessary useMemo

  const chartData = timeframe === 'WEEK' ? WEEK_SPENDING : MONTH_SPENDING;
  const chartLabels = timeframe === 'WEEK'
    ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    : ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Today'];
    
  const { path: linePath, points: linePoints } = useMemo(() => 
    generateSmoothSvgPath(chartData, 600, 200, 20), 
  [chartData]);

  const stats = useMemo(() => {
    const impulsiveSpend = transactions
      .filter(t => t.status === 'IMPULSIVE')
      .reduce((sum, t) => sum + t.amount, 0);
      
    return {
      moneySaved: `$${(impulsiveSpend * 0.6).toFixed(0)}`,
      blockedSites: transactions.filter(t => t.status === 'IMPULSIVE').length * 4 + 2
    };
  }, [transactions]);

  return (
    <div className="dashboard-container">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="brand">
          <h1>Impulse Guard</h1>
          <span className="badge-premium">Premium Tier</span>
        </div>

        <nav className="nav-menu">
          {NAV_ITEMS.map(item => (
            <button
              key={item.path}
              className={`nav-btn ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => navigate(item.path)}
            >
              <span className="icon-placeholder">❖</span> {/* Replace with real SVG icon component */}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="upgrade-box">
            <span>POWER MODE</span>
            <button className="btn-primary" onClick={() => alert('Upgrading...')}>Upgrade to Pro</button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        <header className="top-header">
          <h2>Overview</h2>
          <div className="header-actions">
            <input type="text" className="search-input" placeholder="Analyze finances…" />
            <button className="icon-btn">🔔</button>
            <div className="avatar">
              <img src="" alt="User Avatar" />
            </div>
          </div>
        </header>

        <div className="content-scroll">
          <div className="dashboard-grid">
            
            {/* GUARD SCORE CARD */}
            <div className="card score-card">
              <div className="card-header">
                <span className="status-badge">Guard Status</span>
              </div>
              <p className="subtitle">Current Impulse Score</p>
              <div className="score-display">
                <h2>{guardScore}</h2>
                <span>/100</span>
              </div>
              <p className="score-desc">
                {scoreMessage.text}
              </p>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${guardScore}%`, background: scoreMessage.color }}
                />
              </div>
            </div>

            {/* SPENDING CHART CARD */}
            <div className="card chart-card">
              <div className="card-header space-between">
                <div>
                  <h3>Spending Trajectory</h3>
                  <p className="subtitle">Real-time analysis vs. AI projections</p>
                </div>
                <div className="toggle-group">
                  {['WEEK', 'MONTH'].map(tf => (
                    <button 
                      key={tf} 
                      className={`toggle-btn ${timeframe === tf ? 'active' : ''}`}
                      onClick={() => setTimeframe(tf)}
                    >
                      {tf}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="svg-container">
                <svg viewBox="0 0 600 200" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  {[50, 100, 150].map(y => (
                    <line key={y} x1="20" y1={y} x2="580" y2={y} className="grid-line" />
                  ))}
                  {/* Chart Line */}
                  <path d={linePath} className="chart-line" />
                  {/* Points */}
                  {linePoints.map((point, i) => (
                    <circle 
                      key={i} 
                      cx={point.x} 
                      cy={point.y} 
                      r="4" 
                      className={i === linePoints.length - 1 ? 'point-active' : 'point-default'} 
                    />
                  ))}
                </svg>
              </div>
              
              <div className="chart-labels">
                {chartLabels.map((label, i) => (
                  <span key={i}>{label}</span>
                ))}
              </div>
            </div>

            {/* VIGILANCE LOG */}
            <div className={`card log-card ${showIntervention ? 'span-7' : 'span-8'}`}>
              <div className="card-header space-between">
                <h3>Vigilance Log</h3>
                <button className="btn-secondary" onClick={() => alert('Exported!')}>Export</button>
              </div>
              <div className="transaction-list">
                {transactions.map(transaction => (
                  <div key={transaction.id} className="transaction-item">
                    <div className="transaction-info">
                      <h4>{transaction.title}</h4>
                      <p>{transaction.category} • {transaction.time}</p>
                    </div>
                    <div className="transaction-amount">
                      <p>${transaction.amount.toFixed(2)}</p>
                      <span className={`status-${transaction.status.toLowerCase()}`}>
                        {transaction.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT COLUMN (AI Intervention & Snapshots) */}
            <div className={`right-column ${showIntervention ? 'span-5' : 'span-4'}`}>
              
              {showIntervention && (
                <div className="intervention-card">
                  <h3>AI Intervention Needed</h3>
                  <p>I've detected a pattern of late-night tech browsing. Should I lock purchasing from 11 PM to 6 AM?</p>
                  <div className="action-buttons">
                    <button className="btn-primary" onClick={() => setShowIntervention(false)}>Activate Lock</button>
                    <button className="btn-outline" onClick={() => setShowIntervention(false)}>Dismiss</button>
                  </div>
                </div>
              )}

              <div className="snapshot-container">
                <div className="snapshot-card">
                  <p>Blocked Sites</p>
                  <h2>{stats.blockedSites}</h2>
                </div>
                <div className="snapshot-card success">
                  <p>Money Saved</p>
                  <h2>{stats.moneySaved}</h2>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </main>
      
      {/* A human developer would put these styles in a separate Dashboard.css file 
        or use a framework like Tailwind. Included here so the component works standalone.
      */}
      <style>{`
        .dashboard-container { display: flex; height: 100vh; background: #0f172a; color: #fff; font-family: 'Inter', sans-serif; overflow: hidden; }
        
        /* Sidebar Styles */
        .sidebar { width: 256px; background: #0a0e1a; padding: 24px; display: flex; flex-direction: column; border-right: 1px solid rgba(148,163,184,0.1); }
        .brand h1 { font-size: 20px; font-weight: 800; margin: 0; }
        .badge-premium { font-size: 10px; color: #818cf8; text-transform: uppercase; font-weight: bold; letter-spacing: 2px; }
        .nav-menu { flex: 1; display: flex; flex-direction: column; gap: 4px; margin-top: 40px; }
        .nav-btn { display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 12px; background: transparent; border: 1px solid transparent; color: #94a3b8; font-weight: 600; cursor: pointer; transition: 0.2s; text-align: left; }
        .nav-btn:hover { background: rgba(255,255,255,0.04); color: #e2e8f0; }
        .nav-btn.active { background: rgba(129,140,248,0.08); color: #a5b4fc; border-color: rgba(129,140,248,0.2); }
        .upgrade-box { background: rgba(30,27,75,0.4); padding: 20px; border-radius: 16px; text-align: center; border: 1px solid rgba(129,140,248,0.1); }
        
        /* Main Layout */
        .main-content { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
        .top-header { display: flex; justify-content: space-between; padding: 20px 32px; border-bottom: 1px solid rgba(255,255,255,0.04); }
        .header-actions { display: flex; align-items: center; gap: 20px; }
        .search-input { background: #1e293b; border: 1px solid rgba(100,116,139,0.3); border-radius: 24px; padding: 8px 16px; color: #fff; outline: none; }
        .search-input:focus { border-color: #6366f1; }
        .avatar { width: 36px; height: 36px; border-radius: 50%; overflow: hidden; cursor: pointer; transition: transform 0.2s; }
        .avatar:hover { transform: scale(1.1); }
        
        /* Grid & Cards */
        .content-scroll { flex: 1; overflow-y: auto; padding: 24px 32px; }
        .dashboard-grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: 24px; max-width: 1200px; margin: 0 auto; }
        .card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 24px; padding: 24px; backdrop-filter: blur(20px); }
        .card-header.space-between { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; }
        .subtitle { color: #94a3b8; font-size: 13px; margin-top: 4px; }
        
        /* Specific Cards */
        .score-card { grid-column: span 4; }
        .score-display { display: flex; align-items: baseline; gap: 4px; margin: 12px 0; }
        .score-display h2 { font-size: 52px; margin: 0; background: linear-gradient(180deg,#fff,#94a3b8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .progress-bar { height: 6px; background: rgba(15,23,42,0.8); border-radius: 8px; margin-top: 24px; overflow: hidden; }
        .progress-fill { height: 100%; border-radius: 8px; transition: width 1s ease-out; }
        
        .chart-card { grid-column: span 8; }
        .toggle-group { display: flex; background: #0f172a; border-radius: 24px; padding: 3px; }
        .toggle-btn { padding: 6px 16px; font-size: 11px; font-weight: 700; border-radius: 20px; border: none; background: transparent; color: #64748b; cursor: pointer; }
        .toggle-btn.active { background: #6366f1; color: #fff; }
        .svg-container { height: 200px; width: 100%; }
        .grid-line { stroke: rgba(255,255,255,0.04); stroke-dasharray: 4 4; }
        .chart-line { fill: none; stroke: #818cf8; stroke-width: 2.5px; }
        .point-default { fill: #c7d2fe; }
        .point-active { fill: #34d399; r: 6; }
        .chart-labels { display: flex; justify-content: space-between; margin-top: 12px; font-size: 10px; color: #475569; text-transform: uppercase; }
        
        .log-card { grid-column: span 8; }
        .log-card.span-7 { grid-column: span 7; }
        .transaction-item { display: flex; justify-content: space-between; padding: 12px; border-radius: 12px; cursor: pointer; transition: 0.2s; }
        .transaction-item:hover { background: rgba(0,0,0,0.2); }
        .status-impulsive { color: #f87171; font-size: 10px; font-weight: bold; }
        .status-safe { color: #34d399; font-size: 10px; font-weight: bold; }
        .status-risky { color: #fbbf24; font-size: 10px; font-weight: bold; }
        
        .right-column { display: flex; flex-direction: column; gap: 24px; }
        .right-column.span-5 { grid-column: span 5; }
        .right-column.span-4 { grid-column: span 4; }
        
        .intervention-card { background: linear-gradient(135deg, #1e2338, #0f172a); border: 1px solid rgba(99,102,241,0.25); border-radius: 24px; padding: 24px; }
        .action-buttons { display: flex; gap: 12px; margin-top: 16px; }
        
        .snapshot-container { display: flex; gap: 16px; flex: 1; }
        .snapshot-card { flex: 1; background: rgba(0,0,0,0.2); border-radius: 16px; padding: 16px; border: 1px solid rgba(255,255,255,0.04); }
        .snapshot-card h2 { font-size: 26px; margin: 8px 0 0; }
        .snapshot-card.success h2 { color: #34d399; }
        
        /* Buttons */
        .btn-primary { width: 100%; padding: 10px; background: #6366f1; border: none; border-radius: 10px; color: #fff; font-weight: bold; cursor: pointer; transition: 0.2s; }
        .btn-primary:hover { background: #818cf8; }
        .btn-secondary { background: rgba(99,102,241,0.1); color: #a5b4fc; border: none; padding: 6px 14px; border-radius: 8px; font-weight: bold; cursor: pointer; }
        .btn-outline { flex: 1; padding: 10px; background: transparent; border: 1px solid rgba(255,255,255,0.2); border-radius: 10px; color: #fff; cursor: pointer; }
      `}</style>
    </div>
  );
};

export default Dashboard;