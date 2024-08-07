"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchHandler = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    term ? params.set("query", term) : params.delete("query");
    replace(`${pathname}?${params.toString()}`);
  }, 300);
  return (
    <div className="flex items-center justify-between gap-4">
      <form action="">
        <label htmlFor="">search</label>
        <input
          type="text"
          onChange={(e) => searchHandler(e.target.value)}
          placeholder="search by name"
          className="px-3 py-1 ml-2 border rounded"
        />
      </form>
      <Link href={"create"} className="bg-blue-500 text-white px-4 py-1 rounded">
        create
      </Link>
    </div>
  );
}

export default Search;
