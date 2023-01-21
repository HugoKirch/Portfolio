import TESTACTION from "../components/ActionComponent/TESTACTION";
import DiscordPostMessage from "../components/ReactionComponent/DiscordPostMessage";
import TwilioSendSMS from "../components/ReactionComponent/TwilioSendSMS";
import TwitterPostTweet from "../components/ReactionComponent/TwitterPostTweet";
import AviationstackCancelledFlight from "../components/ActionComponent/AviationstackCancelledFlight";
import AviationstackDelayArrival from "../components/ActionComponent/AviationstackDelayArrival";
import AviationstackDelayDeparture from "../components/ActionComponent/AviationstackDelayDeparture";
import GithubEverything from "../components/ActionComponent/GithubEverything";
import GitlabEverything from "../components/ActionComponent/GitlabEverything";
import Mediastack from "../components/ActionComponent/Mediastack";
import SportdataioNBAOn from "../components/ActionComponent/SportdataioNBAOn";
import SportdataioNBAScheduled from "../components/ActionComponent/SportdataioNBAScheduled";
import SportdataioNBATeamStat from "../components/ActionComponent/SportdataioNBATeamStat";
import TwilioReceiveSMS from "../components/ActionComponent/TwilioReceiveSMS";
import WeatherstackHumidity from "../components/ActionComponent/WeatherstackHumidity";
import WeatherstackLastUpdate from "../components/ActionComponent/WeatherstackLastUpdate";
import WeatherstackPrecip from "../components/ActionComponent/WeatherstackPrecip";
import WeatherstackTemperature from "../components/ActionComponent/WeatherstackTemperature";
import WeatherstackWindspeed from "../components/ActionComponent/WeatherstackWindspeed";
import DiscordMessageDetection from "../components/ActionComponent/DiscordMessageDetection";

export const areaList = [
    //ACTION
    { id: 1, component: AviationstackCancelledFlight, name: "AviationstackCancelledFlight" },
    { id: 2, component: AviationstackDelayArrival, name: "AviationstackDelayArrival" },
    { id: 3, component: AviationstackDelayDeparture, name: "AviationstackDelayDeparture" },
    { id: 4, component: GithubEverything, name: "GithubEverything" },
    { id: 5, component: GitlabEverything, name: "GitlabEverything" },
    { id: 6, component: Mediastack, name: "Mediastack" },
    { id: 7, component: SportdataioNBAOn, name: "SportdataioNBAOn" },
    { id: 8, component: SportdataioNBAScheduled, name: "SportdataioNBAScheduled" },
    { id: 9, component: SportdataioNBATeamStat, name: "SportdataioNBATeamStat" },
    { id: 10, component: TwilioReceiveSMS, name: "TwilioReceiveSMS" },
    { id: 11, component: WeatherstackHumidity, name: "WeatherstackHumidity" },
    { id: 12, component: WeatherstackLastUpdate, name: "WeatherstackLastUpdate" },
    { id: 13, component: WeatherstackPrecip, name: "WeatherstackPrecip" },
    { id: 14, component: WeatherstackTemperature, name: "WeatherstackTemperature" },
    { id: 15, component: WeatherstackWindspeed, name: "WeatherstackWindspeed" },
    { id: 16, component: DiscordMessageDetection, name: "DiscordMessageDetection" },

    //REACTION
    { id: 17, component: TwilioSendSMS, name: "TwilioSendSMS" },
    { id: 18, component: TwitterPostTweet, name: "TwitterPostTweet" },
    { id: 19, component: DiscordPostMessage, name: "DiscordPostMessage" },
];