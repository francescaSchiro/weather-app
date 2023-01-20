import { FC } from "react";
import { LABELS } from "../../constants";

interface ITabs {
	activeTab: string;
	onTabClick: (tab: string) => void;
};

const Tabs: FC<ITabs> = ({ activeTab, onTabClick }) => {

	return (
		<div className='tabs'>

			<div
				data-cy={LABELS.TABS[0]}
				className={`tabs__tab ${activeTab === LABELS.TABS[0] ? "tabs__tab--active" : ""}`}
				onClick={() => onTabClick(LABELS.TABS[0])}
			>{LABELS.TABS[0]}
			</div>
			<div
				data-cy={LABELS.TABS[1]}
				className={`tabs__tab ${activeTab === LABELS.TABS[1] ? "tabs__tab--active" : ""}`}
				onClick={() => onTabClick(LABELS.TABS[1])}
			>{LABELS.TABS[1]}
			</div>

		</div>
	)
};

export default Tabs;