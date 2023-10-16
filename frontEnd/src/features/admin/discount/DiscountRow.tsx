import { ConfirmDelete, Menus, Modal, Table } from "@/components/shared";
import { IDiscount } from "@/interfaces";
import { styled } from "styled-components";
import { RiDeleteBinLine } from "react-icons/ri";
import { BsEye } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { formatCurrencyVND, formatDistanceFromNow } from "@/utils";
import { format, isToday } from "date-fns";
import Tag from "@/components/shared/Tag";
import { MdAddLink } from "react-icons/md";
import { UseDiscountApi } from "@/apis-use";

const DiscountName = styled.div`
  font-size: 1.4rem;
  color: var(--color-grey-600);
  font-family: "Sono";
  font-weight: 600;
  letter-spacing: 0.1px;
`;

const DiscountType = styled.div`
  font-size: 1.4rem;
  color: var(--color-grey-600);
  font-family: "Sono";
  font-weight: 500;
  letter-spacing: 0.2px;
`;

const DiscountValue = styled.div`
  font-size: 1.6rem;
  color: var(--color-grey-600);
  font-family: "Sono";
  font-weight: 500;
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  font-size: 1.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
  }
`;

interface IProps {
  key: React.Key;
  discount: IDiscount;
}

export default function DiscountRow(props: IProps) {
  const navigate = useNavigate();
  const { isDeletingDiscount, deleteDiscount } =
    UseDiscountApi.deleteDiscount();
  const expiredDiscount =
    new Date(props.discount.discount_endDate).getTime() < Date.now();
  return (
    <Table.Row>
      <DiscountName>{props.discount.discount_name}</DiscountName>
      <DiscountType>{props.discount.discount_type}</DiscountType>
      <DiscountValue>
        {props.discount.discount_type === "percentage"
          ? props.discount.discount_value + "%"
          : formatCurrencyVND(props.discount.discount_value)}
      </DiscountValue>
      <Stacked>
        <span>
          {format(new Date(props.discount.discount_startDate), "dd MMM yyyy")}{" "}
          &rarr;
          {format(new Date(props.discount.discount_endDate), "dd MMM yyyy")}
        </span>
      </Stacked>
      <Tag $type={expiredDiscount ? "red" : "green"}>
        {expiredDiscount ? "expired" : "available"}
      </Tag>
      <Modal>
        <Menus.Menu>
          <Menus.ToggleButton id={props.discount._id || ""} />
          <Menus.List id={props.discount._id || ""}>
            <Menus.Button
              icon={<BsEye />}
              onClick={() => navigate(`detail/${props.discount._id}`)}
            >
              See detail
            </Menus.Button>
            <Menus.Button
              icon={<CiEdit />}
              onClick={() => navigate(`update/${props.discount._id}`)}
            >
              Edit discount
            </Menus.Button>
            <Menus.Button
              icon={<MdAddLink />}
              onClick={() => navigate(`addProduct/${props.discount._id}`)}
            >
              Add Products
            </Menus.Button>
            <Modal.Open openWindowName="deleteDiscount">
              <Menus.Button icon={<RiDeleteBinLine />}>Delete</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>
        <Modal.Window windowName="deleteDiscount">
          <ConfirmDelete
            disabled={isDeletingDiscount}
            onConfirm={() => deleteDiscount({ _id: props.discount._id })}
            resourceName={props.discount.discount_name}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}
