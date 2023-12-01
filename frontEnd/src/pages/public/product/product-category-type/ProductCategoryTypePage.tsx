import { UseProductCategoryApi } from '@/apis-use';
import { SpinnerLogo } from '@/components/shared';
import { useLocation } from 'react-router-dom';
import CategoryMultiTypePage from './multi-type';
import CategoryOneTypePage from './one-type';
import { useURLSearchParams } from '@/hooks';

export default function ProductCategoryTypePage() {
  const { search } = useLocation();

  const { catType } = useURLSearchParams(search);

  const typeFind = (catType as string).replaceAll('+', ' ');

  const { isGettingProductCategories, metadata: categories } =
    UseProductCategoryApi.getCategoriesByType(typeFind);

  console.log('categories::::', categories);

  if (isGettingProductCategories) return <SpinnerLogo />;

  if (categories)
    if (categories?.length > 1) return <CategoryMultiTypePage />;
    else return <CategoryOneTypePage productCategory={categories[0]} />;
}
