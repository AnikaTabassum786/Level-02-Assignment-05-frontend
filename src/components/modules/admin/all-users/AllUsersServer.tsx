import { userService } from "@/services/user.service";
import AllUsersClient from "./AllUsersClient";

//Server component = middle man
//It takes data -> then gives it to UI

export default async function AllUsersServer(){

//getting users from the service

const res = await userService.getAllUsers();
const users = res?.data?.data ;

// console.log("ALL users",users)

//then sending it to the client component using props
 return <AllUsersClient users={users}/>
}