import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  AppstoreOutlined, 
  HomeOutlined, 
  LinkOutlined, 
  SettingOutlined, 
  CodeSandboxOutlined 
} from '@ant-design/icons';
import { useState } from 'react';

const navItems = [
  { path: '/', label: 'Home', icon: <HomeOutlined /> },
  { path: '/', label: 'Dashboard', icon: <AppstoreOutlined /> },
  { path: '/board', label: 'Task Board', icon: <AppstoreOutlined /> }, // We use Appstore for board as well or similar
  { path: '#', label: 'Integrations', icon: <LinkOutlined /> },
  { path: '#', label: 'Preferences', icon: <SettingOutlined /> },
];

const chartBars = [
  4, 6, 8, 5, 9, 12, 15, 10, 18, 22, 35, 40, 50, 45, 60,
  80, 100, 95, 85, 70, 65, 80, 75, 60, 50, 40, 30, 25,
  20, 15, 10, 8, 12, 10, 5, 8, 4, 10, 15, 18, 25, 20
];

export const MainLayout = () => {
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(true);

  // We are cheating the "Home" vs "Dashboard" highlight a bit
  // Since both point to '/', let's just highlight Dashboard if path is '/'
  
  return (
    <div className="app-container">
      <div className="app-window">
        {/* Top 30% */}
        <div className="top-section">
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '24px' }}>
              <CodeSandboxOutlined />
            </div>

            {/* Navigation Pill */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              border: '1px solid rgba(0,0,0,0.2)', 
              borderRadius: '40px',
              padding: '4px'
            }}>
              {navItems.map((item) => {
                const isActive = item.path === '/' && item.label === 'Dashboard' 
                                  ? location.pathname === '/' 
                                  : item.path === '/board'
                                  ? location.pathname === '/board'
                                  : false;
                
                return (
                  <Link 
                    key={item.label} 
                    to={item.path}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 16px',
                      borderRadius: '40px',
                      color: 'var(--color-text-dark)',
                      textDecoration: 'none',
                      fontWeight: 500,
                      fontSize: '14px',
                      background: isActive ? 'rgba(0,0,0,0.05)' : 'transparent',
                      transition: 'background 0.2s'
                    }}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* Theme Toggle */}
            <div 
              style={{
                width: '64px',
                height: '32px',
                background: 'var(--color-dark)',
                borderRadius: '40px',
                padding: '4px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
              onClick={() => setIsDarkMode(!isDarkMode)}
            >
              <div style={{
                width: '24px',
                height: '24px',
                background: 'var(--color-purple)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: isDarkMode ? 'translateX(32px)' : 'translateX(0)',
                transition: 'transform 0.3s ease',
                color: 'var(--color-dark)',
                fontSize: '12px'
              }}>
                🌙
              </div>
            </div>
          </div>

          {/* Title & Chart */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '24px' }}>
            <h1 style={{ 
              fontSize: '64px', 
              fontWeight: 500, 
              margin: 0, 
              letterSpacing: '-0.02em',
              lineHeight: 1
            }}>
              {location.pathname === '/board' ? 'Task Board' : 'Dashboard'}
            </h1>
            
            {/* Chart visualization */}
            {location.pathname === '/' && (
              <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-end', gap: '4px', height: '60px', marginBottom: '8px' }}>
                {/* Tooltip */}
                <div style={{
                  position: 'absolute',
                  top: '-40px',
                  left: '40%',
                  background: 'var(--color-dark)',
                  color: 'white',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 500,
                  whiteSpace: 'nowrap'
                }}>
                  1345 transactions
                  <div style={{ position: 'absolute', bottom: '-4px', left: '50%', transform: 'translateX(-50%)', borderTop: '4px solid var(--color-dark)', borderLeft: '4px solid transparent', borderRight: '4px solid transparent' }} />
                </div>
                
                {chartBars.map((h, i) => (
                  <div key={i} style={{ 
                    width: '3px', 
                    height: `${h}%`, 
                    background: 'rgba(0,0,0,0.4)', 
                    borderRadius: '2px',
                    transition: 'height 0.3s ease'
                  }} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom 70% */}
        <div className="bottom-section">
          <Outlet />
        </div>
      </div>
    </div>
  );
};