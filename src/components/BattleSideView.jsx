import { ID } from "../battle/Turn";

export default function BattleSideView({ battle, left, onEventSelection }) {

    const events = battle.log.map(turn => {
        const side = left ? turn.left : turn.right;
        var icon = <div></div>

        if (side.type === ID.FAST_MOVE) {
            icon = <Icon key={turn.count + '+' + turn.over} name="square-solid" style={{ color: COLORS[side.data.type] }} size="small" />;
        } else if (side.type === ID.CHARGED_MOVE) {
            icon = <Icon key={turn.count + '+' + turn.over} name="circle-solid" style={{ color: COLORS[side.data.type] }} size="large" />;
        } else if (side.type === ID.CHARGING) {
            icon = <Icon key={turn.count + '+' + turn.over} name="forward-solid" color="grey" size="large" />;
        } else if (side.type === ID.SHIELDING) {
            icon = <Icon key={turn.count + '+' + turn.over} name="shield-halved-solid" color="pink" size="large" />;
        } else if (side.type === ID.SWITCH_IN) {
            icon = <Icon key={turn.count + '+' + turn.over} name="rotate-solid" color="grey" size="large" />;
        } else if (side.type === ID.FAINTED) {
            icon = <Icon key={turn.count + '+' + turn.over} name="circle-xmark-regular" color="red" fontSize="large" />;
        }

        return (
            <td className="event" key={turn.count + '+' + turn.over}>
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

function Icon({ name, style, color, size }) {
    const src = "./src/assets/" + name + ".svg";
    const s = {...style, width: "15px", height: "15px"};
    return <img
        src={src}
        className="side"
        style={s}
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