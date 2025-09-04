import { useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner"; // ✅ your spinner
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

export default function SignupForm({
  email,
  setEmail,
  password,
  setPassword,
  onSubmit,
}) {
  const navigate = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState("");
  const { setUser, setIsAdmin } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const handleGoogleSignup = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Refresh to ensure we have the latest claims
      const tokenResult = await user.getIdTokenResult(true);
      const isAdmin = !!tokenResult.claims.admin;

      setUser(user);
      setIsAdmin(isAdmin);

      navigate(isAdmin ? "/admin" : "/");
    } catch (error) {
      console.error("Google Signup Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      await onSubmit(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
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
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <Spinner className="w-5 h-5" /> : "Sign Up"}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col gap-2">
        <Button
          onClick={handleGoogleSignup}
          variant="outline"
          className="w-full flex items-center justify-center gap-3 border-gray-300 bg-white hover:bg-gray-100 text-gray-700 font-medium shadow-sm transition"
          disabled={loading}
        >
          {loading ? (
            <Spinner className="w-5 h-5" />
          ) : (
            <>
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Continue with Google
            </>
          )}
        </Button>
      </CardFooter>
    </>
  );
}
