export interface Posts{
  id:string
  name: string;
  date: string;
  content:{
  location:string,
  authorty:string,
  servicetype:string,
  requireddocs:string,
  fees:string,
  notes:string,
  }
  likes: number;
  dislikes: number;
};