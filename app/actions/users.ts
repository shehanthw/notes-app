"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

interface User {
  name: string;
  email: string;
  role: string;
  phone: string;
  password: string;
}

export const createUser = async (data: User) => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        role: data.role,
        phone: data.phone,
        password: hashedPassword,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    if (error instanceof Error) {
      return { error: error.message };
    }

    return { error: "Failed to create user" };
  }

  revalidatePath("/sales/users");
  redirect("/sales/users");
};


export const getAllUsers = async () => {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
};

// Optional: Add deleteUser function
export const deleteUser = async (id: number) => {
  try {
    await prisma.user.delete({
      where: { id }
    });
    revalidatePath("/sales/users");
    return { success: true };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { success: false, error: "Failed to delete user" };
  }
};
