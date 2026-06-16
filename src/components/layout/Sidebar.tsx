


// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";

// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarRail,
// } from "@/components/ui/sidebar";
// import { authClient } from "@/lib/auth-client";
// import { toast } from "react-toastify";
// import { Roles } from "../constant/roles";
// import { adminRoute } from "@/routes/adminRoute";
// import { sellerRoute } from "@/routes/sellerRoute";
// import { customerRoute } from "@/routes/customerRoute";
// import { Route } from "@/types";


// type SidebarProps = {
//   user: {
//     role: string;
//   };
// } & React.ComponentProps<typeof Sidebar>;

// const Sidebar1 = ({ user, ...props }: SidebarProps) => {
//   const pathname = usePathname(); 

//   let routes: Route[] = [];

//   const handleLogout = async () => {
//   try {
//     await authClient.signOut();
//     window.location.href = "/login";
//     toast.success("Logout Successfully");
//   } catch (error) {
//     console.error("Logout failed:", error);
//   }
// };

//   switch (user.role) {
//     case Roles.admin:
//       routes = adminRoute;
//       break;
//     case Roles.seller:
//       routes = sellerRoute;
//       break;
//     case Roles.customer:
//       routes = customerRoute;
//       break;
//     default:
//       routes = [];
//   }

//   return (
//     <Sidebar {...props}>
//       <SidebarContent>
//         {routes.map((group) => (
//           <SidebarGroup key={group.title}>
//             <SidebarGroupLabel>{group.title}</SidebarGroupLabel>

//             <SidebarGroupContent>
//               <SidebarMenu>
//                 {group.items.map((item) => {
//                   const isActive = pathname === item.url;

//                   return (
//                     <SidebarMenuItem key={item.title}>
//                       <SidebarMenuButton
                        
//                         className={`transition-all ${
//                           isActive
//                             ? "font-semibold"
//                             : "hover:bg-muted"
//                         }`}
//                       >
//                         <Link href={item.url}>{item.title}</Link>
//                       </SidebarMenuButton>
//                     </SidebarMenuItem>
//                   );
//                 })}
//               </SidebarMenu>
//             </SidebarGroupContent>
//           </SidebarGroup>
//         ))}

//        <SidebarMenu>
//   <SidebarMenuItem>
//     <SidebarMenuButton
//       onClick={handleLogout}
//       className="hover:bg-muted transition ml-2 cursor-pointer font-semibold"
//     >
//       Sign Out
//     </SidebarMenuButton>
//   </SidebarMenuItem>
// </SidebarMenu>

//       </SidebarContent>
//       <SidebarRail />
//     </Sidebar>
//   );
// };

// export { Sidebar1 };


"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { toast } from "react-toastify";

import { authClient } from "@/lib/auth-client";
import { Roles } from "../constant/roles";
import { adminRoute } from "@/routes/adminRoute";
import { sellerRoute } from "@/routes/sellerRoute";
import { customerRoute } from "@/routes/customerRoute";
import { Route } from "@/types";

import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

type SidebarProps = {
  user: { role: string };
} & React.ComponentProps<typeof ShadcnSidebar>;

const Sidebar = ({ user, ...props }: SidebarProps) => {
  const pathname = usePathname();

  let routes: Route[] = [];

  switch (user.role) {
    case Roles.admin:
      routes = adminRoute;
      break;
    case Roles.seller:
      routes = sellerRoute;
      break;
    case Roles.customer:
      routes = customerRoute;
      break;
    default:
      routes = [];
  }

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      toast.success("Logout Successfully");
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <ShadcnSidebar {...props}>
      <SidebarContent>
        {routes.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const isActive = pathname === item.url;

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        // asChild
                        className={isActive ? "font-semibold" : "hover:bg-muted"}
                      >
                        <Link href={item.url}>{item.title}</Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}

        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
              className="ml-2 cursor-pointer font-semibold hover:bg-muted"
            >
              Sign Out
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

      <SidebarRail />
    </ShadcnSidebar>
  );
};

export { Sidebar };