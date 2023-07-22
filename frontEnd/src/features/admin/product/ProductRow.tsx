import UseProductApi from "./UseProductApi";
import { BsEye } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { styled } from "styled-components";
import { RiDeleteBinLine } from "react-icons/ri";
import { formatCurrency } from "../../../utils";
import { IProductType } from "../../../featureTypes";
import { ConfirmDelete, Menus, Modal, Table } from "../../../components";
import { useNavigate } from "react-router-dom";
import { AiFillFileAdd } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2; // Tỉ lệ khung hình
  object-fit: contain;
  object-position: center;
  /* transform: scale(1.4) translateX(6px); */
  border-radius: 4px;
`;

const ProductName = styled.div`
  font-size: 1.6rem;
  color: var(--color-grey-600);
  font-family: "Sono";
  letter-spacing: 0.2px;
`;

const ProductBrand = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const ProductCategory = styled(ProductBrand)``;

const ProductPrice = styled.div`
  color: var(--color-green-700);
  font-weight: 500;
`;

interface IProps {
  key: React.Key;
  product: IProductType;
}

export default function ProductRow(props: IProps) {
  const navigate = useNavigate();
  const { isDeletingProduct, deleteProduct } = UseProductApi.deleteProduct();
  return (
    <Table.Row>
      <Img src={props.product.product_thumb} alt={props.product.product_name} />
      <ProductName>{props.product.product_name}</ProductName>
      <ProductBrand>{props.product.brand[0]?.brand_name}</ProductBrand>
      <ProductCategory>
        {props.product.category[0]?.productCategory_name}
      </ProductCategory>
      <ProductPrice>
        {formatCurrency(+props.product.product_price)}
      </ProductPrice>
      <Modal>
        <Menus.Menu>
          <Menus.ToggleButton id={props.product._id} />
          <Menus.List id={props.product._id}>
            <Menus.Button
              icon={<BsEye />}
              onClick={() => navigate(`detail/${props.product._id}`)}
            >
              See detail
            </Menus.Button>
            <Menus.Button
              icon={<AiFillFileAdd />}
              onClick={() => navigate(`provideInfo/${props.product._id}`)}
            >
              Provide Product
            </Menus.Button>
            <Menus.Button
              icon={<CiEdit />}
              onClick={() => navigate(`editBasic/${props.product._id}`)}
            >
              Edit Product Basic
            </Menus.Button>
            <Menus.Button
              icon={<BiEdit />}
              onClick={() => navigate(`editMainInfo/${props.product._id}`)}
            >
              Edit Product MainInfo
            </Menus.Button>

            <Modal.Open openWindowName="deleteProduct">
              <Menus.Button icon={<RiDeleteBinLine />}>Delete</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>
        <Modal.Window windowName="deleteProduct">
          <ConfirmDelete
            disabled={isDeletingProduct}
            onConfirm={() => deleteProduct({ _id: props.product._id })}
            resourceName={props.product.product_name}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}
