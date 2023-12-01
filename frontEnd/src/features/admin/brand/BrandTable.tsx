import BrandRow from './BrandRow';
import { useEffect } from 'react';
import { IBrand } from '@/interfaces/models';
import { useSearchParams } from 'react-router-dom';
import { Menus, Spinner, Table, Pagination } from '@/components/shared';
import { KEY_QUERY, VALUE_CONSTANT } from '@/constant';
import { UseBrandApi } from '@/apis-use';

interface IProps {
  isSearch?: boolean;
}

export default function BrandTable(props: IProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    searchParams.set('limit', String(VALUE_CONSTANT.LIMIT_DEFAULT));
    setSearchParams(searchParams);
  }, []);

  let data:
      | {
          totalBrands: number;
          brandsPerPage: number;
          brands: Array<IBrand>;
        }
      | undefined,
    isGetting: boolean;
  if (!searchParams.get(KEY_QUERY.KEY_SEARCH)) {
    console.log('Get');
    const { isGettingBrands, metadata } = UseBrandApi.getAllBrand();
    data = metadata;
    isGetting = isGettingBrands;
  } else {
    console.log('Search');
    const { isSearchingBrands, metadata } = UseBrandApi.searchBrands();
    data = metadata;
    isGetting = isSearchingBrands;
  }

  if (isGetting) return <Spinner />;

  return (
    <Menus>
      <Table columns='1fr 1.2fr 2fr 0.4fr'>
        <Table.Header>
          <div>Logo</div>
          <div>Brand Name</div>
          <div>Brand Origin</div>
          <div>Options</div>
        </Table.Header>
        <Table.Body
          data={data?.brands}
          render={(brand: IBrand) => <BrandRow brand={brand} key={brand._id} />}
        />
        <Table.Footer>
          <Pagination countItems={data?.totalBrands} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}
