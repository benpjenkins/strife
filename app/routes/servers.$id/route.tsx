import { useLoaderData } from "@remix-run/react";

type LoaderParams = {
  params: {
    id: string;
  };
};

export const loader = ({ params: { id } }: LoaderParams) => {
  return {
    channels: [
      { id: 1, name: "hope-core" },
      { id: 2, name: "nom-noms" },
    ],
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
