import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { supabase } from "~/database";

type LoaderParams = {
  params: {
    serverId: string;
  };
};

export const loader = async ({ params: { serverId } }: LoaderParams) => {
  const { data: channels, error } = await supabase
    .from("channel")
    .select("*")
    .eq("server_id", serverId);
  if (error) throw error;
  return {
    channels,
    serverId,
  };
};

export default () => {
  const { channels, serverId } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-row gap-4">
      <div className="flex flex-col gap-4">
        {channels.map((channel) => {
          return (
            <Link key={channel.id} to={`/servers/${serverId}/${channel.id}`}>
              #{channel.name}
            </Link>
          );
        })}
      </div>
      <Outlet />
    </div>
  );
};
