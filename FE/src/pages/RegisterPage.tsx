import { useState } from "react";
import Input from "../components/Input";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { register, user } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        try {
            await register(email, password);
            navigate("/dashboard");
        } catch (error) {
            console.error("Registration error:", error);
            alert("Registration failed. Please try again.");
        }
    };

    if (user) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <div className="w-screen h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-2xl shadow-md w-96">
                <h1 className="text-xl font-bold mb-4 text-center">Register</h1>
                <form
                    className="flex flex-col gap-4 justify-center items-center"
                    onSubmit={handleSubmit}
                >
                    <label className="sr-only" htmlFor="email">
                        Email
                    </label>
                    <Input
                        required
                        autoComplete="email"
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(value) => setEmail(value.target.value)}
                        className="border border-gray-300 rounded-md p-2 min-w-sm"
                    />
                    <label className="sr-only" htmlFor="password">
                        Password
                    </label>
                    <Input
                        required
                        autoComplete="current-password"
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(value) => setPassword(value.target.value)}
                        className="border border-gray-300 rounded-md p-2 min-w-sm"
                    />
                    <label className="sr-only" htmlFor="confirmPassword">
                        Confirm Password
                    </label>
                    <Input
                        required
                        autoComplete="confirm-password"
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(value) =>
                            setConfirmPassword(value.target.value)
                        }
                        className="border border-gray-300 rounded-md p-2 min-w-sm"
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white rounded-md p-2 w-64 hover:bg-blue-700"
                    >
                        Register
                    </button>
                    <div className="text-sm text-gray-600 text-center mt-4">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="underline text-blue-600 hover:text-blue-800"
                        >
                            Login here
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
