import { useRef } from "react";
import { dropdownBtnStyle } from "../styles/classNames";

type InputProps = {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type: string;
  label: string;
};

const InputField = (props: InputProps) => {
  const DatePickerRef1 = useRef<HTMLInputElement>(null);
  const DatePickerRef2 = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(e.target.value);
  };

  const handleDatepickerChange = () => {
    props.onChange(
      `${DatePickerRef1.current?.value}-${DatePickerRef2.current?.value}`
    );
  };

  if (props.type === "date")
    return (
      <div>
        <p className="mb-2 text-xs text-white font-medium">{props.label}</p>
        <div className="flex w-72 gap-x-1">
          <input
            className="py-2 px-4 rounded-md font-medium text-sm text-left bg-grey-400 text-white"
            placeholder={props.placeholder}
            type={props.type}
            onBlur={handleDatepickerChange}
            ref={DatePickerRef1}
          />
          <input
            className="py-2 px-4 rounded-md font-medium text-sm text-left bg-grey-400 text-white"
            placeholder={props.placeholder}
            type={props.type}
            onBlur={handleDatepickerChange}
            ref={DatePickerRef2}
          />
        </div>
      </div>
    );

  return (
    <div>
      <p className="mb-2 text-xs text-white font-medium">{props.label}</p>
      <input
        placeholder={props.placeholder}
        className={`${dropdownBtnStyle} bg-grey-400 text-white focus:outline-none`}
        maxLength={props.type === "text" ? 20 : undefined}
        value={props.value}
        onChange={handleChange}
        type={props.type}
      />
    </div>
  );
};

export default InputField;
