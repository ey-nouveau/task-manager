import { PlusOutlined } from '@ant-design/icons';
import { useWidgetStore } from '../../store/useWidgetStore';
import { WidgetModal } from '../organisms/WidgetModal';
import { WidgetCard } from '../molecules/WidgetCard';

export const HomePage = () => {
  const bgUrl = import.meta.env.BASE_URL + 'vibey-bg.png';
  const { widgets, setModalOpen } = useWidgetStore();

  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundImage: `url("${bgUrl}")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      position: 'relative',
      overflowY: 'auto',
      padding: '120px 48px 48px 48px' // offset for header
    }}>
      
      {widgets.length === 0 ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <div 
            onClick={() => setModalOpen(true)}
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(20, 20, 20, 0.4)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 16px 32px rgba(0,0,0,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-text-light)',
              fontSize: '24px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.background = 'rgba(20, 20, 20, 0.4)';
            }}
          >
            <PlusOutlined />
          </div>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '24px',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          {widgets.map(w => (
            <WidgetCard key={w.id} widget={w} />
          ))}
          
          {/* Add Widget Button (Grid Item) */}
          <div 
            onClick={() => setModalOpen(true)}
            style={{
              height: '350px',
              background: 'rgba(20, 20, 20, 0.2)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px dashed rgba(255, 255, 255, 0.15)',
              borderRadius: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'rgba(255,255,255,0.5)',
              fontSize: '24px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(20, 20, 20, 0.4)';
              e.currentTarget.style.color = 'var(--color-text-light)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(20, 20, 20, 0.2)';
              e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
            }}
          >
            <PlusOutlined />
          </div>
        </div>
      )}

      <WidgetModal />
    </div>
  );
};