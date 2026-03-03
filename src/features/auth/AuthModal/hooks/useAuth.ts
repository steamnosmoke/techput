import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import type { TLogin } from "../../types/AuthTypes";
import type { TUser } from "../../../../app/types/user";

const DB_URL = "https://69a5a354885dcb6bd6a8d8bc.mockapi.io/users";

async function loginUser({ email, password }: TLogin): Promise<TUser> {
  const { data: user } = await axios.get<Record<string, TUser>>(DB_URL, {
    params: { email },
  });
  if (!user || Object.values(user).length === 0) {
    throw new Error("The user was not found");
  }

  const [_,userData] = Object.entries(user)[0];
  const passwordMatch = password === userData.passwordHash;
  if (!passwordMatch) {
    throw new Error("Uncorrect password");
  }

  return userData;
}

export function useLogin() {
  return useMutation({
    mutationFn: loginUser,
    mutationKey: ["user"],
  });
}
