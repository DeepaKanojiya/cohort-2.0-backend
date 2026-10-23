import React from "react";

function FormGroup({
  label,
  value = "",
  onChange,
  placeholder,
  type,
}) {
  const inputType = type || (label?.toLowerCase().includes("password") ? "password" : "text");
  const inputId = label?.toLowerCase().replace(/\s+/g, "-") || "form-field";

  return (
    <div className="form-group">
      <label htmlFor={inputId}>{label}</label>
      <input
        id={inputId}
        type={inputType}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        autoComplete={inputType === "password" ? "current-password" : "off"}
      />
    </div>
  );
}

export default FormGroup;
