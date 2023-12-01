import CategoryOneTypeLayout from '@/features/public/product/product-category/one-type';
import { IProductCategory } from '@/interfaces/models/productCategory.interface';

interface IProps {
  productCategory: IProductCategory;
}

export default function CategoryOneTypePage({ productCategory }: IProps) {
  return <CategoryOneTypeLayout productCategory={productCategory} />;
}
