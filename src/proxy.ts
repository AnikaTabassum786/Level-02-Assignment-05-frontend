
import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.service";
import { Roles } from "./components/constant/roles";

const roleDashboardMap = {
  [Roles.admin]: "/admin-dashboard",
  [Roles.seller]: "/seller-dashboard",
  [Roles.customer]: "/customer-dashboard",
};

export async function proxy(request: NextRequest) {

    const pathname = request.nextUrl.pathname;
    const { data } = await userService.getSession()
    
    if (!data) {
        return NextResponse.redirect(new URL("/login", request.url))
    }

    const role = data.user.role

    // ADMIN 
    if (pathname.startsWith("/admin-dashboard") && role !== Roles.admin) {
        return NextResponse.redirect(new URL(roleDashboardMap[role], request.url));
    }

    // SELLER 
    if (pathname.startsWith("/seller-dashboard") && role !== Roles.seller) {
        return NextResponse.redirect(new URL(roleDashboardMap[role], request.url));
    }

    // CUSTOMER
    if (pathname.startsWith("/customer-dashboard") && role !== Roles.customer) {
        return NextResponse.redirect(new URL(roleDashboardMap[role], request.url));
    }

    return NextResponse.next()
}

export const config = {
    // matcher: ["/admin/:path*", "/seller/:path*", "/customer/:path*"]
    matcher: ["/customer-dashboard/:path*", "/admin-dashboard/:path*", "/seller-dashboard/:path*"]
}

