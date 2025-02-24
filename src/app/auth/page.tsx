'use client';
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { handleGoogleSignIn, handleGoogleSignUp, handleSignUp, handleSignIn } from "./logic";

const AuthInput = ({ type, placeholder, name }: { type: string; placeholder: string; name: string }) => (
  <input
    type={type}
    placeholder={placeholder}
    name={name}
    className="w-full px-4 py-2 border rounded"
    required
  />
);

const AuthButton = ({ onClick, active, children }: { onClick: () => void; active: boolean; children: string }) => (
  <button
    onClick={onClick}
    className={`w-1/2 py-2 font-medium rounded transition ${
      active ? "bg-orange-500 text-white" : "bg-transparent text-gray-600 hover:text-orange-500"
    }`}
  >
    {children}
  </button>
);


const AuthForm = ({ activeTab, onSubmit }: { activeTab: "signIn" | "signUp"; onSubmit: (e: React.FormEvent) => void }) => (
  <form className="space-y-4" onSubmit={onSubmit}>
    {activeTab === "signUp" ? (
      <>
        <AuthInput type="text" placeholder="Full Name" name="fullName" />
        <AuthInput type="email" placeholder="Email" name="email" />
        <AuthInput type="password" placeholder="Password" name="password" />
        <AuthInput type="password" placeholder="Confirm Password" name="confirmPassword" />
      </>
    ) : (
      <>
        <AuthInput type="email" placeholder="Email" name="email" />
        <AuthInput type="password" placeholder="Password" name="password" />
      </>
    )}

    <button
      type="submit"
      className="w-full px-6 py-3 bg-orange-500 text-white rounded hover:bg-orange-600"
    >
      {activeTab === "signIn" ? "Sign In" : "Sign Up"}
    </button>
  </form>
);



const AuthWidget = () => {
  const [activeTab, setActiveTab] = useState<"signIn" | "signUp">("signIn");
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const email = (target.elements.namedItem("email") as HTMLInputElement).value;
    const password = (target.elements.namedItem("password") as HTMLInputElement).value;

    if (activeTab === "signUp") {
      const confirmPassword = (target.elements.namedItem("confirmPassword") as HTMLInputElement).value;
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      const fullName = (target.elements.namedItem("fullName") as HTMLInputElement).value;
      const success = await handleSignUp(email, password, fullName);
      if (success) {
        alert("Account created successfully!");
        setActiveTab("signIn");
      }
    } else {
      const success = await handleSignIn(email, password, router);
      if (!success) {
        alert("Sign-in failed. Please check your credentials.");
      }
    }
  };

  useEffect(() => {
    if (error) {
      alert("Google authentication was canceled or failed. Please try again.");
    }
  }, [error]);

  return (
    <div className="flex items-center justify-center h-full bg-white py-8">
      <motion.div
        className="w-full max-w-3xl bg-white border-gray-200 p-10 rounded-2xl shadow-2xl flex transition-all"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-1/2 p-6 flex flex-col justify-center items-center">
          <img
            src="/images/Logo2-OJTrack.png"
            alt="OJTrack Logo"
            className="max-w-full max-h-[220px] object-contain mb-4"
          />
        </div>

        <div className="w-1/2 p-6 rounded-3xl flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Get Started with OJ<span className="text-orange-500">Track</span>
          </h2>

          <div className="flex justify-between mb-4">
          <AuthButton onClick={() => setActiveTab("signIn")} active={activeTab === "signIn"}>
            Sign In
          </AuthButton>
          <AuthButton onClick={() => setActiveTab("signUp")} active={activeTab === "signUp"}>
            Sign Up
          </AuthButton>
        </div>


          <AuthForm activeTab={activeTab} onSubmit={handleSubmit} />

          {activeTab === "signIn" && (
            <>
              <button
                onClick={handleGoogleSignIn}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded hover:bg-orange-700 mt-4"
              >
                <img src="/images/google-icon.svg" alt="Google Icon" className="inline-block mr-2 w-5" />
                Sign In with Google
              </button>
            </>
          )}

          {activeTab === "signUp" && (
            <>
              <button
                onClick={handleGoogleSignUp}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 mt-4"
              >
                <img src="/images/google-icon.svg" alt="Google Icon" className="inline-block mr-2 w-5" />
                Sign Up with Google
              </button>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AuthWidget;
