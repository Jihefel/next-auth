"use server";

import { signOut } from "@/auth";

export const logout = async () => {
    //NOTE - Add additional logout actions here
    await signOut();
}
