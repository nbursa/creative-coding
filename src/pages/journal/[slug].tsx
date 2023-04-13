import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import Comment from '@/components/Comment';
import UseFormatDate from '@/hooks/use-format-date';

export interface CommentData {
  id?: number;
  attributes?: {
    body?: string;
    name?: string;
    publishedAt?: Date;
    createdAt?: Date;
    status?: string;
    IP?: string;
    agent?: string;
    parent?: CommentData | null;
    replies?: CommentData[] | undefined; // Assuming this is the list of replies to this comment
    blog_posts?: {
      id: number;
      title: string;
    }[];
  };
}

interface AttributesType {
  title?: string;
  slug?: string;
  author?: string;
  publishedAt?: Date | null;
  createdAt?: Date | null;
  cover?: {
    url: string;
    formats: {
      thumbnail: {
        url: string;
      };
      // Add any other formats you have configured in Strapi
    };
  };
  content?: string;
  summary?: string | null;
  categories?: {
    id: number;
    name: string;
  }[];
  comment?: CommentData[]; // Assuming you don't need this field as you have comments field
  comments?: { data: CommentData[] };
}

interface JournalEntryType {
  id: number | null;
  attributes: AttributesType | null;
  comments?: { data?: CommentData[] };
}

const BlogPage: React.FC = () => {
  const {slug} = useRouter().query;
  const postsUrl = `http://localhost:1337/api/blog-posts/${slug!}?populate=comments`;
  const commentsUrl = `http://localhost:1337/api/comments`;
  const token = 'Bearer ' + process.env.NEXT_PUBLIC_STRAPI_JWT_TOKEN;
  const [post, setPost] = useState<JournalEntryType | null>(null);
  const [newCommentName, setNewCommentName] = useState<string>('');
  const [newCommentContent, setNewCommentContent] = useState<string>('');

  useEffect(() => {
    const fetchJournalEntries = async () => {
      try {
        const res = await fetch(postsUrl, {
          headers: {
            Authorization: token,
          },
        });
        const data = await res.json();

        if (data.data.attributes) {
          setPost(data.data);
        } else {
          setPost(null);
        }
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    if (slug) {
      fetchJournalEntries();
    }
  }, [slug]);

  const addComment = async (name: string, content: string) => {
    // Make sure the post and its ID are defined
    if (!post || !post.id) {
      console.error('Cannot add comment: Post or post ID is not defined');
      return;
    }

    const response = await fetch(commentsUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        data: {
          name,
          body: content,
          blog_post: {id: post.id},
        }
      }),
    });

    if (response.ok) {
      const newComment = await response.json();

      // If the comment was successfully created, update the local state to show the new comment.
      setPost((prevPost) => {
        if (prevPost) {
          const prevCommentsData = prevPost.attributes?.comments?.data || [];
          const newCommentsData = [
            ...prevCommentsData,
            {
              ...newComment,
              createdAt: newComment.createdAt,
            },
          ];

          const updatedPostAttributes = {
            ...prevPost.attributes,
            comments: {
              data: newCommentsData,
            },
          };

          return {
            ...prevPost,
            attributes: updatedPostAttributes,
          };
        }
        return prevPost;
      });
    } else {
      // Log the error message and status for debugging
      console.error(`Error: ${response.status} ${response.statusText}`);
      const errorDetails = await response.json();
      console.error('Error details:', errorDetails);
    }
  };


  const handleNewComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newCommentName.trim() || !newCommentContent.trim()) return;
    await addComment(newCommentName, newCommentContent);
    setNewCommentName('');
    setNewCommentContent('');
  };

  const handleReply = async (parentId: number, name: string, content: string) => {
    // Make sure the post and its ID are defined
    if (!post || !post.id) {
      console.error('Cannot add reply: Post or post ID is not defined');
      return;
    }

    // Create a new comment object to represent the reply
    const newComment: CommentData = {
      attributes: {
        body: content,
        name: name,
        parent: {id: parentId},
        blog_posts: [{id: post.id, title: post.attributes?.title!}]
      }
    };

    const response = await fetch(commentsUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({data: newComment}),
    });

    if (response.ok) {
      const createdComment = await response.json() as CommentData;

      // If the comment was successfully created, update the local state to show the new reply
      setPost((prevPost) => {
        if (prevPost) {
          const updatedComments = prevPost.attributes?.comments?.data?.map((comment) => {
            // Find the parent comment to add the new reply
            if (comment.id === parentId) {
              // If the comment has no replies yet, create a new 'replies' array and add the new reply to it
              if (!comment.attributes?.replies) {
                return {
                  ...comment,
                  attributes: {
                    ...comment.attributes,
                    replies: [createdComment]
                  }
                }
              }
              // Otherwise, add the new reply to the existing 'replies' array
              return {
                ...comment,
                attributes: {
                  ...comment.attributes,
                  replies: [...(comment.attributes?.replies || []), createdComment]
                }
              };
            }
            return comment;
          });
          return {
            ...prevPost,
            attributes: {
              ...prevPost.attributes,
              comments: {
                data: updatedComments || []
              }
            }
          };
        }
        return prevPost;
      });
    } else {
      // Log the error message and status for debugging
      console.error(`Error: ${response.status} ${response.statusText}`);
      const errorDetails = await response.json();
      console.error('Error details:', errorDetails);
    }
  };


  return (
    <div className="w-full min-h-screen bg-black p-4 pt-16">
      <div key={post?.id}
           className="w-full max-w-3xl mx-auto text-white rounded-md shadow-md p-8">
        <div className="text-black mb-12">
          <h2 className="text-gray-300 text-2xl font-semibold mb-8">{post?.attributes?.title}</h2>
          <p
            className="text-gray-500 mb-4">{post?.attributes?.author} / {UseFormatDate(post?.attributes?.publishedAt || undefined)}</p>
          <p className="text-gray-300 leading-relaxed mb-2">{post?.attributes?.content}</p>
          <p className="text-gray-100 text-sm mb-2">{post?.attributes?.author}</p>
          <p className="text-gray-100 text-sm mb-2">{UseFormatDate(post?.attributes?.createdAt || undefined)}</p>
        </div>
        <div className="text-gray-100">
          <div className="mb-2 font-semibold text-xl">Comments</div>
          {post?.attributes?.comments?.data.map((comment: CommentData, index) => (
            <Comment key={comment.id || index} comment={comment} handleReply={handleReply}/>
          ))}
          <p className="text-gray-100 mb-2 mt-6">Add a comment:</p>
          <form onSubmit={handleNewComment} className="mb-4">
            <div>
              <input
                type="text"
                placeholder="Your name"
                className="border p-2 rounded w-full mb-2 bg-black"
                value={newCommentName}
                onChange={(e) => setNewCommentName(e.target.value)}
              />
              <textarea
                placeholder="Your comment"
                className="border p-2 rounded w-full mb-2 bg-black"
                value={newCommentContent}
                onChange={(e) => setNewCommentContent(e.target.value)}
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-black text-white py-1 px-2 rounded"
            >
              Submit comment
            </button>
          </form>
        </div>
      </div>
    </div>
  );


};

export default BlogPage;
