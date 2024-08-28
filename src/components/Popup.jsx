import { useState } from "react";
import "./Popup.css";

export default function Popup({ trigger, onTrigger, text, disabled }) {
    const [show, setShow] = useState(false);

    const handleMouseEnter = () => {
        setShow(true);
        onTrigger();
    }

    const handleMouseLeave = () => {
        setShow(false);
    }

    return (
        <div className="popup" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {trigger}
            <div className={`popuptext ${show ? "show": ""}`}>
                {text}
            </div>
        </div>
    )
}