"use server";
import { revalidatePath } from "next/cache";

export const refreshHome = async () => {
  revalidatePath("/");
};
