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
      
      {widgets.length > 0 && (
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
        </div>
      )}

      {/* Floating Action Button (FAB) Bottom Right */}
      <div 
        onClick={() => setModalOpen(true)}
        style={{
          position: 'fixed',
          bottom: '48px',
          right: '48px',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'rgba(20, 20, 20, 0.45)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          boxShadow: '0 0 0 4px rgba(255, 255, 255, 0.05), 0 16px 32px rgba(0,0,0,0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--color-text-light)',
          fontSize: '20px',
          cursor: 'pointer',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          zIndex: 100
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05) translateY(-4px)';
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
          e.currentTarget.style.borderColor = 'var(--color-text-light)';
          e.currentTarget.style.boxShadow = '0 0 0 6px rgba(255, 255, 255, 0.1), 0 20px 40px rgba(0,0,0,0.5)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1) translateY(0)';
          e.currentTarget.style.background = 'rgba(20, 20, 20, 0.45)';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
          e.currentTarget.style.boxShadow = '0 0 0 4px rgba(255, 255, 255, 0.05), 0 16px 32px rgba(0,0,0,0.4)';
        }}
      >
        <PlusOutlined />
      </div>

      <WidgetModal />
    </div>
  );
};