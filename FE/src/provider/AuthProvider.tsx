import axios from "axios";
import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const checkAuth = async () => {
        try {
            const res = await axios.get("/auth/me", { withCredentials: true });
            setUser(res.data);
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email: string, password: string) => {
        await axios.post(
            "/auth/login",
            { email, password },
            { withCredentials: true },
        );
        await checkAuth();
    };

    const logout = async () => {
        await axios.post("/auth/logout", {}, { withCredentials: true });
        setUser(null);
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                loading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
