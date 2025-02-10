export interface IProducts {
  sold: number;
  images: string[];
  subcategory: Subcategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  category: ICategory;
  brand: ICategory;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  id: string;
}

interface ICategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}
// interface IProductDetails {
//   sold: number;
//   images: string[];
//   subcategory: Subcategory[];
//   ratingsQuantity: number;
//   _id: string;
//   title: string;
//   slug: string;
//   description: string;
//   quantity: number;
//   price: number;
//   imageCover: string;
//   category: Category;
//   brand: Category;
//   ratingsAverage: number;
//   createdAt: string;
//   updatedAt: string;
//   __v: number;
//   reviews: any[];
//   id: string;
// }

// interface Category {
//   _id: string;
//   name: string;
//   slug: string;
//   image: string;
// }

// interface Subcategory {
//   _id: string;
//   name: string;
//   slug: string;
//   category: string;
// }
