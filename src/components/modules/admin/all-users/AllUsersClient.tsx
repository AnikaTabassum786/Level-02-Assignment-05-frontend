"use client"

import { banUser } from "@/action/user.action";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "react-toastify";


type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  isBanned: boolean;
};

// extracting users directly from props
//This component will have props
//which will contain an array named users
//and each item will type User

export default function AllUsersClient({ users }: { users: User[] }) {

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  //converting users coming from the server into local state. so that the UI can be updated without a reload.
  const [userList, setUserList] = useState(users);

  const handleBan = (userId: string) => {
    startTransition(async () => { //startTransition is a low-priority task.Proceed without freezing the UI.
      const res = await banUser(userId); //calling server action

      if (res.success) {
        // update UI instantly
        setUserList((prev) =>
          prev.map((user) =>
            user.id === userId
              ? { ...user, isBanned: !user.isBanned } //Active → Banned. Banned → Active
              : user
          )
        );

       //Fetches fresh data from the server again. UI fully syncs
        router.refresh();

      } else {
        // alert(res.message);
        toast.error("Something Wrong")
      }
    });
  }

  return (
    <div className="p-2 md:p-4 lg:p-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">No</TableHead>
            <TableHead className="text-center">Name</TableHead>
            <TableHead className="text-center">Email</TableHead>
            <TableHead className="text-center">Role</TableHead>
            <TableHead className="text-center">Status</TableHead>


            <TableHead className="text-start pl-10">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {userList?.map((user,index) => (
            <TableRow key={user.id}>
              <TableCell className="text-center">{index + 1}</TableCell>
              <TableCell className="text-center">{user.name}</TableCell>
              <TableCell className="text-center">{user.email}</TableCell>
              <TableCell className="text-center">{user.role}</TableCell>
              <TableCell className="text-center">
                {user.isBanned ? "Banned" : "Active"}
              </TableCell>

             <TableCell className="text-start pl-10">
                <button
                  onClick={() => handleBan(user.id)}
                  disabled={isPending}
                  className={`px-2 py-1 text-white rounded ${
                    user.isBanned ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {user.isBanned ? "Unban" : "Ban"}
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}