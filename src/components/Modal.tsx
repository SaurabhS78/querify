import { useState } from "react";
import { buttonStyles } from "../styles/classNames";
import Form from "./Form";

const Modal = () => {
  const [filterGroups, setFilterGroups] = useState<number[]>([0]);

  const addFilterGroup = () => {
    setFilterGroups([...filterGroups, filterGroups.length]);
  };

  const removeFilterGroup = () => {
    if (filterGroups.length < 2) return;
    setFilterGroups(filterGroups.slice(0, -1));
  };

  return (
    <div className="h-4/5 bg-black rounded-sm w-8/12 shadow-lg flex flex-col">
      <div className="bg-primary px-8 py-6">
        <p className="font-medium text-white">Create tag and query</p>
        <p className="text-indigo-300 font-sm m-0.5">
          The query you build will be saved in your active view
        </p>
      </div>

      <div className="px-8 py-6 flex flex-col justify-end flex-grow h-full overflow-auto">
        <div className="w-full pb-6 max-h-full overflow-auto">
          {filterGroups.map((i) => (
            <Form key={i} />
          ))}
          <button className={buttonStyles} onClick={addFilterGroup}>
            + Add new group filter
          </button>
        </div>
        <div className="w-full">
          <button
            className={`${buttonStyles} bg-grey-100 hover:bg-dark opacity-70`}
            onClick={removeFilterGroup}
          >
            Back
          </button>
          <button className={`float-right ${buttonStyles}`}>Finish</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
