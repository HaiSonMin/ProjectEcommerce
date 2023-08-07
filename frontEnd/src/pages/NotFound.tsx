import { Button } from "@/components";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const StyledPageNotFound = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .oops {
    font-weight: 700;
    color: var(--primary-1);
    font-size: 10rem;
    text-transform: uppercase;
  }

  .not-found {
    font-size: 2rem;
    font-weight: 700;
    color: var(--primary-1);
    margin-bottom: 2rem;
  }

`;

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <StyledPageNotFound>
      <div className="oops">Oops!</div>
      <p className="not-found">Error 404: Page Not Found</p>
      <Button $variation="danger" onClick={() => navigate(-1)}>Go Back Home</Button>
    </StyledPageNotFound>
  );
}
