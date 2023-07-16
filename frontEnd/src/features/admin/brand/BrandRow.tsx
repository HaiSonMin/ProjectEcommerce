import UseBrand from "./UseBrandApi";
import { CiEdit } from "react-icons/ci";
import { BrandType } from "../../../featureTypes";
import { styled } from "styled-components";
import { RiDeleteBinLine } from "react-icons/ri";
import { ConfirmDelete, Menus, Modal, Table } from "../../../components";
import { BrandForm } from "./BrandForm";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2; // Tỉ lệ khung hình
  object-fit: contain;
  object-position: center;
  /* transform: scale(1.4) translateX(6px); */
  border-radius: 4px;
`;

const BrandName = styled.div`
  font-size: 1.6rem;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const BrandOrigin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

interface IProps {
  key: React.Key;
  brand: BrandType;
}

const BrandRow = (props: IProps) => {
  const { deleteBrand, isDeletingBrand } = UseBrand.useDeleteBrand();

  return (
    <Table.Row>
      <Img src={props.brand.brand_image} alt={props.brand.brand_name} />
      <BrandName>{props.brand.brand_name}</BrandName>
      <BrandOrigin>{props.brand.brand_origin}</BrandOrigin>
      <Modal>
        <Menus.Menu>
          <Menus.ToggleButton id={props.brand._id} />
          {/* Display when we click in to toggle button */}
          <Menus.List id={props.brand._id}>
            <Modal.Open openWindowName="editBrand">
              <Menus.Button icon={<CiEdit />}>Edit</Menus.Button>
            </Modal.Open>
            <Modal.Open openWindowName="deleteBrand">
              <Menus.Button icon={<RiDeleteBinLine />}>Delete</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window windowName="editBrand">
          <BrandForm brandToEdit={props.brand} />
        </Modal.Window>
        <Modal.Window windowName="deleteBrand">
          <ConfirmDelete
            disabled={isDeletingBrand}
            resourceName={props.brand.brand_name}
            onConfirm={() => deleteBrand({ _id: props.brand._id })}
            // onCloseModal={() => close()} onCloseModal already and it inside Modal.Window
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
};

export default BrandRow;