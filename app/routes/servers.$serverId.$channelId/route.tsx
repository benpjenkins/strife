import { Form, useFetcher, useLoaderData } from "@remix-run/react";
import { createBrowserClient, createServerClient } from "~/database";
import { useEffect, useState } from "react";
import { Input } from "~/components/Input";
import { Button } from "~/components/Button";

type LoaderParams = {
  channelId: string;
  serverId: string;
};

type LoaderArgs = {
  request: Request;
  params: LoaderParams;
};

export const loader = async ({ request, params }: LoaderArgs) => {
  const supabase = createServerClient(request);
  const { channelId, serverId } = params;
  const { data: loadedMessages, error: messagesError } = await supabase
    .from("message")
    .select("id, content, user(user_name)")
    .eq("channel_id", channelId);
  if (messagesError) throw messagesError;

  const { data: channel, error: channelError } = await supabase
    .from("channel")
    .select("*")
    .eq("id", channelId)
    .single();
  return {
    loadedMessages,
    channelId,
    serverId,
    channel,
  };
};

export const action = async ({ request }: { request: Request }) => {
  const supabase = createServerClient(request);
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
  const supabase = createBrowserClient();
  const { loadedMessages, channel, channelId, serverId } =
    useLoaderData<typeof loader>();
  const fetcher = useFetcher<typeof loader>();
  const [messages, setMessages] = useState([...loadedMessages]);

  useEffect(() => {
    const channel = supabase
      .channel(`messages:channel_id=eq.${channelId}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "message" },
        () => {
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
    <div className="flex flex-col gap-4 h-screen">
      <h1 className="text-2xl uppercase mb-2">{channel?.name}</h1>
      <p className="text-gray-600 border-b border-gray-300 pb-4">
        {channel?.description}
      </p>
      <div className="flex-1 flex flex-col p-2">
        {messages.map((message) => {
          return (
            <div key={message.id}>
              <p className="text-base">{message.content}</p>
              <span className="block text-xs">{message.user?.user_name}</span>
            </div>
          );
        })}
      </div>
      <Form method="post" className="flex">
        <Input name="content" />
        <input type="hidden" name="channelId" value={channelId} />
        <div className="ml-8">
          <Button type="submit">Send</Button>
        </div>
      </Form>
    </div>
  );
};
