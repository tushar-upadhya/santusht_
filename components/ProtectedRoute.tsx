import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = sessionStorage.getItem("authToken");
        if (!token) {
            router.push("/login");
        } else {
            setIsAuthenticated(true);
        }
    }, []);

    return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoute;
