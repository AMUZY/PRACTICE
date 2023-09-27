"use client";
import React, { useState } from "react";

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const registerUser = (e: EventTarget) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  };

  const formInputs = [
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "Enter your email",
      ariaLabel: "formEmail",
    },
    {
      label: "Phone",
      name: "phone",
      type: "tel",
      placeholder: "Enter your phone number",
      ariaLabel: "formPhone",
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "Enter your password",
      ariaLabel: "formPassword",
    },
    {
      label: "Confirm Password",
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm your password",
      ariaLabel: "formConfirmPassword",
    },
  ];

  return (
    <div className="page-wrapper">
      <h1 className="mx-auto text-3xl font-bold my-4 text-center">this is the test form for this example</h1>
      <form>
        {formInputs.map((input, index) => {
          return (
            <div className="form-group" key={index}>
              <label>{input.label}</label>
              <input
                name={input.name}
                type={input.type}
                aria-label={input.ariaLabel}
                placeholder={input.placeholder}
              />
            </div>
          );
        })}

        <button
          onClick={(e) => {
            e.preventDefault();
            registerUser(e.target);
          }}
        >
          {isLoading ? "Loading..." : "Create account"}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
