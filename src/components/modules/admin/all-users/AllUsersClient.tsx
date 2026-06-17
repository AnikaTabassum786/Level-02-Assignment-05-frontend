

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";


type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

// extracting users directly from props
//This component will have props
//which will contain an array named users
//and each item will type User

export default function AllUsersClient({ users }: { users: User[] }) {

  return (
    <div className="p-2 md:p-4 lg:p-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">No</TableHead>
            <TableHead className="text-center">Name</TableHead>
            <TableHead className="text-center">Email</TableHead>
            <TableHead className="text-center">Role</TableHead>
            {/* <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-start pl-10">Action</TableHead> */}
          </TableRow>
        </TableHeader>

        <TableBody>
          {users?.map((user,index) => (
            <TableRow key={user.id}>
              <TableCell className="text-center">{index + 1}</TableCell>
              <TableCell className="text-center">{user.name}</TableCell>
              <TableCell className="text-center">{user.email}</TableCell>
              <TableCell className="text-center">{user.role}</TableCell>
              {/* <TableCell className="text-center">Active</TableCell>
              <TableCell className="text-start pl-10">
                <button className="px-2 py-1 bg-blue-500 text-white rounded">
                  Edit
                </button>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}