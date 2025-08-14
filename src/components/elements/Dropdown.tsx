import { useState } from "react";

import IconArrow from "@/assets/arrow.svg";

interface DropdownProps {
  placeholder: string;
  target: string;
  handleTarget: (target: string) => void;
  optionArr: string[];
}

const Dropdown = ({
  placeholder,
  target,
  handleTarget,
  optionArr = [],
}: DropdownProps) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);

  return (
    <div className="relative h-10 w-60">
      <div
        className={`border-bg02 bg-bg00 flex h-10 w-full cursor-pointer items-center justify-between border px-4 ${showOptions ? "rounded-tl rounded-tr" : "rounded"}`}
        onClick={() => setShowOptions((prev) => !prev)}
      >
        <span
          className={`flex-1 overflow-hidden text-ellipsis ${showOptions || !!target ? "text-text01" : "text-text04"}`}
        >
          {!!target ? target : placeholder}
        </span>
        <IconArrow
          className={`h-4 w-4 transition-all duration-500 ease-in-out ${
            showOptions ? `fill-text01` : "fill-text04 rotate-[180deg]"
          }`}
        />
      </div>
      {showOptions ? (
        <ul
          className={`scrollbar-none w-full ${
            optionArr.length > 5 ? `h-40` : `h-auto`
          } bg-bg01 border-bg02 top-10 left-0 z-10 overflow-hidden overflow-y-scroll rounded-b border border-t-transparent`}
        >
          {optionArr.map((val, i) => (
            <li
              key={`${val}-${i}`}
              className={`border-bg02 bg-bg00 flex h-10 w-full cursor-pointer items-center pl-4 ${
                i === optionArr.length - 1
                  ? `rounded-br rounded-bl`
                  : `border-b`
              } hover:bg-bg01 text-text01 overflow-hidden text-ellipsis hover:cursor-pointer`}
              onClick={() => {
                handleTarget(val);
                setShowOptions((prev) => !prev);
              }}
            >
              <span>{val}</span>
            </li>
          ))}
        </ul>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Dropdown;
