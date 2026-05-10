import axios from "axios";

export async function weldingChat(message: string) {
  const { data } = await axios.post(
    "https://techput-production-7a9e.up.railway.app/api/welding-chat",
    {
      message,
    },
  );

  return data.answer;
}
