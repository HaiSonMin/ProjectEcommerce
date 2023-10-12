import styled from "styled-components";

const ForumSearch = styled.input`
  font-family: "Fuggles", cursive;
  font-size: 16px;
  line-height: 1.5;
  border: none;
  background-color: var(--color-white);
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><path fill='%238C92A0' d='M11.44 10.73l4.41 4.42a.5.5 0 1 1-.7.7l-4.42-4.41a6.5 6.5 0 1 1 .7-.7v-.01zM6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11z'></path></svg>");
  background-repeat: no-repeat;
  background-position: 10px 10px;
  background-size: 20px 20px;
  border-bottom: 1px solid #c5cbd5;
  border-radius: 20px;
  width: 300px;
  padding: 0.5em 1em 0.5em 2.5em;
  ::placeholder {
    color: #838d99;
  }
  :focus {
    outline: none;
    background-color: rgba(255, 255, 255, 1);
    border-bottom: 1px solid #e3e6f0;
  }
`;
export default ForumSearch;
