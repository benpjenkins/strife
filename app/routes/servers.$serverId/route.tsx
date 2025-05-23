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
    <div className="flex flex-row gap-4  h-screen w-screen">
      <div className="flex flex-col gap-4 bg-gray-800 text-white w-40 p-8">
        {channels.map((channel) => {
          return (
            <Link key={channel.id} to={`/servers/${serverId}/${channel.id}`}>
              <span className="text-gray-400 mr-1">#</span>
              {channel.name}
            </Link>
          );
        })}
      </div>
      <div className="p-8 flex-1 flex flex-col ">
        <Outlet />
      </div>
    </div>
  );
};
