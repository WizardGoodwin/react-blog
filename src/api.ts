import axios from './axios';

import { SIGN_IN_URL, SIGN_UP_URL } from './shared/constants';
import { ISignUpForm } from './features/auth/SignUp';
import { ISignInForm } from './features/auth/SignIn';
import { IUser } from './interfaces/user.interface';
import { IPost } from './interfaces/post.interface';
import { IComment } from './interfaces/comment.interface';


export const signUp = (authData: ISignUpForm) => axios.post(SIGN_UP_URL, { ...authData, returnSecureToken: true });

export const signIn = (authData: ISignInForm) => axios.post(SIGN_IN_URL, { ...authData, returnSecureToken: true });


export const getUsers = (token: string | null) => axios.get(`/users.json?auth=${token}`);

export const getUserById = (token: string | null, id: string | null) => axios.get(`/users/${id}.json?auth=${token}`);

export const addUser = (user: IUser) => axios.post('/users.json', user);

export const updateUser = (token: string | null, id: string | null, user: IUser) => axios.put(`/users/${id}.json?auth=${token}`, user);


export const getPosts = () => axios.get(`/posts.json`);

export const addPost = (token: string | null, post: IPost) => axios.post(`/posts.json?auth=${token}`, post);

export const updatePost = (token: string | null, id: string, post: IPost) => axios.put(`/posts/${id}.json?auth=${token}`, post);

export const deletePost = (token: string | null, id: string) => axios.delete(`/posts/${id}.json?auth=${token}`);


export const getComments = () => axios.get(`/comments.json`);

export const addComment = (token: string | null, comment: IComment) => axios.post(`/comments.json?auth=${token}`, comment);

export const updateComment = (id: string, comment: IComment) => axios.put(`/comments/${id}.json`, comment);
