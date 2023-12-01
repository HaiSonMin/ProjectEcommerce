import { Spinner } from '@/components/shared';
import { UseProductApi } from '@/apis-use';
import { ProductForm } from '@/features/admin/product';
import { useParams } from 'react-router-dom';

export default function ProductUpdatePage() {
  const { productId } = useParams();
  console.log('useParams():::', useParams());
  const { isGettingProduct, metadata: product } =
    UseProductApi.getProductById(productId);
  if (isGettingProduct) return <Spinner />;
  return <ProductForm productEdit={product} />;
}
