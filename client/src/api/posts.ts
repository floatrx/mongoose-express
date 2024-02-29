import { api } from '@/api/index';
import type { IPost, IPostCreate } from '@/types/post';

const path = '/posts';
const type = 'Post';

const injectedRtkApi = api.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    searchPosts: query<IPost[], void>({
      query: () => ({ url: path }),
      providesTags: [type],
    }),
    getPost: query<IPost, string | undefined>({
      query: (id) => `${path}/${id}`,
      providesTags: [type],
    }),
    createPost: mutation<IPost, IPostCreate>({
      query: (body) => ({ url: path, method: 'POST', body }),
      invalidatesTags: [type],
    }),
    updatePost: mutation<IPost, Partial<IPostCreate> & { id: string }>({
      query: ({ id, ...body }) => ({ url: `${path}/${id}`, method: 'PUT', body }),
      invalidatesTags: [type],
    }),
    deletePost: mutation<IPost, string>({
      query: (id) => ({ url: `${path}/${id}`, method: 'DELETE' }),
      invalidatesTags: [type],
    }),
  }),
});

export const { useSearchPostsQuery, useGetPostQuery, useCreatePostMutation, useUpdatePostMutation, useDeletePostMutation } = injectedRtkApi;
