import { Post, PostDocument } from '../models/post';

export type PostViewModel = Post & {
  id: string
};

const createPostViewModel = (postDoc: PostDocument): PostViewModel => ({
  id: postDoc._id.toString(),
  petName: postDoc.petName,
  author: postDoc.author,
  description: postDoc.description,
  picURL: postDoc.picURL,
  createdAt: postDoc.createdAt,
  updatedAt: postDoc.updatedAt,

});

export default createPostViewModel;
