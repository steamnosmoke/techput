import axios from "axios";
interface Message {
  role: "user" | "assistant";
  text: string;
}
export async function weldingChat(messages: Message[]) {
  const { data } = await axios.post(
    "https://techput-production-7a9e.up.railway.app/api/welding-chat",
    { messages },
  );
  return data.answer;
}
