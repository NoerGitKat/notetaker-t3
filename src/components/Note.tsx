import { useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { type RouterInputs } from "../utils/api";

type Note = RouterInputs["notes"]["create"];

interface INoteProps {
  note: Note;
  onDelete: () => void;
}

const Note: React.FC<INoteProps> = ({ note, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  return (
    <aside className="card mt-5 border border-gray-200 bg-base-100 shadow-xl">
      <div className="card-body m-0 p-3">
        <div
          className={`collapse-arrow ${
            isExpanded ? "collapse-open" : ""
          } collapse`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="collapse-title text-xl font-bold">{note.title}</div>
          <div className="collapse-content">
            <article className="prose lg:prose-xl">
              <ReactMarkdown>{note.content}</ReactMarkdown>
            </article>
          </div>
          <div className="card-actions mx-2 flex justify-end">
            <button className="btn-warning btn-xs btn px-5" onClick={onDelete}>
              Delete!
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Note;