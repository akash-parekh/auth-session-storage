import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Input from "../components/Input";

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
        <div className="w-screen h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-2xl shadow-md w-96">
                <h1 className="text-xl font-bold mb-4 text-center">Login</h1>
                <form
                    className="flex flex-col gap-4 justify-center items-center"
                    onSubmit={handleSubmit}
                >
                    <label className="sr-only" htmlFor="email">
                        Email
                    </label>
                    <Input
                        type="email"
                        value={email}
                        onChange={(value) => setEmail(value.target.value)}
                        placeholder="Enter your email"
                        required
                        autoComplete="email"
                        id="email"
                    />
                    <label className="sr-only" htmlFor="password">
                        Password
                    </label>
                    <Input
                        type="password"
                        value={password}
                        onChange={(value) => setPassword(value.target.value)}
                        placeholder="Enter your password"
                        required
                        autoComplete="password"
                        id="password"
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white rounded-md p-2 hover:bg-blue-700 w-64"
                    >
                        Login
                    </button>
                    <div className="text-sm text-gray-600">
                        New User?{" "}
                        <Link
                            to="/register"
                            className="underline text-blue-600 hover:text-blue-800"
                        >
                            Register here
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
