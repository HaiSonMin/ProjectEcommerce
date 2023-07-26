/* eslint-disable react/prop-types */
import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";

const StyledConfirmUpdate = styled.div`
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

function ConfirmUpdate(props: IProps) {
  return (
    <StyledConfirmUpdate>
      <Heading $as="h3">Update {props.resourceName}</Heading>
      <p>Are you sure you want to {props.resourceName}?</p>

      <div>
        <Button
          $variation="secondary"
          disabled={props.disabled}
          onClick={props.onCloseModal}
        >
          Cancel
        </Button>
        <Button
          $variation="primary"
          disabled={props.disabled}
          onClick={props.onConfirm}
        >
          {props.disabled ? "Updating...." : "Confirm"}
        </Button>
      </div>
    </StyledConfirmUpdate>
  );
}

export default ConfirmUpdate;
