import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { createServerClient } from "~/database";

type LoaderParams = {
  serverId: string;
};

type LoaderArgs = {
  request: Request;
  params: LoaderParams;
};

export const loader = async ({ request, params }: LoaderArgs) => {
  const { serverId } = params;
  console.log("serverId", serverId);

  const supabase = createServerClient(request);
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
        {/* @ts-ignore */}
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
