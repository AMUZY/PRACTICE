import { render, screen, fireEvent } from "@testing-library/react";
// import RegisterPage from "../../../app/register-page/page";
import RegisterPage from "@app/register-page/page";
import "@testing-library/jest-dom";
import { inputVal } from "@helpers";


const formInputValues = [
  {
    label: "formEmail",
    correctTestValue: "coolguy@gmail.com",
  },
  {
    label: "formPhone",
    correctTestValue: "2348143932991",
  },
  {
    label: "formPassword",
    correctTestValue: "ASrty6655#$%f",
  },
  {
    label: "formConfirmPassword",
    correctTestValue: "ASrty6655#$%f",
  },
] as inputVal;

describe("Simple working form", () => {
  it("Should render all form inputs", () => {
    render(<RegisterPage />);

    //check for all form fields
    formInputValues.forEach((value, index) => {
      expect(screen.getByLabelText(value.label)).toBeInTheDocument();
    });
  });

  it("Should render submit button", async () => {
    render(<RegisterPage />);

    //check for submit button
    const button = screen.getByRole("button", { name: "Create account" });

    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });

  it("Should submit when inputs are filled and submit button clicked", async () => {
    render(<RegisterPage />);

    //check for submit button
    const submitButton = screen.getByRole("button", { name: "Create account" });

    formInputValues.forEach((mockValue, index) => {
      const input = screen.getByLabelText(mockValue.label);
      fireEvent.change(input, {
        target: { value: mockValue.correctTestValue },
      });
    });
    fireEvent.click(submitButton);

    expect(
      await screen.findByRole("button", { name: "Loading..." })
    ).toBeInTheDocument();
  });
});
