import { RequestHandler } from 'express';
import { Error } from 'mongoose';
import PostModel, { PostDocument, PostProps } from '../models/post';
import createPostViewModel, { PostViewModel } from '../view-model-creators/create-post-view-model';

type PostResponseBody = { post: PostViewModel } | ErrorResponseBody;

export const getPosts: RequestHandler<
  unknown,
  { posts: PostViewModel[] },
  unknown,
  { populate?: string }
> = async (req, res) => {
  const postDocs = await PostModel.find();
  const posts: PostViewModel[] = postDocs.map(createPostViewModel);

  res.status(200).json({ posts });
};

export const getPost: RequestHandler<
  { id: string },
  { post: PostViewModel } | ErrorResponseBody,
  unknown,
  { populate?: string }
> = async (req, res) => {
  const { id } = req.params;

  try {
    const postDoc = await PostModel.findById(id);

    if (postDoc === null) {
      throw new Error(`No post with ID'${id}' can be found.`);
    }
    const post = createPostViewModel(postDoc as PostDocument);

    res.status(200).json({ post });
  } catch (error) {
    res.status(404).json({
      error: `No post with ID'${id}' can be found.`,
    });
  }
};

export const createPost: RequestHandler<
  unknown,
  PostResponseBody,
  PostProps
> = async (req, res) => {
  const postProps = req.body;
  try {
    const postDoc = await PostModel.create(postProps);
    const postViewModel = createPostViewModel(postDoc);
    res.status(201).json({ post: postViewModel });
  } catch (err) {
    res.status(400).json({ error: 'Server error' });
  }
};

export const updatePost: RequestHandler<
  { id: string },
  PostResponseBody,
  Partial<PostProps>
> = async (req, res) => {
  const { id } = req.params;
  const postProps = req.body;

  try {
    const postDoc = await PostModel.findByIdAndUpdate(id, postProps, { new: true });
    if (postDoc === null) {
      throw new Error(`No post with ID'${id}' can be found.`);
    }
    const postViewModel = createPostViewModel(postDoc);
    res.status(200).json({ post: postViewModel });
  } catch (error) {
    res.status(404).json({
      error: error instanceof Error ? error.message : 'Invalid input data',
    });
  }
};

export const deletePost: RequestHandler<
  { id: string },
  PostResponseBody
> = async (req, res) => {
  const { id } = req.params;

  try {
    const postDoc = await PostModel.findByIdAndDelete(id);
    if (postDoc === null) {
      throw new Error(`No post with ID'${id}' can be found.`);
    }
    const postViewModel = createPostViewModel(postDoc);
    res.status(200).json({ post: postViewModel });
  } catch (error) {
    res.status(404).json({
      error: error instanceof Error ? error.message : 'There was an error while trying to delete that post.',
    });
  }
};
