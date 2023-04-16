import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import BlogEntry from '@/components/BlogEntry';
import {BlogEntryType, CommentDataType} from '@/types';

const BlogEntryPage: React.FC = () => {
  const {slug} = useRouter().query;
  const commentsUrl = `http://localhost:1337/api/comments`;
  const token = 'Bearer ' + process.env.NEXT_PUBLIC_STRAPI_JWT_TOKEN;
  const [post, setPost] = useState<BlogEntryType | null>(null);
  const [newCommentName, setNewCommentName] = useState<string>('');
  const [newCommentContent, setNewCommentContent] = useState<string>('');
  const [loadingPage, setLoadingPage] = useState<boolean>(false);
  const [errorOnPage, setErrorOnPage] = useState<string>("");

  useEffect(() => {
    setPost({
      id: 1,
      attributes: {
        title: "My First Blog Post",
        slug: "my-first-blog-post",
        author: "John Doe",
        publishedAt: new Date("2022-04-01T08:00:00Z"),
        createdAt: new Date("2022-03-31T12:30:00Z"),
        cover: {
          url: "https://example.com/images/my-first-blog-post-cover.jpg",
          formats: {
            thumbnail: {
              url: "https://example.com/images/my-first-blog-post-cover-thumbnail.jpg"
            }
          }
        },
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        summary: "This is a summary of my first blog post.",
        categories: [
          {id: 1, name: "Technology"},
          {id: 2, name: "Programming"}
        ],
        comments: {
          data: [
            {
              id: 1,
              attributes: {
                name: "Jane Doe",
                body: "Great post! I really enjoyed reading it.",
                publishedAt: new Date("2022-04-02T10:15:00Z"),
                createdAt: new Date("2022-04-02T10:15:00Z"),
                status: "published",
                IP: "127.0.0.1",
                agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.85 Safari/537.36",
                replies: [
                  {
                    id: 2,
                    attributes: {
                      name: "John Smith",
                      body: "Thanks for sharing!",
                      publishedAt: new Date("2022-04-03T14:30:00Z"),
                      createdAt: new Date("2022-04-03T14:30:00Z"),
                      status: "published",
                      IP: "127.0.0.1",
                      agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.85 Safari/537.36",
                      parent: {
                        id: 1,
                        attributes: {
                          name: "Jane Doe",
                          body: "Great post! I really enjoyed reading it.",
                          publishedAt: new Date("2022-04-02T10:15:00Z"),
                          createdAt: new Date("2022-04-02T10:15:00Z"),
                          status: "published",
                          IP: "127.0.0.1",
                          agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.85 Safari/537.36"
                        }
                      }
                    }
                  }
                ]
              }
            }
          ]
        }
      }
    });

  }, [slug])

  const addComment = async (name: string, content: string) => {
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
      console.error(`Error: ${response.status} ${response.statusText}`);
      const errorDetails = await response.json();
      console.error('Error details:', errorDetails);
    }
  };

  const handleNewComment = async (e: React.FormEvent<HTMLFormElement>, name: string, comment: string) => {
    e.preventDefault();
    if (!name?.trim() || !comment?.trim()) return;
    await addComment(name, comment);
    setNewCommentName('');
    setNewCommentContent('');
  };

  const handleReply = async (parentId: number, name: string, content: string) => {
    if (!post || !post.id) {
      console.error('Cannot add reply: Post or post ID is not defined');
      return;
    }

    const newComment: CommentDataType = {
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
      const createdComment = await response.json() as CommentDataType;

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
      console.error(`Error: ${response.status} ${response.statusText}`);
      const errorDetails = await response.json();
      console.error('Error details:', errorDetails);
    }
  };


  return (
    <div className="w-full min-h-screen p-4 pt-16">
      {loadingPage && <p className="text-center">Loading...</p>}
      {!!errorOnPage.length && <p className="text-center">Error: {errorOnPage}</p>}
      <h2 className="text-center text-4xl font-bold my-8">Blog Post
        Page</h2>
      {post?.attributes && post?.id ?
        <BlogEntry post={post} handleNewComment={handleNewComment} handleReply={handleReply}/> :
        <div className="w-full mt-12 flex justify-center items-center">No journal data</div>}
    </div>
  );


};

export default BlogEntryPage;
