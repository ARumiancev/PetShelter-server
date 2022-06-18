import { RequestHandler } from 'express';
import PostModel from '../models/post';
import createPostViewModel, { PostViewModel } from '../view-model-creators/create-post-view-model';

// type SingularPostResponse = { post: PostViewModel } | ErrorResponseBody;

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
