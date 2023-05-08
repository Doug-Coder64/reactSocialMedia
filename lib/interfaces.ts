export interface Post {
  title?: string;
  content: string;
  authorId: number;
  predecessorId?: number;
  published: boolean;
  createdAt: Date;
  imageLinkId?: number;
}
