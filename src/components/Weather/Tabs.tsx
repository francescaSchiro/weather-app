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
				data-cy="today"
				className={`tabs__tab ${activeTab === "today" ? "tabs__tab--active" : ""}`}
				onClick={() => onTabClick("today")}
			>Today
			</div>
			<div
				data-cy="3days"
				className={`tabs__tab ${activeTab === "3days" ? "tabs__tab--active" : ""}`}
				onClick={() => onTabClick("3days")}
			>3 days
			</div>

		</div>
	)
};

export default Tabs;