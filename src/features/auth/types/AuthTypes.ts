export type TLogin = {
  email: string;
  password: string;
  confirm?: string;
};

export type TAuthStore = {
  id: string;
  name: string;
  email: string;
  password: string;
  confirm: string;
  error: string;
  setId: (id: string) => void;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setConfirm: (confirm: string) => void;
  logOut: () => void;
  setError: (error: string) => void;
};
