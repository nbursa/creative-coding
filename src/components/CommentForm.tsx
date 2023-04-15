import React, {useState} from "react";

interface CommentFormProps {
  handleNewComment: (event: React.FormEvent<HTMLFormElement>, name: string, content: string) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({handleNewComment}) => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  const handleComment = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    await handleNewComment(event, name, comment);
    setName("");
    setComment("");
  };

  return (
    <form onSubmit={handleComment} className="mb-4">
      <>
        <input
          type="text"
          placeholder="Name"
          className="border border-[var(--color-gray)] px-2 py-1 outline-none rounded w-full mb-2 bg-[var(--color-gray)]"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Comment"
          className="border border-[var(--color-gray)] px-2 py-1 outline-none rounded w-full mb-2 bg-[var(--color-gray)]"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      </>
      <button
        type="submit"
        className="bg-none text-white py-1 px-2 rounded"
      >
        Submit comment
      </button>
    </form>
  );
};

export default CommentForm;
