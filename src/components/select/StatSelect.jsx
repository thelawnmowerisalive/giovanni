export default function StatSelect({ id, label, value, onChange }) {

    return (
        <div className="formItem">
            <label htmlFor={id}>{label}</label>
            <input
                type="number"
                min={1} max={15}
                id={id}
                name={id}
                value={value}
                onChange={onChange}
            />
        </div>
    )
}