import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export const handleGoogleSignIn = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/dashboard`,
    },
  });
  if (error) {
    console.error("Google sign-in failed:", error.message);
  }
};

export const handleGoogleSignUp = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/dashboard`,
    },
  });
  if (error) {
    console.error("Google sign-up failed:", error.message);
  }
};

export const handleSignUp = async (email: string, password: string, fullName: string) => {
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName } },
  });
  if (error) {
    console.error("Sign-up failed:", error.message);
    return false;
  }
  return true;
};

export const handleSignIn = async (email: string, password: string, router: ReturnType<typeof useRouter>) => {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    console.error("Sign-in failed:", error.message);
    return false;
  }
  router.push("/dashboard");
  return true;
};
