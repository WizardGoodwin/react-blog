export interface IComment {
  author?: string | null;
  commentTitle: string;
  commentBody: string;
  likeCounter: number;
  dislikeCounter: number;
  postId?: string;
}
