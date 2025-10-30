import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/shared/lib/axios.interceptor";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isAuth, setIsAuth] = useState<boolean | null>(null); 
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuth === false) {
        navigate("/login");
    }
    }, [isAuth, navigate]);

  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        setIsAuth(false);
        return;
      }

      try {
        await api.get("/auth/me");
        setIsAuth(true); 
      } catch (error: any) {
        if (error.response?.status === 401) {
          try {
            const response = await api.post("/auth/refreshToken");
            const accessToken = response.data.accessToken;
            localStorage.setItem("accessToken", accessToken);
            setIsAuth(true); 
          } catch {
            localStorage.removeItem("accessToken");
            setIsAuth(false);
          }
        } else {
          setIsAuth(false);
        }
      }
    };

    checkAuth();
  }, []);

  if (isAuth === null) return <p>Loading...</p>;

  return <>{children}</>;
}
