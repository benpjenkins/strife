import { Outlet, useLoaderData } from "@remix-run/react";

export const loader = () => {
  return {
    servers: [{ id: 1, name: "Mefca Classic", status: "active" }],
  };
};

export default () => {
  const { servers } = useLoaderData<typeof loader>();
  return (
    <div className="flex flex=row gap-4">
      {servers.map((server) => {
        return <p>{server.name}</p>;
      })}
      <Outlet />
    </div>
  );
};
