import axios from './axios';

import { IPost } from './interfaces/post.interface';

export const getUsers = () => axios.get(`/posts.json`);

export const addUser = (token: string | null, post: IPost) => axios.post(`/posts.json?auth=${token}`, post);

export const updateUser = (token: string | null, id: string, post: IPost) => axios.put(`/posts/${id}.json?auth=${token}`, post);

export const deleteUser = (token: string | null, id: string) => axios.delete(`/posts/${id}.json?auth=${token}`);

