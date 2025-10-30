import api from "@/shared/lib/axios.interceptor";
import { Button } from "@/shared/ui/button";
import { useState } from "react";

interface User {
  fullName: string;
  email: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User|null>(null);
  const [error, setError] = useState("");
  const handleGetUser = async()=>{
    setError("");
    try{
      const res = await api.get("auth/me");
      console.log(res);
      if (res.data.success == false){
        setError(res.data.message || "Lỗi khi lấy dữ liệu user");
      }else {
        setUser(res.data);
        console.log(res.data);
      };
    }catch(err){
      setError(err.response?.data?.message || "Có lỗi xảy ra");
    }
  }
  return (
    <div>
      <h1 className="p-6 text-center text-xl font-semibold">Welcome to Dashboard!</h1>
      <br />
      <Button onClick={handleGetUser}>
        Get User Detail
      </Button>
      
      {error && <p style={{ color: "red" }}>❌ {error}</p>}

      {user && (
        <div style={{ marginTop: "20px" }}>
          <h2>User Info:</h2>
          <p>Name: {user.fullName}</p>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  );
}
