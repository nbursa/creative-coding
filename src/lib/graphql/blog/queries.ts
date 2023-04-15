import {gql} from "@apollo/client";

const GET_BLOG_POST_BY_SLUG = gql`
    query BlogPostBySlug($slug: String!) {
        blogPosts(slug: $slug) {
            id
            title
            author
            publishedAt
            createdAt
            content
            comments {
                id
                name
                body
                createdAt
                replies {
                    id
                    name
                    body
                    createdAt
                }
            }
        }
    }
`;
/*
// export const ADD_COMMENT = gql`
//     mutation AddComment($input: createCommentInput!) {
//         createComment(input: $input) {
//             comment {
//                 id
//                 name
//                 body
//                 createdAt
//                 replies {
//                     id
//                     name
//                     body
//                     createdAt
//                 }
//             }
//         }
//     }
// `;

export default GET_BLOG_POST_BY_SLUG;
*/