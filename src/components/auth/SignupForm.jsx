import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase";
import { useNavigate } from "react-router-dom";

export default function SignupForm({
  email,
  setEmail,
  password,
  setPassword,
  onSubmit,
}) {
  const navigate = useNavigate(); // ✅ init navigate
  const [confirmPassword, setConfirmPassword] = useState("");

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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (password !== confirmPassword) {
              alert("Passwords do not match!");
              return;
            }
            onSubmit(e);
          }}
          className="flex flex-col gap-6"
        >
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
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Sign Up
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
