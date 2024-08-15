import { ID } from "../battle/Turn";

export default function BattleSideView({ battle, left, onSelectTurn }) {

    const events = battle.log.map(turn => {
        const side = left ? turn.left : turn.right;
        var icon = <div></div>

        if (side.type === ID.FAST_MOVE) {
            icon = <Icon key={turn.count + '+' + turn.over} name="fast_move" color={COLORS[side.data.type]} size="small" />;
        } else if (side.type === ID.CHARGED_MOVE) {
            icon = <Icon key={turn.count + '+' + turn.over} name="charged_move" color={COLORS[side.data.type]} size="large" />;
        } else if (side.type === ID.CHARGING) {
            icon = <Icon key={turn.count + '+' + turn.over} name="charging" color="grey" size="large" />;
        } else if (side.type === ID.SHIELDING) {
            icon = <Icon key={turn.count + '+' + turn.over} name="shielding" color="pink" size="large" />;
        } else if (side.type === ID.SWITCH_IN) {
            icon = <Icon key={turn.count + '+' + turn.over} name="switch_in" color="grey" size="large" />;
        } else if (side.type === ID.FAINTED) {
            icon = <Icon key={turn.count + '+' + turn.over} name="fainted" color="red" size="large" />;
        }

        return (
            <td className="event" onMouseMove={() => onSelectTurn(turn)} key={turn.count + '+' + turn.over}>
                {icon}
                {/* <Popup content={side.text} disabled={!side.text} trigger={icon} onOpen={selectEvent}></Popup> */}
            </td>
        )
    });

    return (
        <tr className="battle-side">
            {events}
        </tr>
    )
}

function Icon({ name, color, size, onClick }) {
    const style = { backgroundColor: color };
    return <i
        className={`icon ${name} ${size}`}
        style={style}
    />
}

const COLORS = {
    NONE: 'gray',
    BUG: '#91A119',
    DARK: '#624D4E',
    DRAGON: '#5060E1',
    ELECTRIC: '#FAC000',
    FAIRY: '#EF70EF',
    FIGHTING: '#FF8000',
    FIRE: '#E62829',
    FLYING: '#81B9EF',
    GHOST: '#704170',
    GRASS: '#3FA129',
    GROUND: '#915121',
    ICE: '#3DCEF3',
    NORMAL: '#9FA19F',
    POISON: '#9141CB',
    PSYCHIC: '#EF4179',
    ROCK: '#AFA981',
    STEEL: '#60A1B8',
    WATER: '#2980EF'
}