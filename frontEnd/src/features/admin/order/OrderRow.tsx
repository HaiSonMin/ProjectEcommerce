import { ConfirmDelete, Menus, Modal, Table, Tag } from "@/components";
import { IOrder, IUser } from "@/interfaces";
import { styled } from "styled-components";
import { RiDeleteBinLine } from "react-icons/ri";
import { BsEye } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { formatCurrencyVND } from "@/utils";
import { format } from "date-fns";
import UseOrderApi from "./UserOrderApi";
import IProduct, { IProductMainInfo } from "@/interfaces/product/product.interface";

const OrderProduct = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-size: 1.4rem;
  color: var(--color-grey-600);
  font-family: "Sono";
  font-weight: 500;
`;

const OrderValue = styled.div`
  font-size: 1.6rem;
  color: var(--color-grey-600);
  font-family: "Sono";
  font-weight: 500;
`;

const OrderDate = styled.div`
  font-size: 1.2rem;
  color: var(--color-grey-600);
  font-weight: 600;
`;

const OrderPayment = styled.div`
  font-size: 1.1rem;
  color: var(--color-grey-600);
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
  order: IOrder;
}

export default function OrderRow(props: IProps) {
  const userInfo: Pick<
    IUser,
    "user_email" | "user_phoneNumber" | "user_userName"
  > = props.order.order_byUser?.valueOf?.() as any;
  const productNames =
    Array.isArray(props.order.order_productMainInfos) &&
    props.order.order_productMainInfos.map(
      (pmi: IProductMainInfo) =>
        (pmi.product.valueOf?.() as IProduct).product_name
    );
  console.log(productNames);
  const navigate = useNavigate();
  const { isDeletingOrder, deleteOrder } = UseOrderApi.deleteOrder();
  return (
    <Table.Row>
      <Stacked>
        <span>{userInfo.user_userName}</span>
        <span>{userInfo.user_email}</span>
      </Stacked>
      <OrderProduct>
        {productNames &&
          productNames.map((productName) => <span key={productName}>{productName}</span>)}
      </OrderProduct>
      <OrderValue>{formatCurrencyVND(props.order.order_totalAmount)}</OrderValue>
      <OrderDate>
        {format(new Date(String(props.order.order_createdAt)), "dd MMM yyyy")}
      </OrderDate>
      <OrderPayment>{props.order.order_paymentIntent}</OrderPayment>
      <Tag
        $type={
          props.order.order_status === "processing"
            ? "yellow"
            : props.order.order_status === "cancel"
            ? "red"
            : "green"
        }
      >
        {props.order.order_status === "processing"
          ? "processing"
          : props.order.order_status === "cancel"
          ? "cancel"
          : "success"}
      </Tag>
      <Modal>
        <Menus.Menu>
          <Menus.ToggleButton id={props.order._id || ""} />
          <Menus.List id={props.order._id || ""}>
            <Menus.Button
              icon={<BsEye />}
              onClick={() => navigate(`detail/${props.order._id}`)}
            >
              See detail
            </Menus.Button>
            <Modal.Open openWindowName="deleteOrder">
              <Menus.Button icon={<RiDeleteBinLine />}>Delete</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>
        <Modal.Window windowName="deleteOrder">
          <ConfirmDelete
            disabled={isDeletingOrder}
            onConfirm={() => deleteOrder({ _id: props.order._id })}
            resourceName={"COnact"}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}
