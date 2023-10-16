import { ConfirmDelete, Menus, Modal, Table } from "@/components/shared";
import { ICoupon } from "@/interfaces";
import { styled } from "styled-components";
import { RiDeleteBinLine } from "react-icons/ri";
import { BsEye } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { formatCurrencyVND } from "@/utils";
import { format } from "date-fns";
import Tag from "@/components/shared/Tag";
import { MdAddLink } from "react-icons/md";
import { UseCouponApi } from "@/apis-use";

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
  coupon: ICoupon;
}

export default function DiscountRow(props: IProps) {
  const navigate = useNavigate();
  const { isDeletingCoupon, deleteCoupon } = UseCouponApi.deleteCoupon();
  const expiredDiscount =
    new Date(props.coupon.coupon_endDate).getTime() < Date.now();
  return (
    <Table.Row>
      <DiscountName>{props.coupon.coupon_name}</DiscountName>
      <DiscountType>
        {props.coupon.coupon_type === "percentage" ? "%" : "USD"}
      </DiscountType>
      <DiscountValue>
        {props.coupon.coupon_type === "percentage"
          ? props.coupon.coupon_value + "%"
          : formatCurrencyVND(props.coupon.coupon_value)}
      </DiscountValue>
      <DiscountValue>
        {formatCurrencyVND(props.coupon.coupon_minimumOrderValue)}
      </DiscountValue>
      <DiscountValue>
        {props.coupon.coupon_numberOfApplication + " Coupon"}
      </DiscountValue>
      <Stacked>
        <span>
          {format(new Date(props.coupon.coupon_startDate), "dd MMM yyyy")}{" "}
          &rarr;
          {format(new Date(props.coupon.coupon_endDate), "dd MMM yyyy")}
        </span>
      </Stacked>
      <Tag $type={expiredDiscount ? "red" : "green"}>
        {expiredDiscount ? "expired" : "available"}
      </Tag>
      <Modal>
        <Menus.Menu>
          <Menus.ToggleButton id={props.coupon._id || ""} />
          <Menus.List id={props.coupon._id || ""}>
            <Menus.Button
              icon={<BsEye />}
              onClick={() => navigate(`detail/${props.coupon._id}`)}
            >
              See detail
            </Menus.Button>
            <Menus.Button
              icon={<CiEdit />}
              onClick={() => navigate(`update/${props.coupon._id}`)}
            >
              Edit coupon
            </Menus.Button>
            <Menus.Button
              icon={<MdAddLink />}
              onClick={() => navigate(`addProduct/${props.coupon._id}`)}
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
            disabled={isDeletingCoupon}
            onConfirm={() => deleteCoupon({ _id: props.coupon._id })}
            resourceName={props.coupon.coupon_name}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}
