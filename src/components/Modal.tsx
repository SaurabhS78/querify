import { useContext, useState } from "react";
import { buttonStyles } from "../styles/classNames";
import Form from "./Form";
import Store from "../store/Store";
import { observer } from "mobx-react-lite";

const Modal = () => {
  const [showMoreToggle, setShowMoreToggle] = useState<boolean>(false);
  const { RuleGroups, addRuleGroup, getQueryString, getQueryObject } =
    useContext(Store);
  const QueryString = getQueryString();

  const handleSubmit = () => {
    const queryObject = getQueryObject();
    console.log(queryObject);
    alert("Please check console");
  };

  const handleShowMoreToggle = () => {
    setShowMoreToggle(!showMoreToggle);
  };

  return (
    <div className="h-4/5 bg-black rounded-sm w-8/12 shadow-lg flex flex-col">
      <div className="bg-primary px-8 py-6">
        <p className="font-medium text-white">Create tag and query</p>
        {RuleGroups[0].group.children[0].field ? (
          <div
            className={`${
              showMoreToggle ? "flex-col" : "flex-row items-center"
            } flex w-full`}
          >
            <p
              className={` ${
                showMoreToggle ? "" : "truncate"
              } flex-grow text-white text-sm my-1 mx-0.5 bg-indigo-700 p-2 rounded font-medium`}
            >
              <span className="font-bold">Query: </span>
              {QueryString}
            </p>
            <span
              className="text-white text-sm font-medium ml-2 flex-grow-0 cursor-pointer"
              onClick={handleShowMoreToggle}
            >
              {showMoreToggle ? "less" : "more"}...
            </span>
          </div>
        ) : (
          <p className="text-indigo-300 text-sm m-0.5">
            The query you build will be saved in your active view
          </p>
        )}
      </div>

      <div className="px-8 py-6 flex flex-col justify-end flex-grow h-full overflow-auto">
        <div className="w-full pb-6 max-h-full overflow-auto">
          {RuleGroups.map(({ id, group }) => (
            <Form key={id} ruleGroup={group} id={id} />
          ))}
          <button className={buttonStyles} onClick={addRuleGroup}>
            + Add new group filter
          </button>
        </div>
        <div className="w-full">
          <button
            className={`${buttonStyles} bg-grey-100 hover:bg-dark opacity-70`}
          >
            Back
          </button>
          <button
            className={`float-right ${buttonStyles}`}
            onClick={handleSubmit}
          >
            Finish
          </button>
        </div>
      </div>
    </div>
  );
};

export default observer(Modal);
