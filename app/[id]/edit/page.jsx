import Form from "../../ui/form";
import { fetchUserById } from "../../lib/data";

export default async function Page({ params }) {
  const id = params.id;
  const user = await fetchUserById(id);
  return (
    <div className="flex justify-center items-center min-h-dvh bg-white">
      <Form user={user[0]} />
    </div>
  );
}
