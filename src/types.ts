export enum BookLevel {
  Intermediate = "Intermediate",
}

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
  filter: {
    title: string;
    price: string;
  };
};
