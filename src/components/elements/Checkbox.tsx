import IconCheckboxEmpty from "@/assets/checkbox_empty.svg";
import IconCheckboxFilled from "@/assets/checkbox_filled.svg";

interface CheckboxProps {
  checkboxText: string;
  checked: boolean;
  handleChecked: () => void;
  isEmphasized?: boolean;
}

const Checkbox = ({
  checkboxText,
  checked,
  handleChecked,
  isEmphasized = false,
}: CheckboxProps) => {
  return (
    <label
      className="flex w-fit cursor-pointer items-center gap-2"
      onChange={handleChecked}
    >
      <input
        type="checkbox"
        id={`checkbox-${checkboxText}`}
        className="a11y-hidden"
      />
      {checked ? (
        <IconCheckboxFilled className="fill-blue03 min-w-6" />
      ) : (
        <IconCheckboxEmpty className="fill-text04 min-w-6" />
      )}
      <span
        className={`${isEmphasized ? "font-bold underline" : ""} text-text01`}
      >
        {checkboxText}
      </span>
    </label>
  );
};

export default Checkbox;
