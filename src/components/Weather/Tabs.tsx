import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";



interface ITabs {
    activeTab: "today" | "3days";
    onTabClick: (tab: "today" | "3days") => void;
};
export type ITab = "today" | "3days";



const Tabs: FC<ITabs> = ({ activeTab, onTabClick }) => {

    return (
        <div className='tabs'>
            <div
                className={`tab ${activeTab === "today" ? "active" : ""}`}
                onClick={() => onTabClick("today")}
            >Today<FontAwesomeIcon icon={faCoffee} /></div>
            <div
                className={`tab ${activeTab === "3days" ? "active" : ""}`}
                onClick={() => onTabClick("3days")}
            >3 days</div>
        </div>
    )
};

export default Tabs;