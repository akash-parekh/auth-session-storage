import { useAuth } from "../hooks/useAuth";

const DashboardPage = () => {
    const { user } = useAuth();
    return (
        <div>
            <span>{user?.email}</span>
            <span>{user?.id}</span>
        </div>
    );
};

export default DashboardPage;
