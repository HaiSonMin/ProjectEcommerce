import { styled } from "styled-components";
import {
  Button,
  ButtonGroup,
  ConfirmDelete,
  Heading,
  Modal,
  Spinner,
} from "@/components";
import IProductType, { IProductMainInfo } from "@/interfaces/product/product.interface";
import UseProductApi from "./UseProductApi";
import { useNavigate, useSearchParams } from "react-router-dom";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 2rem;
`;

const StyledProductCart = styled.div`
  width: 35rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  border-radius: 1rem;
`;

const StyledGroupButton = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;

const StyledContent = styled.div`
  padding: 2rem 3rem;
`;

const StyledImg = styled.img`
  height: 20rem;
  object-fit: contain;
  object-position: center;
`;

interface IProps {
  product?: IProductType;
  product_mainInfo: IProductMainInfo;
}

export default function ProductMainInfo(props: IProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const isSearchDetail = searchParams.get("mainInfoId") || null;
  console.log("isSearchDetail::", isSearchDetail);

  const { isDeletingProduct, deleteProductMainInfo } =
    UseProductApi.deleteProductMainInfo();

  const infoHeading = `${props.product_mainInfo.product_ram} - ${props.product_mainInfo.product_rom} - ${props.product_mainInfo.product_color}`;

  const handlerClickNavigateEdit = () => {
    navigate(
      `/admin/product/editMainInfoDetail/${props?.product?._id}?mainInfoId=${props.product_mainInfo._id}`
    );
    // searchParams.set("mainInfoId", props.product_mainInfo._id);
    // setSearchParams(searchParams);
  };

  //   if (isSearchDetail) return <Spinner />;

  return (
    <Modal>
      <StyledContainer>
        <StyledProductCart>
          <StyledImg
            src={props.product_mainInfo.product_imageColor}
            alt={"Image"}
          />
          <StyledContent>
            <Heading $as="h5">
              {props.product?.product_name}: {infoHeading}
            </Heading>
            <ButtonGroup className="mt-[1rem]">
              <Button onClick={handlerClickNavigateEdit}>Edit</Button>
              <Modal.Open openWindowName="deleteProductMain">
                <Button $variation="danger">Delete</Button>
              </Modal.Open>
              <Modal.Window windowName="deleteProductMain">
                <ConfirmDelete
                  resourceName={`${props.product?.product_name} ${infoHeading}`}
                  disabled={isDeletingProduct}
                  onConfirm={() =>
                    deleteProductMainInfo({ _id: props.product_mainInfo._id })
                  }
                />
              </Modal.Window>
            </ButtonGroup>
          </StyledContent>
        </StyledProductCart>
        <StyledGroupButton>
          <Button>Back Home</Button>
        </StyledGroupButton>
      </StyledContainer>
    </Modal>
  );
}
