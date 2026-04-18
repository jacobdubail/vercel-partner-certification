import { SearchForm } from "@/components/search/search-form";
import { getCategories } from "@/utilities/articles";

type FilterFormProps = {
  defaultQ: string;
  defaultCategory: string;
};

export const FilterForm: React.FC<FilterFormProps> = async ({
  defaultQ,
  defaultCategory,
}) => {
  return (
    <SearchForm
      categoriesPromise={getCategories()}
      defaultQ={defaultQ}
      defaultCategory={defaultCategory}
    />
  );
};
