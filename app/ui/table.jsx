import Link from "next/link";
import { fetchFilteredUsers } from "../lib/data";
import { DeleteButton } from "./buttons";

export default async function Table({ query }) {
  const users = await fetchFilteredUsers(query);
  return (
    <div>
      <div className="grid grid-cols-3 pb-2 pt-3 border-b border-gray-400">
        <div>name</div>
        <div>age</div>
      </div>
      {users?.map((user, index) => (
        <div key={index} className="grid grid-cols-3 py-2 items-center hover:bg-gray-50 rounded-lg">
          <h1>{user.name}</h1>
          <h2>{user.age}</h2>
          <div className="flex justify-end gap-1">
            <Link href={`${user.id}/edit`} className="px-2 py-0.5 rounded-full bg-gray-300 text-sm">
              edit
            </Link>
            <DeleteButton id={user.id} />
          </div>
        </div>
      ))}
    </div>
  );
}
