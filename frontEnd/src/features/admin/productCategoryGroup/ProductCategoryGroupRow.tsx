import { ConfirmDelete, Menus, Modal, Table } from "@/components";
import { IProductCategory, IProductCategoryGroup } from "@/interfaces";
import { styled } from "styled-components";
import UseProductCategoryGroupApi from "./UseProductCategoryGroupApi";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  /* aspect-ratio: 3/2; */
  object-fit: contain;
  object-position: center;
  /* transform: scale(1.2) translate(6px); */
  border-radius: 4px;
`;

const ProductCategoryGroupName = styled.div`
  font-size: 1.4rem;
  color: var(--color-grey-600);
  font-family: "Sono";

  & span {
    color: var(--color-primary);
    font-weight: 500;
  }
`;

interface IProps {
  key: React.Key;
  productCategoryGroup: IProductCategoryGroup;
}

export default function ProductCategoryGroupRow(props: IProps) {
  const navigate = useNavigate();
  const { isDeletingProductCategoryGroup, deleteProductCategoryGroup } =
    UseProductCategoryGroupApi.deleteCategoryGroup();

  return (
    <Table.Row>
      <Img
        src={props.productCategoryGroup.productCategoryGroup_image}
        alt={props.productCategoryGroup._id}
      />
      <ProductCategoryGroupName>
        {props.productCategoryGroup.productCategoryGroup_name}
      </ProductCategoryGroupName>
      <Modal>
        <Menus.Menu>
          <Menus.ToggleButton id={props.productCategoryGroup._id} />
          <Menus.List id={props.productCategoryGroup._id}>
            <Menus.Button
              icon={<CiEdit />}
              onClick={() =>
                navigate(`update/${props.productCategoryGroup._id}`)
              }
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
            disabled={isDeletingProductCategoryGroup}
            resourceName={props.productCategoryGroup.productCategoryGroup_name}
            onConfirm={() =>
              deleteProductCategoryGroup({
                _id: props.productCategoryGroup._id,
              })
            }
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}
