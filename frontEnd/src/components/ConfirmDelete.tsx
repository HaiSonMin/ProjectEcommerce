/* eslint-disable react/prop-types */
import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

interface IProps {
  disabled: boolean;
  resourceName: string;
  onConfirm: () => void;
  onCloseModal?: () => void;
}

function ConfirmDelete(props: IProps) {
  return (
    <StyledConfirmDelete>
      <Heading $as="h3">Delete {props.resourceName}</Heading>
      <p>
        Are you sure you want to delete this {props.resourceName} permanently?
        This action cannot be undone.
      </p>

      <div>
        <Button
          $variation="secondary"
          disabled={props.disabled}
          onClick={props.onCloseModal}
        >
          Cancel
        </Button>
        <Button
          $variation="danger"
          disabled={props.disabled}
          onClick={props.onConfirm}
        >
          {props.disabled ? "Deleting...." : "Delete"}
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
