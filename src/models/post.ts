import mongoose, {
  Model, Types, Document, Schema,
} from 'mongoose';
// import { User } from './user-model';

export type Post = {
  petName: string,
  author?: string,
  description: string,
  picURL?: string,
  createdAt: string,
  updatedAt: string,
};

export type PostProps = Omit<Post, 'createdAt' | 'updatedAt'>;

// type PostModelType = Model<Post, unknown>;

export type PostDocument = Document<
  Types.ObjectId,
  unknown,
  Post
> & Post & {
  _id: Types.ObjectId;
};

const postSchema: Schema = new Schema<Post, Model<Post>>({
  petName: {
    type: String,
    required: true,
  },
  author: {
    // type: Schema.Types.ObjectId,
    // ref: 'User',
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
  picURL: {
    type: String,
    // required: true,
    // unique: true,
  },
}, {
  timestamps: true,
});

const PostModel = mongoose.model('Post', postSchema);

export default PostModel;
