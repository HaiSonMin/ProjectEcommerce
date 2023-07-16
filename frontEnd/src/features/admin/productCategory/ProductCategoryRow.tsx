import { ConfirmDelete, Menus, Modal, Table } from "../../../components";
import { ProductCategoryType } from "../../../featureTypes";
import { styled } from "styled-components";
import UseProductCategoryApi from "./UseProductCategoryApi";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import ProductCategoryForm from "./ProductCategoryForm";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  /* aspect-ratio: 3/2; */
  object-fit: contain;
  object-position: center;
  /* transform: scale(1.2) translate(6px); */
  border-radius: 4px;
`;

const ProductCategoryName = styled.div`
  font-size: 1.6rem;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

interface IProps {
  key: React.Key;
  productCategory: ProductCategoryType;
}

export default function ProductCategoryRow(props: IProps) {
  const { isDeletingProductCategory, deleteProductCategory } =
    UseProductCategoryApi.useDeleteCategory();

  console.log(props.productCategory);
  return (
    <Table.Row>
      <Img
        src={props.productCategory.productCategory_image}
        alt={props.productCategory._id}
      />
      <ProductCategoryName>
        {props.productCategory.productCategory_name}
      </ProductCategoryName>
      <Modal>
        <Menus.Menu>
          <Menus.ToggleButton id={props.productCategory._id} />
          <Menus.List id={props.productCategory._id}>
            <Modal.Open openWindowName="editProductCategory">
              <Menus.Button icon={<CiEdit />}>Edit</Menus.Button>
            </Modal.Open>
            <Modal.Open openWindowName="deleteProductCategory">
              <Menus.Button icon={<RiDeleteBinLine />}>Delete</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window windowName="editProductCategory">
          <ProductCategoryForm editToProductCategory={props.productCategory} />
        </Modal.Window>

        <Modal.Window windowName="deleteProductCategory">
          <ConfirmDelete
            disabled={isDeletingProductCategory}
            resourceName={props.productCategory.productCategory_name}
            onConfirm={() =>
              deleteProductCategory({ _id: props.productCategory._id })
            }
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}
