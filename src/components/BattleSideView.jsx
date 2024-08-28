import { ID } from "../battle/Turn";
import Event from "./Event";

export default function BattleSideView({ battle, left, onSelectTurn }) {

    const events = battle.log.map(turn => {
        const side = left ? turn.left : turn.right;
        var icon = <div></div>

        if (side.type === ID.FAST_MOVE) {
            icon = <Event key={turn.count + '+' + turn.over} name="fast_move" type={side.data.type} size="small" />;
        } else if (side.type === ID.CHARGED_MOVE) {
            icon = <Event key={turn.count + '+' + turn.over} name="charged_move" type={side.data.type} size="large" />;
        } else if (side.type === ID.CHARGING) {
            icon = <Event key={turn.count + '+' + turn.over} name="charging" color="grey" size="large" />;
        } else if (side.type === ID.SHIELDING) {
            icon = <Event key={turn.count + '+' + turn.over} name="shielding" color="pink" size="large" />;
        } else if (side.type === ID.SWITCH_IN) {
            icon = <Event key={turn.count + '+' + turn.over} name="switch_in" color="grey" size="large" />;
        } else if (side.type === ID.FAINTED) {
            icon = <Event key={turn.count + '+' + turn.over} name="fainted" color="red" size="large" />;
        }

        return (
            <td
                className="event"
                key={turn.count + '+' + turn.over}
                onMouseEnter={() => onSelectTurn(turn, true)}
                onMouseLeave={() => onSelectTurn(turn, false)}
            >
                {icon}
                {/* <Popup
                    trigger={icon}
                    onTrigger={() => onSelectTurn(turn)}
                    text={side.text}
                    disabled={!side.text}
                /> */}
            </td>
        )
    });

    return (
        <tr className={`battle-side-${left ? "left" : "right"}`}>
            {events}
        </tr>
    )
}