import AREACard from "../../components/AREACard/AREACard";
import "./Home.css";
import { useEffect, useState } from "react";
import { getModules } from "../../services/Modules/ModulesApi";

type Modules = {
  _actionUUID: string;
  _actionID: number;
  _actionSavedValue: string[];
  _reactionUUID: string;
  _reactionID: number;
  _reactionSavedValue: string[];
};

const Home = () => {
  const handleDisconnect = () => {
    window.localStorage.clear();
    window.location.reload();
  };

  const [moduleList, setModuleList] = useState<Modules[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (isLoaded) return;
    (async () => {
      const tmp = await getModules({
        token: window.localStorage.getItem("token") + "",
      });
      setModuleList(tmp);
      setIsLoaded(true);
    })();
  }, [isLoaded]);

  return (
    <>
      <div className="home-container">
        <h1 className="home-title">HOME</h1>
        <AREACard />
        {moduleList &&
          moduleList.map((module: Modules) => (
            <AREACard
              key={module._actionUUID + module._reactionUUID + ""}
              module={module}
            />
          ))}
        <nav>
            <ul>
              <li onClick={handleDisconnect}>
                Disconnect
                <span></span><span></span><span></span><span></span>
              </li>
            </ul>
          </nav>
      </div>
    </>
  );
};

export default Home;
