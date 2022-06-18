import { RequestHandler } from 'express';
import { Error } from 'mongoose';
import PostModel, { PostDocument, PostProps } from '../models/post';
// import ErrorResponseBody from '../types/custom';
import createPostViewModel, { PostViewModel } from '../view-model-creators/create-post-view-model';

type SingularPostResponse = { post: PostViewModel } | ErrorResponseBody;

export const getPosts: RequestHandler<
  unknown,
  { posts: PostViewModel[] },
  unknown,
  { populate?: string }
> = async (req, res) => {
  // const { populate } = req.query;

  // const shouldPopulateCategories = populate === 'categories';

  // const posts: PostViewModel[];

  // if (shouldPopulateCategories) {
  //   const sculpturePopulatedDocs = await SculptureModel
  //     .find()
  //     .populate<{ categories: CategoryDocument[] }>('categories');
  //   sculptures = sculpturePopulatedDocs.map(createSculpturePopulatedViewModel);
  // } else {
  const postDocs = await PostModel.find();
  const posts: PostViewModel[] = postDocs.map(createPostViewModel);
  // }

  res.status(200).json({ posts });
};

export const getPost: RequestHandler<
  { id: string },
  { post: PostViewModel } | ErrorResponseBody,
  unknown,
  { populate?: string }
> = async (req, res) => {
  const { id } = req.params;
  // const { populate } = req.query;
  // const shouldPopulateCategories = populate === 'categories';

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
  SingularPostResponse,
  PostProps
> = async (req, res) => {
  const postProps = req.body;
  try {
    // const uniqCategoriesIds = await validateCategoriesIds(sculptureProps.categories);
    // postProps.categories = uniqCategoriesIds;
    const postDoc = await PostModel.create(postProps);
    const postViewModel = createPostViewModel(postDoc);
    res.status(201).json({ post: postViewModel });
  } catch (err) {
    res.status(400).json({ error: 'Server error' });
  }
};
