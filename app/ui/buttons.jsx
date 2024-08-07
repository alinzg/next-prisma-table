"use client";

import { deleteUser } from "../lib/actions";

export function DeleteButton(id) {
  return (
    <button
      onClick={() => {
        deleteUser(id.id);
      }}
      className="px-2 py-0.5 rounded-full bg-red-600 text-sm text-white"
    >
      delete
    </button>
  );
}
