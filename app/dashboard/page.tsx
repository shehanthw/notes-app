import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DashboardContent from "./DashboardContent"; // client component

interface DashboardContentProps {
  user: {
    name?: string | null;
    email?: string | null;
    [key: string]: any;
  };
}
export default async function DashboardPage() {
  // ✅ Server-side session check
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login"); // redirect if not authenticated
  }

  return <DashboardContent user={session.user!} />; // pass session.user to client component
}