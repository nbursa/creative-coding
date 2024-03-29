import React, {useState} from 'react';
import {CommentDataType} from '@/types';
import useFormatDate from '@/hooks/use-format-date';

interface CommentProps {
  comment: CommentDataType;
  handleReply: (parentId: number, name: string, content: string) => Promise<void>;
}

const Comment: React.FC<CommentProps> = ({comment, handleReply}) => {
  const [replyName, setReplyName] = useState('');
  const [replyContent, setReplyContent] = useState('');
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [error, setError] = useState('');

  const handleSubmitReply = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!replyName.trim() || !replyContent.trim()) {
      setError('Please fill in all fields');
      return;
    }
    try {
      await handleReply(comment.id as number, replyName, replyContent);
      setReplyName('');
      setReplyContent('');
      setShowReplyForm(false);
    } catch (error) {
      setError('An error occurred while submitting your reply');
    }
  };

  return (
    <div className="space-y-4 border border-[var(--color-gray)] rounded mb-4 px-4">
      <div className="my-4 flex flex-col">
        <p className="text-xs mb-2 font-thin">id: #{comment.id}</p>
        <p className="text-sm mb-4">{comment.attributes?.body}</p>
        <small className="font-bold">by: {comment.attributes?.name}</small>
        <small className="text-gray-500 font-thin">{useFormatDate(comment.attributes?.createdAt)}</small>
        <button
          className="text-xs font-thin mt-2 max-w-min hover:underline hover:underline-offset-4"
          onClick={() => setShowReplyForm(!showReplyForm)}
        >
          {!showReplyForm ? "Reply" : "Close"}
        </button>
        {showReplyForm && (
          <form onSubmit={handleSubmitReply} className="mt-4">
            {error && <div className="text-red-500 mb-2">{error}</div>}
            <input
              type="text"
              placeholder="Your name"
              className="border border-[var(--color-gray)] px-2 py-1 outline-none rounded w-full mb-2 bg-[var(--color-gray)]"
              value={replyName}
              onChange={(e) => setReplyName(e.target.value)}
            />
            <textarea
              placeholder="Your reply"
              className="border border-[var(--color-gray)] px-2 py-1 outline-none rounded w-full mb-2 bg-[var(--color-gray)]"
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
            ></textarea>
            <button type="submit" className="bg-none text-white py-1 px-2 rounded">
              Submit reply
            </button>
          </form>
        )}
      </div>
      {comment.attributes?.replies &&
        comment.attributes?.replies.map((reply) => (
          <div key={reply.id} className="ml-8">
            <Comment comment={reply} handleReply={handleReply}/>
          </div>
        ))}
    </div>
  );
};

export default Comment;
