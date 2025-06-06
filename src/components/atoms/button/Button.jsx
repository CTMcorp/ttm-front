import("./button.scss");

// eslint-disable-next-line react/prop-types
const Button = ({ text, type, onClick, className }) => {
  return (
    <button className={`buttons ${className}`} type={type} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
