export type ListWithPaginationProps<T> = {
  items: T[];
  renderItemCard: (item: T, index: number) => React.ReactElement;
  getItemId: (item: T, index: number) => string | number;
  renderItemCardSkeleton?: React.ReactElement;
  itemsPerPageBySize?: {
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
