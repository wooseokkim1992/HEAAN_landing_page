import FormContainer from '@/components/layout/FormContainer';
import { LayoutProps } from '@/types/commonTypes';

const FormLayout = ({ children }: LayoutProps) => {
  return (
    <div className="page-container mx-auto flex h-full min-h-screen flex-col items-center justify-center">
      <FormContainer>{children}</FormContainer>
    </div>
  );
};

export default FormLayout;
