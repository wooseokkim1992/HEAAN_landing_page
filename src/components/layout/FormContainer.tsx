interface FormContainerProps {
  children: React.ReactNode;
}

const FormContainer = ({ children }: FormContainerProps) => {
  return (
    <div className="bg-bg01 border-bg02 flex w-full flex-col rounded border p-4 sm:max-w-[536px] sm:p-8">
      {children}
    </div>
  );
};

export default FormContainer;
