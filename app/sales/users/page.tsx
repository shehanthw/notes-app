import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import UsersPage from "./UsersPage"; 

interface DashboardContentProps {
  user: {
    name?: string | null;
    email?: string | null;
    [key: string]: any;
  };
}
export default async function UserPage() {
  // ✅ Server-side session check
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login"); // redirect if not authenticated
  }

  return <UsersPage  />; // pass session.user to client component
}