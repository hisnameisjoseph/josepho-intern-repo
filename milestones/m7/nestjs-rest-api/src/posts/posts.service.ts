import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

export class Post {
  id: number;
  title: string;
  content: string;
}

@Injectable()
export class PostsService {
  private posts: Post[] = [];
  create(createPostDto: CreatePostDto) {
    const post = { id: Date.now(), ...createPostDto };
    this.posts.push(post);
    return post;
  }

  findAll() {
    return this.posts;
  }

  findOne(id: number) {
  const post = this.posts.find(post => post.id === id);
  if (post) {
    return post;
  }
  // If you want to throw an exception instead, you can use:
  // throw new NotFoundException(`Post with id #${id} not found`);
  // For now, returning a string as per the original request
    return `Not found post with id #${id}`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    const post = this.posts.find(post => post.id === id);
    if (post) {
      Object.assign(post, updatePostDto);
      return post;
    }
    return null; // or throw an exception if preferred
  }

  remove(id: number) {
  const index = this.posts.findIndex(post => post.id === id);
  if (index > -1) {
    this.posts.splice(index, 1);
    return `This action removes a #${id} post`;
  }
  return `Post with id #${id} not found`;
  }
}
