import { Dispatch, FormEvent, MouseEventHandler, SetStateAction } from "react";

export interface CustomButtonProps {
  title: string;
  containerStyles?: string;
  textStyles?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  btnType?: "button" | "submit";
  leftIcon?: string;
  disabled?: boolean;
}

export interface SearchCategoryProps {
  category: string;
  setCategory: (category: string) => void;
}

export interface UserProps {
  name?: string;
  email: string;
  username: string;
  image?: string;
}

export interface RecipeNewProps {
  name: string;
  category: string;
  description: string;
  photo: string;
  ingredients: Array<string>;
  steps: Array<string>;
  stars: Array<number>;
}

export interface RecipeFullProps extends RecipeNewProps {
  _id : string;
  creator : UserProps;
}

export interface ReviewProps {
  creator: UserProps;
  review: string;
  starCount: number;
  createDate: Date;
}

export type RecipeArray = RecipeFullProps[];

export interface FormSubmitProps {
  post : RecipeNewProps;
  setPost : Dispatch<SetStateAction<RecipeNewProps>>;
  uploadPhoto: (e: React.ChangeEvent<HTMLInputElement>) => Promise<string>;
  submitting : boolean;
  handleSubmit : (e: FormEvent<HTMLFormElement>) => void;
}

export interface ReviewSubmitProps {
  review : string;
  setReview : Dispatch<SetStateAction<string>>;
  stars : Array<number>;
  setStars : Dispatch<SetStateAction<Array<number>>>;
  submitting : boolean;
  handleSubmit : (e: FormEvent<HTMLFormElement>) => void;
}