import React from "react";
import PropTypes from "prop-types";
import classnames from 'classnames';

const TextFieldGroup = ({
  type,
  placeholder,
  onChange,
  value,
  name,
  disabled,
  error,
  info
}) => {
  return (
    <div className="form-group">
      <input
        type={type}
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  disabled: PropTypes.string
};

TextFieldGroup.defaultProps = {
  type: "text"
};

export default TextFieldGroup;
