import BattleSideView from "./BattleSideView";
import "./Battle.css";

export default function BattleView({ battle, onSelectTurn }) {
    return (
        <div className="battle">
            <table>
                <tbody>
                    <BattleSideView battle={battle} onSelectTurn={onSelectTurn} left />
                    <BattleSideView battle={battle} onSelectTurn={onSelectTurn} />
                </tbody>
            </table>
        </div>
    )
}