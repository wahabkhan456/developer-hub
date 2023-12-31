import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const TextAreaFieldGroup = ({
    name,
    error,
    value,
    onChange,
    info,
    placeholder
}) => {
    return (

        <div className="form-group">
      <textarea
       
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
}

TextAreaFieldGroup.propTypes={
    name:PropTypes.string.isRequired,
    error:PropTypes.string,
    info:PropTypes.string,
    onChange:PropTypes.func.isRequired,
    placeholder:PropTypes.string,
    value:PropTypes.string.isRequired,
}

export default TextAreaFieldGroup;