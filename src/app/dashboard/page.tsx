"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const HomePage = () => {
  const router = useRouter();
  const [loggedOut, setLoggedOut] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        router.push("/auth"); // Redirect to auth page if no session exists
      } else {
        // Set the user's full name if available
        setUserName(session.user?.user_metadata?.full_name || "User");
      }
    };

    checkSession();
  }, [router]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error("Logout failed:", error.message);
      return;
    }

    setLoggedOut(true); // Show logout banner
    setTimeout(() => {
      router.push("/auth"); // Redirect to the auth page after logout
    }, 2000); // Redirect after 2 seconds to allow banner display
  };

  return (
    <div className="relative flex items-center justify-center h-screen bg-gray-100">
      {/* Logout Banner */}
      {loggedOut && (
        <div className="absolute top-0 left-0 right-0 bg-orange-500 text-white text-center py-2">
          You have been logged out.
        </div>
      )}

      <div className="text-center p-6">
        <h1 className="text-4xl font-bold text-gray-800">Welcome to your OJTrack Dashboard!</h1>
        <p className="mt-4 text-gray-600">Hello, {userName}!</p>
        
        <button
          onClick={handleLogout}
          className="mt-6 px-6 py-3 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default HomePage;
