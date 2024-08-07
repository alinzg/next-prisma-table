"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

const FormSchema = z.object({
  name: z.string().min(1, { message: "Please write a name." }),
  age: z.coerce.number().gt(0, { message: "Please enter an age greater than 0." }),
});

export async function createUser(prevState, formData) {
  const validatedFields = FormSchema.safeParse({
    name: formData.get("name"),
    age: formData.get("age"),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create User.",
    };
  }
  const { name, age } = validatedFields.data;

  try {
    await prisma.$queryRaw`INSERT INTO 'Users' (id, name, age) VALUES (${crypto.randomUUID()} ,${name}, ${age})`;
  } catch (error) {
    return {
      message: "Database Error: Failed to Create User.",
    };
  }

  revalidatePath("/");
  redirect("/");
}
export async function updateUser(id, prevState, formData) {
  const validatedFields = FormSchema.safeParse({
    name: formData.get("name"),
    age: formData.get("age"),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update User.",
    };
  }
  const { name, age } = validatedFields.data;

  try {
    await prisma.$queryRaw`update Users SET name = ${name} , age = ${age} WHERE id = ${id}`;
  } catch (error) {
    return {
      message: "Database Error: Failed to Update User.",
    };
  }

  revalidatePath("/");
  redirect("/");
}

export async function deleteUser(id) {
  try {
    await prisma.$queryRaw`DELETE FROM users WHERE id = ${`${id}`}`;
  } catch (error) {
    return {
      message: "Database Error: Failed to Delete User.",
    };
  }
  revalidatePath("/");
}
