import { Roles } from "@/components/constant/roles";
import { userService } from "@/services/user.service";
import { redirect } from "next/navigation";



export default async function DashboardPage() {
  const { data } = await userService.getSession();

  const user = data?.user;

  if (!user) {
    redirect("/login");
  }

  switch (user.role) {
    case Roles.admin:
      redirect("/admin-dashboard");

    case Roles.seller:
      redirect("/seller-dashboard");

    case Roles.customer:
      redirect("/customer-dashboard");

    default:
      redirect("/");
  }
}