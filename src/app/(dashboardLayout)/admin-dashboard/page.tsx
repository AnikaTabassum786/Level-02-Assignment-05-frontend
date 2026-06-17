import AllUsersClient from "@/components/modules/admin/all-users/AllUsersClient";
import AllUsersServer from "@/components/modules/admin/all-users/AllUsersServer";

export default function AdminDashboardPage(){
    return(
        <div>
          <AllUsersServer></AllUsersServer>
        </div>
    )
}