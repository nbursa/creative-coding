import UseFormatDate from "@/hooks/use-format-date";
import Comment from "@/components/Comment";
import CommentForm from "@/components/CommentForm";
import {BlogEntryType, CommentDataType} from "@/types";
import Link from "next/link";
import Image from "next/image";

interface Props {
  post: BlogEntryType;
  handleReply: (parentId: number, name: string, content: string) => Promise<void>;
  handleNewComment: (event: React.FormEvent<HTMLFormElement>, name: string, comment: string) => Promise<void>;
}

const BlogEntry: React.FC<Props> = ({post, handleReply, handleNewComment}) => {
  return (
    <div key={post?.id} className="w-full max-w-3xl mx-auto rounded-md shadow-md p-8">
      <Link href="/blog"
            className="group inline-block text-xs text-thin mb-8 flex items-center hover:-translate-x-2 hover:transform">
        <Image src="/icons/arrow-left-white.svg" alt="Icon arrow left" width={24} height={24} className=""/><span
        className="ml-0 group-hover:ml-1">Back to blogs</span>
      </Link>
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-8">{post?.attributes?.title}</h2>
        <p className="mb-4">{post?.attributes?.author} / {UseFormatDate(post?.attributes?.publishedAt || undefined)}</p>
        <p className="leading-relaxed mb-2">{post?.attributes?.content}</p>
        <p className="text-sm mb-2">{post?.attributes?.author}</p>
        <p className="text-sm mb-2">{UseFormatDate(post?.attributes?.createdAt || undefined)}</p>
      </div>
      <div className="">
        <div className="mb-2 text-xl">Comments</div>
        {post?.attributes?.comments?.data.map((comment: CommentDataType, index: number) => (
          <Comment key={comment.id || index} comment={comment} handleReply={handleReply}/>
        ))}
        <p className="text-gray-100 mb-2 mt-6">Add comment</p>
        <CommentForm handleNewComment={() => handleNewComment}/>
      </div>
    </div>
  );
};

export default BlogEntry;