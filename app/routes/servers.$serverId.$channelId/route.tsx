import { useLoaderData } from "@remix-run/react";
import { supabase } from "~/database";

type LoaderParams = {
  params: {
    channelId: string;
  };
};

export const loader = async ({ params: { channelId } }: LoaderParams) => {
  const { data: messages, error } = await supabase
    .from("message")
    .select("*")
    .eq("channel_id", channelId);
  if (error) throw error;
  return {
    messages,
  };
};

export default () => {
  const { messages } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col gap-4">
      {messages.map((message) => {
        return <p key={message.id}>{message.content}</p>;
      })}
      <form>
        <input name="message-input" />
        <button>Send</button>
      </form>
    </div>
  );
};
