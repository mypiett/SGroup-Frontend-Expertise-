import { useState } from "react";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Button } from "@/shared/ui/button";
import api from "@/shared/lib/axios.interceptor";
import { useNavigate } from "react-router-dom";

export function LoginField() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  async function submit() {
    setLoading(true);

    try {
      const response = await api.post("/auth/login", { email, password });
      const accessToken = response.data.accessToken;
      if (accessToken ) {
        localStorage.setItem("accessToken", accessToken);
        navigate("/dashboard");
      }
    } catch (err: any) {
      console.error("Login failed:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-3">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="m@example.com"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="grid gap-3">
        <div className="flex items-center">
          <Label htmlFor="password">Password</Label>
          <a
            href="#"
            className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
          >
            Forgot your password?
          </a>
        </div>
        <Input
          id="password"
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-3">
        <Button
          type="submit"
          className="w-full"
          onClick={submit}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
        <Button variant="outline" className="w-full">
          Login with Google
        </Button>
      </div>
    </div>
  );
}
