import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ViewUserPage from "./ViewUser";

interface DashboardContentProps {
  user: {
    name?: string | null;
    email?: string | null;
    [key: string]: any;
  };
}
export default async function ViewProductPage() {
  // ✅ Server-side session check
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return <ViewUserPage  />; 
}