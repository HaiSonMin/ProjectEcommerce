import BrandRow from "./BrandRow";
import UseBrand from "./UseBrandApi";
import { sortObject } from "@/utils";
import { IBrand } from "@/interfaces";
import { useSearchParams } from "react-router-dom";
import { Menus, Spinner, Table, Pagination } from "@/components";

export default function BrandTable() {
  const [searchParams] = useSearchParams();
  const { isGettingBrands, metadata } = UseBrand.getAllBrand();

  // Sort
  const sortByValue = searchParams.get("sort") || "created_at-asc";

  const sortedCabins = sortObject({
    data: metadata?.brands,
    sortValue: sortByValue,
  });

  if (isGettingBrands) return <Spinner />;

  return (
    <Menus>
      <Table columns="1fr 1.2fr 2fr 0.4fr">
        <Table.Header>
          <div>Logo</div>
          <div>Brand Name</div>
          <div>Brand Origin</div>
          <div>Options</div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(brand: IBrand) => <BrandRow brand={brand} key={brand._id} />}
        />
        <Table.Footer>
          <Pagination countItems={metadata?.totalBrands} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}
