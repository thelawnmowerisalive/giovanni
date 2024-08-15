import BattleSideView from "./BattleSideView";
import "./Battle.css";

export default function BattleView({ battle }) {

    const handleEventSelection = () => {
        
    }

    return (
        <div className="battle">
            <table>
                <tbody>
                    <BattleSideView battle={battle} onEventSelection={handleEventSelection} left />
                    <BattleSideView battle={battle} onEventSelection={handleEventSelection} />
                </tbody>
            </table>
        </div>
    )
}