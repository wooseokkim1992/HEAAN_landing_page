interface TermsContainerProps {
  children: React.ReactNode;
}

const TermsContainer = ({ children }: TermsContainerProps) => {
  return (
    <div className="bg-bg01 border-bg02 flex w-full flex-col rounded border p-4 sm:w-fit md:p-8">
      {children}
    </div>
  );
};

export default TermsContainer;
