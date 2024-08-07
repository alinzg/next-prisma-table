import Table from "./ui/table";
import Search from "./ui/search";

export default async function Home({ searchParams }) {
  const query = searchParams?.query || "";
  return (
    <main className="flex justify-center min-h-dvh bg-white">
      <div className="m-8 border rounded-md shadow p-6 h-min">
        <Search />
        <Table query={query} />
      </div>
    </main>
  );
}
