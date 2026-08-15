import React from "react";
import { FiAlertCircle } from "react-icons/fi";

const InputField = ({
  label,
  name,
  type = "text",
  register,
  placeholder,
  errors,
  rules = {},
}) => {
  const hasError = errors?.[name];

  return (
    <div className="mb-5">
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-gray-700 mb-2"
      >
        {label}
      </label>

      {type === "textarea" ? (
        <textarea
          id={name}
          {...register(name, rules)}
          placeholder={placeholder}
          rows={5}
          className={`
            w-full
            px-4
            py-3
            rounded-xl
            border
            bg-gray-50
            text-gray-800
            outline-none
            resize-none
            transition-all
            duration-300
            placeholder:text-gray-400
            focus:bg-white
            focus:ring-2
            ${
              hasError
                ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                : "border-gray-200 focus:border-blue-500 focus:ring-blue-100"
            }
          `}
        />
      ) : (
        <input
          id={name}
          type={type}
          {...register(name, rules)}
          placeholder={placeholder}
          className={`
            w-full
            px-4
            py-3
            rounded-xl
            border
            bg-gray-50
            text-gray-800
            outline-none
            transition-all
            duration-300
            placeholder:text-gray-400
            focus:bg-white
            focus:ring-2
            ${
              hasError
                ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                : "border-gray-200 focus:border-blue-500 focus:ring-blue-100"
            }
          `}
        />
      )}

      {hasError && (
        <div className="flex items-center gap-1 mt-1.5 text-red-500">
          <FiAlertCircle className="text-xs" />

          <p className="text-xs">
            {errors[name]?.message || `${label} is required`}
          </p>
        </div>
      )}
    </div>
  );
};

export default InputField;