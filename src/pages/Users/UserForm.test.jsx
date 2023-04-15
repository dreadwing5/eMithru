// import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UserForm from "./UserForm";
import userEvent from "@testing-library/user-event";

describe("UserForm", () => {
  let password, name, phone, email, confirmPassword, role;

  const mockData = {
    name: "John Doe",
    email: "john@example.com",
    phone: "1234567890",
    role: "mentor",
    password: "password123",
    confirmPassword: "password123",
  };

  const renderUserForm = () => {
    render(<UserForm />);
  };

  beforeEach(async () => {
    renderUserForm();

    password = screen.getByLabelText(/^password/i);
    name = screen.getByLabelText(/name/i);
    phone = screen.getByLabelText(/phone/i);
    email = screen.getByLabelText(/email/i);
    confirmPassword = screen.getByLabelText(/^confirm password/i);
    role = screen.getByLabelText(/role/i);
  });

  it("renders UserForm and checks initial form state", () => {
    expect(name).toHaveValue("");
    expect(email).toHaveValue("");
    expect(phone).toHaveValue("");
    expect(role).toHaveValue("admin");
    expect(password).toHaveValue("");
    expect(confirmPassword).toHaveValue("");
  });

  it("submits the form using mock data", async () => {
    userEvent.type(name, mockData.name);
    userEvent.type(email, mockData.email);
    userEvent.type(phone, mockData.phone);
    userEvent.selectOptions(role, mockData.role);
    userEvent.type(password, mockData.password);
    userEvent.type(confirmPassword, mockData.confirmPassword);

    fireEvent.submit(screen.getByText(/create user/i));

    // Wait for the form to be submitted and the Snackbar to appear
    await waitFor(() => screen.getByText(/user created successfully!/i));

    // Add any assertions needed to ensure the form was submitted correctly
  });

  // Add more tests as needed
});
