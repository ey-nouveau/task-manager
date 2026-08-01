import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  AppstoreOutlined, 
  HomeOutlined, 
  LinkOutlined, 
  SettingOutlined, 
  CodeSandboxOutlined 
} from '@ant-design/icons';
import { useState } from 'react';
import { Responsive } from './Responsive';

const navItems = [
  { path: '/', label: 'Home', icon: <HomeOutlined /> },
  { path: '/', label: 'Dashboard', icon: <AppstoreOutlined /> },
  { path: '/board', label: 'Task Board', icon: <AppstoreOutlined /> },
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

  return (
    <div className="app-container">
      <div className="app-window">
        <div className={location.pathname === '/' ? "top-section dashboard" : "top-section mini"}>
          <div className="main-header">
            <div style={{ fontSize: '24px' }}>
              <CodeSandboxOutlined />
            </div>

            <Responsive layout="desktop">
              <div className="nav-pill-container">
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
                      className="nav-pill-item"
                      style={{
                        background: isActive ? 'rgba(0,0,0,0.05)' : 'transparent'
                      }}
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </Responsive>

            <Responsive layout="mobile">
              <div className="nav-pill-container" style={{ width: '100%', marginTop: '16px' }}>
                {navItems.slice(0, 3).map((item) => {
                  const isActive = item.path === '/' && item.label === 'Dashboard' 
                                    ? location.pathname === '/' 
                                    : item.path === '/board'
                                    ? location.pathname === '/board'
                                    : false;
                  
                  return (
                    <Link 
                      key={item.label} 
                      to={item.path}
                      className="nav-pill-item"
                      style={{
                        background: isActive ? 'rgba(0,0,0,0.05)' : 'transparent'
                      }}
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </Responsive>

            <div 
              style={{
                width: '64px',
                height: '32px',
                background: 'var(--color-dark)',
                borderRadius: '40px',
                padding: '4px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                flexShrink: 0
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

          <div className="title-chart-container">
            <h1 className="main-title">
              {location.pathname === '/board' ? 'Task Board' : 'Dashboard'}
            </h1>
            
            <Responsive layout="desktop">
              {location.pathname === '/' && (
                <div className="chart-container">
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
                    whiteSpace: 'nowrap',
                    zIndex: 10
                  }}>
                    1345 transactions
                    <div style={{ position: 'absolute', bottom: '-4px', left: '50%', transform: 'translateX(-50%)', borderTop: '4px solid var(--color-dark)', borderLeft: '4px solid transparent', borderRight: '4px solid transparent' }} />
                  </div>
                  
                  {chartBars.map((h, i) => (
                    <div key={i} className="chart-bar" style={{ height: `${h}%` }} />
                  ))}
                </div>
              )}
            </Responsive>
          </div>
        </div>

        <div className="bottom-section">
          <Outlet />
        </div>
      </div>
    </div>
  );
};