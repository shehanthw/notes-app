// app/login/page.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LoginForm from "./LoginForm"; // client component

export default async function LoginPage() {
  // Check if user is already logged in (server-side)
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard"); // redirect logged-in users away from login
  }

  return <LoginForm />; // render client form for unauthenticated users
}