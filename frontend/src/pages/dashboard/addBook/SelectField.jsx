import React from "react";
import { FiChevronDown, FiAlertCircle } from "react-icons/fi";

const SelectField = ({
  label,
  name,
  options,
  register,
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

      <div className="relative">
        <select
          id={name}
          {...register(name, rules)}
          className={`
            appearance-none
            w-full
            px-4
            py-3
            pr-10
            rounded-xl
            border
            bg-gray-50
            text-gray-800
            outline-none
            cursor-pointer
            transition-all
            duration-300
            focus:bg-white
            focus:ring-2
            ${
              hasError
                ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                : "border-gray-200 focus:border-blue-500 focus:ring-blue-100"
            }
          `}
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.value === ""}
            >
              {option.label}
            </option>
          ))}
        </select>

        <FiChevronDown
          className="
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            text-gray-400
            pointer-events-none
          "
        />
      </div>

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

export default SelectField;