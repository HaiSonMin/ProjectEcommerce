import { IBrand } from './brand.interface';
import { IDemand } from './demand.interface';
import IProductCategoryGroup from './productCategoryGroup.interface';

export interface IProductCategory {
  _id: string;
  productCategory_type: string;
  productCategory_group: string | IProductCategoryGroup;
  productCategory_name: string;
  productCategory_image: string;
  productCategory_demands: Array<IDemand>;
  productCategory_brands: Array<IBrand>;
  productCategory_filtersOptions: any;
}
