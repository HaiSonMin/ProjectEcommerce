import { useSearchParams } from "react-router-dom";
import { IDemand } from "@/interfaces";
import DemandRow from "./DemandRow";
import UseDemandApi from "./UseDemandApi";
import { Menus, Pagination, Spinner, Table } from "@/components";
import { useEffect } from "react";
import { VALUE_CONSTANT } from "@/constant";

export default function DemandTable() {
  const { isGettingDemands, metadata } = UseDemandApi.getAllDemands();

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    searchParams.set("limit", String(VALUE_CONSTANT.LIMIT_PAGE));
    searchParams.set("sort", "ctime");
    setSearchParams(searchParams);
  }, []);

  if (isGettingDemands) return <Spinner />;

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
          data={metadata?.demands}
          render={(Demand: IDemand) => (
            <DemandRow key={Demand._id} demand={Demand} />
          )}
        />
        <Table.Footer>
          <Pagination countItems={metadata?.totalDemands} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}
