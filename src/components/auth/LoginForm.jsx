import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase";
import { useNavigate } from "react-router-dom";

export default function LoginForm({
  email,
  setEmail,
  password,
  setPassword,
  onSubmit,
}) {
  const navigate = useNavigate(); // ✅ init navigate

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      // Get user info
      const user = result.user;
      console.log("User Info:", user);

      localStorage.setItem("user", JSON.stringify(user));

      // ✅ Redirect to homepage
      navigate("/");
    } catch (error) {
      console.error("Google Login Error:", error);
    }
  };

  return (
    <>
      <CardContent>
        <form onSubmit={onSubmit} className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <a
                href="#"
                className="ml-auto text-sm underline-offset-4 hover:underline"
              >
                Forgot your password?
              </a>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col gap-2">
        <Button
          onClick={handleGoogleLogin}
          variant="outline"
          className="w-full flex items-center justify-center gap-3 border-gray-300 bg-white hover:bg-gray-100 text-gray-700 font-medium shadow-sm transition"
        >
          {/* Google Logo */}
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </Button>
      </CardFooter>
    </>
  );
}