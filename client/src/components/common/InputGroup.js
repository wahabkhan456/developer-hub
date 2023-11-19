import React from "react";
import PropTypes from "prop-types";
import classnames from 'classnames';

const InputGroup = ({
  type,
  placeholder,
  onChange,
  value,
  name,
  icon,
  error,
  info
}) => {
  return (
    <div className="input-group mb-3">
    <div className="input-group-prepend">
    <span className="input-group-text">
    <i className={icon}/>
    </span>
    </div>
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

InputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  info: PropTypes.string,
  icon:PropTypes.string.isRequired,
  error: PropTypes.string
};

InputGroup.defaultProps = {
  type: "text"
};

export default InputGroup;
