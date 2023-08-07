import { useEffect } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function ProtectedRouteAdmin() {
  const navigate = useNavigate();
  // 1. Load the authenticated user
  // 2. If there is NO authenticated user, redirect to the /login
  // 3. While loading, show a spinner
  // 4. If there IS a user, render the app
}
