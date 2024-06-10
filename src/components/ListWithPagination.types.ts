import { DataWithId } from "@/types/dataTypes";

export type ListWithPaginationProps<T extends DataWithId> = {
  items: T[];
  onCreateItemCard: (item: T, index: number) => React.ReactElement;
  ItemCardSkeleton?: React.ReactElement;
  showBySize?: {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    xxl?: number;
  };
  maxItemsPerPage?: number;
  loading?: boolean;
};
