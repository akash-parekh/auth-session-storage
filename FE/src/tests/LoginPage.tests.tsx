import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { vi, type Mock } from "vitest";
import { AuthProvider } from "../provider/AuthProvider";
import { useAuth } from "../hooks/useAuth";
import LoginPage from "../pages/LoginPage";

// Mock the useAuth hook
vi.mock("../provider/AuthProvider", () => {
    const actual = vi.importActual("../provider/AuthProvider");
    return {
        ...actual,
        useAuth: vi.fn(),
    };
});

describe("LoginPage", () => {
    const mockLogin = vi.fn();

    beforeEach(() => {
        (useAuth as unknown as Mock).mockReturnValue({
            login: mockLogin,
            user: null,
            setUser: vi.fn(),
            isAuthenticated: false,
            loading: false,
        });
    });

    it("renders email and password inputs and login button", () => {
        render(
            <BrowserRouter>
                <AuthProvider>
                    <LoginPage />
                </AuthProvider>
            </BrowserRouter>,
        );

        expect(
            screen.getByPlaceholderText(/enter your email/i),
        ).toBeInTheDocument();
        expect(
            screen.getByPlaceholderText(/enter your password/i),
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: /login/i }),
        ).toBeInTheDocument();
    });

    it("shows alert when credentials are invalid", async () => {
        // Make login throw an error
        mockLogin.mockRejectedValueOnce(new Error("Invalid credentials"));

        render(
            <BrowserRouter>
                <AuthProvider>
                    <LoginPage />
                </AuthProvider>
            </BrowserRouter>,
        );

        const emailInput = screen.getByPlaceholderText(/enter your email/i);
        const passwordInput =
            screen.getByPlaceholderText(/enter your password/i);
        const loginButton = screen.getByRole("button", { name: /login/i });

        await userEvent.type(emailInput, "wrong@mail.com");
        await userEvent.type(passwordInput, "wrongpass");

        // Mock window.alert to capture the alert call
        const alertMock = vi
            .spyOn(window, "alert")
            .mockImplementation(() => {});

        await userEvent.click(loginButton);

        expect(alertMock).toHaveBeenCalledWith(
            "Login failed. Please check your credentials.",
        );

        alertMock.mockRestore();
    });
});
