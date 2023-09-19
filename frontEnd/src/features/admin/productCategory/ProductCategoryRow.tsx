import { ConfirmDelete, Menus, Modal, Table } from "@/components";
import { IProductCategory } from "@/interfaces";
import { styled } from "styled-components";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { UseProductCategoryApi } from "@/apis-use";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  /* aspect-ratio: 3/2; */
  object-fit: contain;
  object-position: center;
  /* transform: scale(1.2) translate(6px); */
  border-radius: 4px;
`;

const ProductCategoryType = styled.div`
  font-size: 1.4rem;
  color: var(--color-grey-600);
  font-family: "Sono";
  font-weight: 600;

  & span {
    color: var(--color-primary);
  }
`;

const ProductCategoryName = styled.div`
  font-size: 1.4rem;
  color: var(--color-grey-600);
  letter-spacing: 1px;
`;

const ProductCategoryGroup = styled.div`
  font-size: 1.4rem;
  color: var(--color-grey-600);
  letter-spacing: 1px;
  font-weight: 600;
`;

interface IProps {
  key: React.Key;
  productCategory: IProductCategory;
}

export default function ProductCategoryRow({ productCategory }: IProps) {
  const navigate = useNavigate();
  const { isDeletingProductCategory, deleteProductCategory } =
    UseProductCategoryApi.deleteCategory();
  const { isUpdatingProductCategory, updateProductCategory } =
    UseProductCategoryApi.updateCategory();
  return (
    <Table.Row>
      <Img
        src={productCategory.productCategory_image}
        alt={productCategory._id}
      />
      <ProductCategoryName>
        {productCategory.productCategory_name}
      </ProductCategoryName>
      <ProductCategoryType>
        {productCategory.productCategory_type || <span>Unknown</span>}
      </ProductCategoryType>
      <ProductCategoryGroup>
        {typeof productCategory.productCategory_group === "object"
          ? productCategory.productCategory_group.productCategoryGroup_name
          : productCategory.productCategory_group}
      </ProductCategoryGroup>
      <Modal>
        <Menus.Menu>
          <Menus.ToggleButton id={productCategory._id} />
          <Menus.List id={productCategory._id}>
            <Menus.Button
              icon={<CiEdit />}
              onClick={() => navigate(`update/${productCategory._id}`)}
            >
              Edit
            </Menus.Button>
            <Modal.Open openWindowName="deleteProductCategory">
              <Menus.Button icon={<RiDeleteBinLine />}>Delete</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>
        <Modal.Window windowName="deleteProductCategory">
          <ConfirmDelete
            disabled={isDeletingProductCategory}
            resourceName={productCategory.productCategory_name}
            onConfirm={() =>
              deleteProductCategory({ _id: productCategory._id })
            }
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}
