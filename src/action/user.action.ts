//"use server" means, this function will run on the backend side.

"use server"

import { userService } from "@/services/user.service"

//When called from the frontend, It makes a backend service call. Then, it hits the API. Then return result

export const banUser = async(id:string)=>{
    const result = await userService.banUserById(id)
    return result
}