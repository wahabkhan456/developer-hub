import React from "react";
import classnames from 'classnames';

const SelectFieldGroup = ({
  placeholder,
  name,
  value,
  onChange,
  info,
  error,
  options
}) => {
    const selectOptions=options.map(option=>{
        return <option key={option.label} value={option.value}>
        {option.label}
        </option>
    });

 return( <div className="form-group">
    <select
      className={classnames("form-control form-control-lg", {
        "is-invalid": error
      })}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
    >
      {selectOptions}
    </select>
    {info && <small className="form-text text-muted">{info}</small>}
    {error && <div className="invalid-feedback">{error}</div>}
  </div>);
};

export default SelectFieldGroup;