import { IBrand } from './brand.interface';
import { IDemand } from './demand.interface';
import { IProductCategory } from './productCategory.interface';

export interface IProductCategoryGroupChildren
  extends Pick<
    IProductCategory,
    '_id' | 'productCategory_type' | 'productCategory_name'
  > {
  productCategory_demands: Array<Pick<IDemand, '_id' | 'demand_name'>>;
  productCategory_brands: Array<Pick<IBrand, '_id' | 'brand_name'>>;
}

export interface IProductCategoryGroup {
  _id: string;
  productCategoryGroup_name: string;
  productCategoryGroup_image: string;
  productCategoryGroup_categoryChildren: Array<IProductCategoryGroupChildren>;
}
