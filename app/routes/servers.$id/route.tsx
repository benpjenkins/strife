import { useLoaderData } from "@remix-run/react";
import { supabase } from "~/database";

type LoaderParams = {
  params: {
    id: string;
  };
};

export const loader = async ({ params: { id } }: LoaderParams) => {
  const { data, error } = await supabase
    .from("channel")
    .select("*")
    .eq("server_id", id);
  console.log("data", data);
  if (error) throw error;
  return {
    channels: data,
  };
};

export default () => {
  const { channels } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col gap-4">
      {channels.map((channel) => {
        return <p>{channel.name}</p>;
      })}
    </div>
  );
};
