import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { supabase } from "~/database";

export const loader = async () => {
  const { data, error } = await supabase.from("server").select("*");
  if (error) throw error;
  return {
    servers: data,
  };
};

export default () => {
  const { servers } = useLoaderData<typeof loader>();
  return (
    <div className="flex flex-row gap-4">
      <div className="flex flex-col gap-4">
        {servers.map((server) => {
          return <Link to={`/servers/${server.id}`}>{server.name}</Link>;
        })}
      </div>
      <Outlet />
    </div>
  );
};
