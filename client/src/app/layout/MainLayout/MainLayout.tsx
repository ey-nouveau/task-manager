import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  AppstoreOutlined, 
  HomeOutlined, 
  LinkOutlined, 
  SettingOutlined, 
  CodeSandboxOutlined 
} from '@ant-design/icons';
import { useState } from 'react';
import { Responsive } from '@/shared/ui/responsive';
import styles from './MainLayout.module.css';

const navItems = [
  { path: '/', label: 'Home', icon: <HomeOutlined /> },
  { path: '/dashboard', label: 'Dashboard', icon: <AppstoreOutlined /> },
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

  const getTopSectionClass = () => {
    if (location.pathname === '/') return `${styles.topSection} ${styles.topSectionHome}`;
    if (location.pathname === '/dashboard') return `${styles.topSection} ${styles.topSectionDashboard}`;
    return `${styles.topSection} ${styles.topSectionMini}`;
  };

  const isNavActive = (item: any) => {
    if (item.path === '/' && item.label === 'Home') return location.pathname === '/';
    if (item.path === '/dashboard') return location.pathname === '/dashboard';
    if (item.path === '/board') return location.pathname === '/board';
    return false;
  };

  return (
    <div className={styles.appContainer}>
      <div className={styles.appWindow}>
        <div className={getTopSectionClass()}>
          <div className={styles.mainHeader}>
            <div style={{ fontSize: '24px' }}>
              <CodeSandboxOutlined />
            </div>

            <Responsive layout="desktop">
              <div className={styles.navPillContainer}>
                {navItems.map((item) => {
                  const isActive = isNavActive(item);
                  return (
                    <Link 
                      key={item.label} 
                      to={item.path}
                      className={`${styles.navPillItem} ${isActive ? styles.navPillItemActive : ''}`}
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </Responsive>

            <Responsive layout="mobile">
              <div className={styles.navPillContainer} style={{ width: '100%', marginTop: '16px' }}>
                {navItems.slice(0, 3).map((item) => {
                  const isActive = isNavActive(item);
                  return (
                    <Link 
                      key={item.label} 
                      to={item.path}
                      className={`${styles.navPillItem} ${isActive ? styles.navPillItemActive : ''}`}
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </Responsive>

            <div 
              className={styles.themeToggle}
              onClick={() => setIsDarkMode(!isDarkMode)}
            >
              <div className={`${styles.themeThumb} ${isDarkMode ? styles.themeThumbDark : ''}`}>
                {isDarkMode ? '🌙' : '☀️'}
              </div>
            </div>
          </div>

          <div className={styles.titleChartContainer}>
            {location.pathname !== '/' && (
              <h1 className={styles.mainTitle}>
                {location.pathname === '/board' ? 'Task Board' : 'Dashboard'}
              </h1>
            )}
            
            <Responsive layout="desktop">
              {location.pathname === '/dashboard' && (
                <div className={styles.chartContainer}>
                  <div className={styles.chartTooltip}>
                    1345 transactions
                    <div className={styles.chartTooltipArrow} />
                  </div>
                  
                  {chartBars.map((h, i) => (
                    <div key={i} className={styles.chartBar} style={{ height: `${h}%` }} />
                  ))}
                </div>
              )}
            </Responsive>
          </div>
        </div>

        <div className={`${styles.bottomSection} ${location.pathname === '/' ? styles.bottomSectionHome : ''}`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
