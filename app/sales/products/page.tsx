import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ViewProducts from "./ViewProducts";

interface DashboardContentProps {
  user: {
    name?: string | null;
    email?: string | null;
    [key: string]: any;
  };
}
export default async function ViewProductsPage() {
  // ✅ Server-side session check
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login"); // redirect if not authenticated
  }

  return <ViewProducts  />; // pass session.user to client component
}