import "./modal.css";

export default function Modal({ onClose, children }) {

    const close = () => {
        onClose();
    }

    return (
        <>
            <div className="modal-overlay" />
            <div className="modal-content">
                <div className="modal-header">
                    <a onClick={close}>close</a>
                </div>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </>
    )
}