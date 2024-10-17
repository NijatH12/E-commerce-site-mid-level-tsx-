export interface UserType {
  id: string;
  username: string;
  password: string;
  balance: number;
}
export interface productType{
  id:number,
  title:string,
  price:number,
  description:string,
  category:string,
  image:string,
  rating:rating,
  count:number
}

interface rating{
  rate:number,
  count:number
}