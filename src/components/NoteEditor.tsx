import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import ReactCodeMirror from "@uiw/react-codemirror";
import { useState, type ChangeEvent } from "react";

interface INoteEditorProps {
  onSave: (note: { title: string; content: string }) => void;
}

const NoteEditor: React.FC<INoteEditorProps> = ({ onSave }) => {
  const [title, setTitle] = useState<string>("");
  const [code, setCode] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setTitle(event.target.value);
  return (
    <section className="card mt-5 border border-gray-200 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">
          <input
            type="text"
            placeholder="Your note..."
            className="w-full-font-bold input-primary input-lg"
            value={title}
            onChange={handleChange}
          />
        </h2>
        <ReactCodeMirror
          value={code}
          width="500px"
          height="30vh"
          minWidth="100%"
          minHeight="30vh"
          extensions={[
            markdown({ base: markdownLanguage, codeLanguages: languages }),
          ]}
          onChange={(value) => setCode(value)}
          className="border border-gray-300"
        />
        <div className="card-actions justify-end">
          <button
            onClick={() => {
              onSave({
                title,
                content: code,
              });
              setCode("");
              setTitle("");
            }}
            className="btn-primary btn"
            disabled={title.trim().length === 0 || code.trim().length === 0}
          >
            Save
          </button>
        </div>
      </div>
    </section>
  );
};

export default NoteEditor;
