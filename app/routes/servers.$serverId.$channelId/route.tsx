import { Form, useFetcher, useLoaderData } from "@remix-run/react";
import { supabase } from "~/database";
import { useEffect, useState } from "react";
import { Tables } from "~/types/database.types";

type LoaderParams = {
  params: {
    channelId: string;
    serverId: string;
  };
};

export const loader = async ({
  params: { channelId, serverId },
}: LoaderParams) => {
  const { data: loadedMessages, error } = await supabase
    .from("message")
    .select("*")
    .eq("channel_id", channelId);
  if (error) throw error;
  return {
    loadedMessages,
    channelId,
    serverId,
  };
};

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const content = formData.get("content") as string;
  const channelId = formData.get("channelId") as string;

  const { error } = await supabase
    .from("message")
    .insert({ content, channel_id: channelId });
  if (error) console.log(error.message);
  return null;
};

export default () => {
  const { loadedMessages, channelId, serverId } =
    useLoaderData<typeof loader>();
  const fetcher = useFetcher<typeof loader>();
  const [messages, setMessages] = useState([...loadedMessages]);

  useEffect(() => {
    const channel = supabase
      .channel(`messages:channel_id=eq.${channelId}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "message" },
        (payload) => {
          fetcher.load(`/servers/${serverId}/${channelId}`);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [channelId]);

  useEffect(() => {
    if (fetcher.data) {
      setMessages([...fetcher.data.loadedMessages]);
    }
  }, [fetcher.data]);

  useEffect(() => {
    setMessages([...loadedMessages]);
  }, [loadedMessages]);

  return (
    <div className="flex flex-col gap-4">
      {messages.map((message) => {
        return <p key={message.id}>{message.content}</p>;
      })}
      <Form method="post">
        <input name="content" />
        <input type="hidden" name="channelId" value={channelId} />
        <button>Send</button>
      </Form>
    </div>
  );
};
