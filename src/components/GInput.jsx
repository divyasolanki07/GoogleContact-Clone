import React from 'react';

const GInput = ({ label, name, val, onChange, type = 'text' }) => {
  return (
    <div className="google-input-wrap">
      <input
        className="google-input"
        type={type}
        name={name}
        placeholder=" "
        value={val || ''}
        onChange={onChange}
        autoComplete="off"
      />
      <label className="google-label">{label}</label>
    </div>
  );
};

export default GInput;
