import { BsEye } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { styled } from "styled-components";
import { UseProductApi } from "@/apis-use";
import { formatCurrencyVND } from "@/utils";
import { useNavigate } from "react-router-dom";
import { IBrand, IProduct } from "@/interfaces";
import { RiDeleteBinLine } from "react-icons/ri";
import { ConfirmDelete, Menus, Modal, Table } from "@/components";

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

const ProductBrandOrigin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const ProductCategory = styled(ProductBrand)``;

const ProductPrice = styled.div`
  color: var(--color-primary);
  font-weight: 600;
`;

interface IProps {
  key: React.Key;
  product: IProduct;
}

export default function ProductRow({ product }: IProps) {
  const navigate = useNavigate();
  const { isDeletingProduct, deleteProduct } = UseProductApi.deleteProduct();
  return (
    <Table.Row>
      <Img src={product.product_thumb} alt={product.product_name} />
      <ProductName>{product.product_name}</ProductName>
      <ProductBrand>
        {typeof product.product_brand === "string"
          ? product.product_brand
          : product.product_brand.brand_name}
      </ProductBrand>
      <ProductCategory>
        {typeof product.product_category === "string"
          ? product.product_category
          : product.product_category.productCategory_name}
      </ProductCategory>

      <ProductBrandOrigin>
        {typeof product.product_brand === "string"
          ? product.product_brand
          : product.product_brand.brand_origin}
      </ProductBrandOrigin>

      <ProductPrice>{formatCurrencyVND(+product.product_price)}</ProductPrice>
      <Modal>
        <Menus.Menu>
          <Menus.ToggleButton id={product._id || ""} />
          <Menus.List id={product._id || ""}>
            <Menus.Button
              icon={<BsEye />}
              onClick={() => navigate(`detail/${product._id}`)}
            >
              See detail
            </Menus.Button>
            <Menus.Button
              icon={<CiEdit />}
              onClick={() => navigate(`update/${product._id}`)}
            >
              Edit
            </Menus.Button>
            <Modal.Open openWindowName="deleteProduct">
              <Menus.Button icon={<RiDeleteBinLine />}>Delete</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>
        <Modal.Window windowName="deleteProduct">
          <ConfirmDelete
            disabled={isDeletingProduct}
            onConfirm={() => deleteProduct({ _id: product._id })}
            resourceName={product.product_name}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}
