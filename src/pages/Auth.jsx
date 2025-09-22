import { useState, useEffect, useContext } from "react";
import { Card } from "@/components/ui/card";
import { toast } from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";

import LoginForm from "../components/auth/LoginForm";
import SignupForm from "../components/auth/SignupForm";
import { AuthContext } from "../context/AuthProvider";
import { loginUser, signupUser } from "../services/authService";
import { getErrorMessage } from "../utils/firebaseErrors";

export default function AuthCard() {
  const [activeTab, setActiveTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, setUser, setIsAdmin } = useContext(AuthContext);

  // ✅ Get redirect target from query param, fallback to "/"
  const redirect = searchParams.get("redirect") || "/";

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate(redirect, { replace: true });
    }
  }, [user, redirect, navigate]);

  // Set active tab based on query param
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "signup" || tab === "login") setActiveTab(tab);
  }, [searchParams]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await loginUser(email, password);
      toast.success("Logged in successfully!");
      setUser(userCredential.user);

      // Check for admin claims
      const tokenResult = await userCredential.user.getIdTokenResult(true);
      setIsAdmin(!!tokenResult.claims.admin);

      navigate(redirect); 
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signupUser(email, password);
      toast.success("Account created successfully!");
      setUser(userCredential.user);

      const tokenResult = await userCredential.user.getIdTokenResult(true);
      setIsAdmin(!!tokenResult.claims.admin);

      navigate(redirect);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-sm shadow-lg">
        {/* Tabs */}
        <div className="flex justify-around border-b">
          <button
            onClick={() => setActiveTab("login")}
            className={`w-1/2 py-3 font-semibold text-center ${
              activeTab === "login"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-500"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab("signup")}
            className={`w-1/2 py-3 font-semibold text-center ${
              activeTab === "signup"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-500"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Forms */}
        {activeTab === "login" ? (
          <LoginForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            onSubmit={handleLogin}
          />
        ) : (
          <SignupForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            onSubmit={handleSignup}
          />
        )}
      </Card>
    </div>
  );
}
