import { useAuth } from "../hooks/useAuth";

const DashboardPage = () => {
    const { user, logout } = useAuth();
    return (
        <div className="w-screen h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white shadow-md rounded-2xl p-8 w-96 text-center">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">
                    Dashboard
                </h1>

                <div className="flex flex-col gap-2 mb-6">
                    <span className="text-gray-700">
                        <strong>Email:</strong> {user?.email}
                    </span>
                    <span className="text-gray-500 text-sm">
                        <strong>User ID:</strong> {user?.id}
                    </span>
                </div>

                <button
                    onClick={logout}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 w-full"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default DashboardPage;
