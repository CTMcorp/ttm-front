

// eslint-disable-next-line react/prop-types
const InputRadio = ({type, name, placeholder, className, value, onChange, checked}) => {
    return (
        <div className="inputForm">
            <label htmlFor={name}>{value}</label>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                className={className}
                value={value}
                onChange={onChange}
                checked={checked}/>
        </div>
    );
};

export default InputRadio;