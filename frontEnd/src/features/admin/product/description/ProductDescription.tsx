import { FormRowContent, FromHeading, Heading } from "@/components";
import JoditEditor from "jodit-react";
import { styled } from "styled-components";

const ProductDescriptionStyled = styled.div`
  margin-top: 2rem;
`;

export default function ProductDescription({
  contentDescription,
  setContentDescription,
}) {
  return (
    <ProductDescriptionStyled>
      <FromHeading>
        <Heading $as="h2">Description Product</Heading>
      </FromHeading>
      <JoditEditor
        value={contentDescription}
        onChange={(newContext) => setContentDescription(newContext)}
      />
    </ProductDescriptionStyled>
  );
}
