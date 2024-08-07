"use client";

import Link from "next/link";
import { createUser, updateUser } from "../lib/actions";
import { useFormState } from "react-dom";

export default function Form({ user }) {
  const initialState = { message: null, errors: {} };
  const updateUserWithId = updateUser.bind(null, user?.id);
  const [state, dispatch] = useFormState(user ? updateUserWithId : createUser, initialState);
  console.log(state);
  return (
    <div className="m-8 border rounded-md shadow p-6 h-min">
      <form action={dispatch} className="flex flex-col gap-3">
        <div>
          <div className="flex justify-between">
            <label htmlFor="name">name</label>
            <input
              type="text"
              name="name"
              id="name"
              defaultValue={user ? user.name : null}
              placeholder="enter name"
              className="px-3 py-1 ml-2 border rounded"
            />
          </div>
          {state.errors?.name ? (
            <div id="customer-error" aria-live="polite" aria-atomic="true">
              {state.errors.name.map((error) => (
                <p className="mt-1 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
            </div>
          ) : null}
        </div>

        <div>
          <div className="flex justify-between">
            <label htmlFor="age">age</label>
            <input
              type="number"
              name="age"
              id="age"
              defaultValue={user ? user.age : null}
              placeholder="enter age"
              className="px-3 py-1 ml-2 border rounded"
            />
          </div>
          {state.errors?.age ? (
            <div id="customer-error" aria-live="polite" aria-atomic="true">
              {state.errors.age.map((error) => (
                <p className="mt-1 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
            </div>
          ) : null}
        </div>
        <div className="pt-2">
          <Link href={"/"} className="text-sm">
            cancel
          </Link>
          <button type="submit" className="bg-blue-500 text-white ml-3 px-4 py-1 rounded">
            save
          </button>
        </div>
      </form>
    </div>
  );
}
