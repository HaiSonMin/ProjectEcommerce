import { useSearchParams } from "react-router-dom";
import { IDemand } from "@/interfaces";
import DemandRow from "./DemandRow";
import { Menus, Pagination, Spinner, Table } from "@/components";
import { useEffect } from "react";
import { KEY_QUERY, VALUE_CONSTANT } from "@/constant";
import { UseDemandApi } from "@/apis-use";

export default function DemandTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    searchParams.set("limit", String(VALUE_CONSTANT.LIMIT_PAGE));
    setSearchParams(searchParams);
  }, []);

  let data:
      | {
          totalDemands: number;
          demandsPerPage: number;
          demands: Array<IDemand>;
        }
      | undefined,
    isGetting: boolean;
  if (!searchParams.get(KEY_QUERY.KEY_SEARCH)) {
    console.log("Get");
    const { isGettingDemands, metadata } = UseDemandApi.getAllDemands();
    data = metadata;
    isGetting = isGettingDemands;
  } else {
    console.log("Search");
    const { isSearchingDemands, metadata } = UseDemandApi.searchDemands();
    data = metadata;
    isGetting = isSearchingDemands;
  }

  if (isGetting) return <Spinner />;

  return (
    <Menus>
      <Table columns="1fr 1.5fr 1.5fr 1.5fr 1.5fr 0.4fr">
        <Table.Header>
          <div>Avatar</div>
          <div>Demand Name</div>
          <div>Category Name</div>
          <div>Category Type</div>
          <div>Category Group</div>
          <div>Options</div>
        </Table.Header>
        <Table.Body
          data={data?.demands}
          render={(Demand: IDemand) => (
            <DemandRow key={Demand._id} demand={Demand} />
          )}
        />
        <Table.Footer>
          <Pagination countItems={data?.totalDemands} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}
