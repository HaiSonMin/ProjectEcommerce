import { ConfirmDelete, Menus, Modal, Table } from "@/components";
import { IDemand, IProductCategoryGroup } from "@/interfaces";
import { styled } from "styled-components";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import DemandForm from "./DemandForm";
import { useNavigate } from "react-router-dom";
import { UseDemandApi } from "@/apis-use";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  /* aspect-ratio: 3/2; */
  object-fit: contain;
  object-position: center;
  /* transform: scale(1.2) translate(6px); */
  border-radius: 4px;
`;

const CategoryType = styled.div`
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const CategoryName = styled.div`
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

const CategoryGroup = styled.div`
  font-size: 1.4rem;
  color: var(--color-grey-600);
  font-weight: 600;
`;

const DemandName = styled.div`
  font-size: 1.4rem;
  color: var(--color-grey-600);
  letter-spacing: 1px;
`;

interface IProps {
  key: React.Key;
  demand: IDemand;
}

export default function DemandRow(props: IProps) {
  const navigate = useNavigate();
  const { isDeletingDemand, deleteDemand } = UseDemandApi.deleteDemand();
  return (
    <Table.Row>
      <Img src={props.demand.demand_image} alt={props.demand._id} />
      <DemandName>{props.demand.demand_name}</DemandName>
      <CategoryName>
        {typeof props.demand.demand_productCategory === "string"
          ? props.demand.demand_productCategory
          : props.demand.demand_productCategory?.productCategory_name}
      </CategoryName>
      <CategoryType>
        {typeof props.demand.demand_productCategory === "string"
          ? props.demand.demand_productCategory
          : props.demand.demand_productCategory?.productCategory_type}
      </CategoryType>
      <CategoryGroup>
        {typeof props.demand.demand_productCategory === "string"
          ? props.demand.demand_productCategory
          : (
              props.demand.demand_productCategory
                ?.productCategory_group as IProductCategoryGroup
            )?.productCategoryGroup_name}
      </CategoryGroup>
      <Modal>
        <Menus.Menu>
          <Menus.ToggleButton id={props.demand._id} />
          <Menus.List id={props.demand._id}>
            <Menus.Button
              icon={<CiEdit />}
              onClick={() => navigate(`update/${props.demand._id}`)}
            >
              Edit
            </Menus.Button>
            <Modal.Open openWindowName="deleteDemand">
              <Menus.Button icon={<RiDeleteBinLine />}>Delete</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window windowName="editDemand">
          <DemandForm demandEdit={props.demand} />
        </Modal.Window>

        <Modal.Window windowName="deleteDemand">
          <ConfirmDelete
            disabled={isDeletingDemand}
            resourceName={props.demand.demand_name}
            onConfirm={() => deleteDemand({ _id: props.demand._id })}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}
