import "./custom-btn.styles.scss";

const BUTTON_TYPE_CLASS = {
  google: "google-sign-in",
  inverted: "inverted",
};

const Button = ({ children, buttonType, ...otherProps }) => {
  return (
    <button
      {...otherProps}
      className={`button-container ${BUTTON_TYPE_CLASS[buttonType]}`}
    >
      {children}
    </button>
  );
};

export default Button;
