import { useIsMobile } from '@/shared/lib/hooks/useIsMobile';
import type { ReactNode } from 'react';

export type ResponsiveLayout = 'mobile' | 'desktop';

export const Responsive = ({
  children,
  layout = 'mobile'
}: {
  layout?: ResponsiveLayout;
  children: ReactNode;
}) => {
  const isMobile = useIsMobile();
  const shouldRender = (layout === 'mobile' && isMobile) || (layout === 'desktop' && !isMobile);

  return shouldRender ? children : null;
};