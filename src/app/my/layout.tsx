import { LayoutProps } from '@/typings/commonTypes';

const MyLayout = ({ children }: LayoutProps) => {
  return (
    <div className="page-container mx-auto flex h-full flex-col items-center justify-center">
      {children}
    </div>
  );
};

export default MyLayout;
