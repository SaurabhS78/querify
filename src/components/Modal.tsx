import { useContext } from "react";
import { buttonStyles } from "../styles/classNames";
import Form from "./Form";
import Store from "../store/Store";
import { observer } from "mobx-react-lite";

const Modal = () => {
  const { RuleGroups, addRuleGroup, getQueryString } = useContext(Store);
  const QueryString = getQueryString();

  return (
    <div className="h-4/5 bg-black rounded-sm w-8/12 shadow-lg flex flex-col">
      <div className="bg-primary px-8 py-6">
        <p className="font-medium text-white">Create tag and query</p>
        {RuleGroups[0].group.children[0].field ? (
          <p className="text-white text-sm my-1 mx-0.5 bg-indigo-700 p-2 rounded font-medium">
            <span className="font-bold">Query: </span>
            {QueryString}
          </p>
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
          <button className={`float-right ${buttonStyles}`}>Finish</button>
        </div>
      </div>
    </div>
  );
};

export default observer(Modal);
