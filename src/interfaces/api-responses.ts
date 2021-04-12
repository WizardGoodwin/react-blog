import { IComment } from './comment.interface';
import { IPost } from './post.interface';
import { IUser } from './user.interface';

export type CommentResponse = [string, IComment];

export type PostResponse = [string, IPost];

export type UserResponse = [string, IUser];

export interface IAuthResponse {
  data: {
    idToken: string;
    localId: string;
  }
}

export interface IUserPostResponse {
  data: IUser;
}

export interface IError {
  response: {
    data: {
      error: string;
    }
  }
}
