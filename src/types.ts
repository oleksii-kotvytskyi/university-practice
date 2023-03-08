import { SORT_BY } from "./redux/filters/actions";

export enum BookLevel {
  Intermediate = "Intermediate",
}

export type FilterType = typeof SORT_BY;

export interface BookI {
  author: string;
  count: number;
  cover?: string;
  description: string;
  id: string;
  level: BookLevel;
  price: number;
  tags: string[];
  title: string;
}

export type BookListProps = {
  books?: BookI;
  getBooksCT: () => void;
  isLoading: boolean;
  error?: string;
  filter: FilterType;
};
