import TermsContainer from "@/components/layout/TermsContainer";
import { LayoutProps } from "@/types/commonTypes";

const TermsLayout = ({ children }: LayoutProps) => {
  return (
    <div className="page-container mx-auto flex h-full flex-col items-center justify-center">
      <div className="mt-30 mb-20 md:mt-[210px] md:mb-50">
        <TermsContainer>{children}</TermsContainer>
      </div>
    </div>
  );
};

export default TermsLayout;
