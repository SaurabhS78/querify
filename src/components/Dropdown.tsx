import { useState } from "react";
import downArrow from "../assets/icons/arrowDown.svg";
import { dropdownBtnStyle } from "../styles/classNames";

export interface dropdownProps {
  placeholder: string;
  options: {
    title: string;
    value: string[];
  }[];
  selected: string;
  setSelected: (value: string) => void;
  title: string;
}

const Dropdown = (props: dropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const handleClick = (value: string) => {
    props.setSelected(value);
    toggle();
  };

  return (
    <div className="relative">
      <p className="mb-2 text-xs text-white font-medium">{props.title}</p>

      <button
        onClick={toggle}
        className={`${dropdownBtnStyle} text-white ${
          props.selected
            ? "bg-grey-400 border border-grey-300"
            : "opacity-50 bg-grey-300"
        }`}
      >
        {props.selected || props.placeholder}
        <img alt="" src={downArrow} className="absolute right-2 top-8" />
      </button>

      <div
        className={`${
          !isOpen && "hidden"
        } absolute py-3.5 px-2 bg-dark border border-grey-200 z-10 rounded-md top-16 w-60 max-h-36 overflow-y-auto`}
      >
        {props.options.map(({ title, value }) => (
          <div key={title}>
            <p className="text-white opacity-50 text-xs mb-2 tracking-widest font-medium">
              {title}
            </p>
            <div className="flex flex-col">
              {value.map((v) => (
                <button
                  className="py-1 px-2 text-left text-white text-sm hover:bg-grey-300 rounded-md"
                  key={v}
                  onClick={() => handleClick(v)}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
