import React, { useEffect, useState } from "react";
import { areaList } from "../../config/components";
import { createModule, deleteModule } from "../../services/Modules/ModulesApi";
import Actionhandler from "../ActionHandler/ActionHandler";
import Reactionhandler from "../ReactionHandler/ReactionHandler";
import "./AREACard.css";

type Modules = {
  _actionUUID: string;
  _actionID: number;
  _actionSavedValue: string[];
  _reactionUUID: string;
  _reactionID: number;
  _reactionSavedValue: string[];
};

const AREACard: React.FC<{ module?: Modules }> = ({ module }) => {
  const [actionArgs, setActionArgs] = useState<string[]>([]);
  const [reactionArgs, setReactionArgs] = useState<string[]>([]);

  const [currentAction, setCurrentAction] = useState<number>(1);
  const [currentReaction, setCurrentReaction] = useState<number>(1);

  useEffect(() => {
    if (module) {
      console.log(module._actionSavedValue);
      setActionArgs(module._actionSavedValue);
      setReactionArgs(module._reactionSavedValue);
    }
  }, [module]);

  const handleDelete = async () => {
    await deleteModule({
      token: localStorage.getItem("token") || "invalid_token",
      data: {
        _actionUUID: module._actionUUID,
        _actionID: module._actionID,
        _actionSavedValue: actionArgs,
        _reactionUUID: module._reactionUUID,
        _reactionID: module._reactionID,
        _reactionSavedValue: reactionArgs,
      },
    });
  };

  const handleCreate = async () => {
    await createModule({
      token: localStorage.getItem("token") || "invalid_token",
      data: {
        _actionUUID: "-1",
        _actionID: currentAction,
        _actionSavedValue: actionArgs,
        _reactionUUID: "-1",
        _reactionID: currentReaction,
        _reactionSavedValue: reactionArgs,
      },
    });
  };

  return (
    <div className="areacard">
      <div className="aligned">
        {!module && (
          <>
            <h1 className="new_title">NEW ACTION</h1>
            <select
              name="action"
              id="action-select"
              onChange={(event) => {
                setCurrentAction(parseInt(event.target.value));
              }}
            >
              {areaList &&
                areaList.map(
                  (action: any) =>
                    action.id <= 16 && (
                      <option value={action.id} key={"action" + action.id}>
                        {action.name}
                      </option>
                    )
                )}
            </select>
            <Actionhandler
              id={currentAction}
              uuid={"0"}
              savedValue={[]}
              newComponent={true}
              setArgs={setActionArgs}
            />
          </>
        )}
        {module && (
          <>
            <h1 className="new_title">ACTION</h1>
            <Actionhandler
              id={module._actionID}
              uuid={module._actionUUID}
              savedValue={module._actionSavedValue}
              newComponent={false}
              setArgs={setActionArgs}
            />
          </>
        )}

        <div className="separator-container">
          <hr />
        </div>

        {!module && (
          <>
            <h1 className="new_title">NEW REACTION</h1>
            <select
              name="reaction"
              id="reaction-select"
              onChange={(event) => {
                setCurrentReaction(parseInt(event.target.value));
              }}
            >
              {areaList &&
                areaList.map(
                  (reaction: any) =>
                    reaction.id >= 17 && (
                      <option
                        value={reaction.id}
                        key={"reaction" + reaction.id}
                      >
                        {reaction.name}
                      </option>
                    )
                )}
            </select>
            <Reactionhandler
              id={currentReaction}
              uuid={"0"}
              savedValue={[]}
              newComponent={true}
              setArgs={setReactionArgs}
            />
          </>
        )}
        {module && (
          <>
            <h1 className="new_title">REACTION</h1>
            <Reactionhandler
              id={module._reactionID}
              uuid={module._reactionUUID}
              savedValue={module._reactionSavedValue}
              newComponent={false}
              setArgs={setReactionArgs}
            />
          </>
        )}
        <br />
        <br />
        {module && (
          <nav>
            <ul>
              <li onClick={handleDelete}>
                Delete
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </li>
            </ul>
          </nav>
        )}
        {!module && (
          <nav>
            <ul>
              <li onClick={handleCreate}>
                Create
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
};

export default AREACard;
