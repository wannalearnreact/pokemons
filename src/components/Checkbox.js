const Checkbox = ({ name, value, onChange, checked }) => (
    <>
        <input
            type='checkbox'
            name={name}
            value={value}
            onChange={onChange}
            checked={checked}
        />
        <label htmlFor={name}>{value}</label>
    </>
);
export default Checkbox;
