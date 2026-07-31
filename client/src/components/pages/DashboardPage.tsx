import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import { Switch } from 'antd';

const Card = ({ 
  title, 
  value, 
  bg, 
  textColor, 
  icon,
  style = {}
}: { 
  title?: string, 
  value?: string | React.ReactNode, 
  bg: string, 
  textColor: string,
  icon?: React.ReactNode,
  style?: React.CSSProperties
}) => (
  <div style={{
    background: bg,
    color: textColor,
    borderRadius: '16px',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '160px',
    position: 'relative',
    ...style
  }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      {title && <div style={{ fontSize: '14px', fontWeight: 500 }}>{title}</div>}
      {icon && <div style={{ opacity: 0.8, cursor: 'pointer' }}>{icon}</div>}
    </div>
    {value && <div style={{ fontSize: '40px', fontWeight: 500, letterSpacing: '-0.02em', marginTop: '16px' }}>{value}</div>}
  </div>
);

export const DashboardPage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '100%', height: '100%' }}>
      
      {/* Row 1: Analytics */}
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
         <div className="hidden-mobile" style={{ flex: 1, minWidth: '200px' }} /> {/* Empty left half */}
         
         <div style={{ flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div className="section-title">Analytics</div>
            <div style={{ display: 'flex', gap: '16px' }}>
               <Card 
                 title="Avg time on page"
                 value="4m"
                 bg="var(--color-dark-grey)"
                 textColor="var(--color-text-light)"
                 icon={<EllipsisOutlined />}
                 style={{ flex: 1 }}
               />
               <Card 
                 title="Real-time Monitoring"
                 value="Off"
                 bg="var(--color-light-grey)"
                 textColor="var(--color-text-dark)"
                 icon={<Switch defaultChecked={false} size="small" style={{ background: 'var(--color-dark)' }} />}
                 style={{ flex: 1 }}
               />
            </div>
         </div>
      </div>

      {/* Row 2: Sales Overview */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
         <div className="section-title">Sales Overview</div>
         
         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
            <Card 
              title="Visits"
              value="8,920"
              bg="var(--color-orange)"
              textColor="var(--color-text-dark)"
              icon={<EllipsisOutlined />}
            />
            <Card 
              title="Transactions"
              value="1,345"
              bg="var(--color-orange)"
              textColor="var(--color-text-dark)"
              icon={<EllipsisOutlined />}
            />
            <Card 
              title="Registered Members"
              value="663"
              bg="var(--color-yellow)"
              textColor="var(--color-text-dark)"
              icon={<EllipsisOutlined />}
            />
            <Card 
              title="Online Members"
              value="234"
              bg="var(--color-orange)"
              textColor="var(--color-text-dark)"
              icon={<EllipsisOutlined />}
            />
            
            {/* Row 2 implicit via Grid auto-placement. We want Income under Transactions (col 2), and Add under Online Members (col 4). */}
            <div className="hidden-mobile" /> {/* Empty col 1 */}
            <Card 
              title="Income"
              value="$7,312"
              bg="var(--color-green)"
              textColor="var(--color-text-dark)"
              icon={
                <div style={{ display: 'flex', gap: '8px', border: '1px solid rgba(0,0,0,0.2)', borderRadius: '20px', padding: '2px 8px', fontSize: '10px' }}>
                  <span style={{ fontWeight: 500 }}>Daily</span>
                  <span style={{ opacity: 0.5 }}>Weekly</span>
                </div>
              }
            />
            <div className="hidden-mobile" /> {/* Empty col 3 */}
            <Card 
              value="Add"
              bg="var(--color-dark-grey)"
              textColor="var(--color-text-light)"
              icon={
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--color-orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-dark)' }}>
                  <PlusOutlined style={{ fontSize: '14px' }} />
                </div>
              }
              style={{ justifyContent: 'flex-end' }}
            />
         </div>
      </div>

    </div>
  );
};