import { useAuth } from "../hooks/useAuth";

const DashboardPage = () => {
    const { user } = useAuth();
    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center shadow-ms">
            <span>{user?.email}</span>
            <span>{user?.id}</span>
        </div>
    );
};

export default DashboardPage;
