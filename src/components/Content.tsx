import { type Topic } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useState, type KeyboardEvent, type MouseEvent } from "react";
import { api } from "~/utils/api";

interface IContentProps {}

const Content: React.FC<IContentProps> = (props) => {
  const { data: sessionData } = useSession();
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>();
  const { data: topics, refetch: refetchTopics } = api.topics.getAll.useQuery(
    undefined, // No input
    {
      enabled: sessionData?.user !== undefined,
      onSuccess(data) {
        setSelectedTopic(selectedTopic ?? data[0] ?? null);
      },
    }
  );

  const createTopic = api.topics.create.useMutation({
    onSuccess: () => {
      void refetchTopics();
    },
  });

  const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      createTopic.mutate({
        title: event.currentTarget.value,
      });
      event.currentTarget.value = "";
    }
  };

  return (
    <section className="mx-5 mt-5 grid grid-cols-4 gap-2">
      <div className="px-2">
        <ul className="menu rounded-box w-56 bg-base-100 p-2">
          {topics?.map((topic) => (
            <li key={topic.id}>
              <a
                href="#"
                onClick={(event: MouseEvent) => {
                  event.preventDefault();
                }}
              >
                {topic.title}
              </a>
            </li>
          ))}
        </ul>
        <div className="divider" />
        <input
          type="text"
          placeholder="My new topic..."
          onKeyDown={onKeyDownHandler}
          className="w-fu input-bordered input input-sm"
        />
      </div>
    </section>
  );
};

export default Content;
