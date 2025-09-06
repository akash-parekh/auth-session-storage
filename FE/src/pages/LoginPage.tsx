import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate, useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, user } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate("/dashboard");
        } catch (error) {
            console.error("Login error:", error);
            alert("Login failed. Please check your credentials.");
        }
    };

    if (user) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <div className="w-screen shadow-ms align-middle h-screen">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 p-4 justify-center items-center w-full"
            >
                <input
                    type="email"
                    value={email}
                    onChange={(value) => setEmail(value.target.value)}
                    placeholder="Enter email id"
                    className="border border-gray-300 rounded-md p-2 min-w-sm"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(value) => setPassword(value.target.value)}
                    placeholder="Enter password"
                    className="border border-gray-300 rounded-md p-2 w-sm"
                />
                <button
                    type="submit"
                    className="border border-gray-300 rounded-md p-2 w-64"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
