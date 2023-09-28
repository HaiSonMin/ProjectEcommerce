import { styled } from "styled-components";
import { UseProductCategoryGroupApi } from "@/apis-use";
import MenuItem from "./MenuItem";
import SpinnerLogo from "@/components/SpinnerLogo";

const MenuContainer = styled.div`
  position: relative;
  min-width: 15%;
  max-width: 19%;
  box-shadow:
    0 1px 2px 0 rgba(60, 64, 67, 0.1),
    0 2px 6px 2px rgba(60, 64, 67, 0.15);
  border-radius: 15px;
`;
// Menu
const MenuList = styled.ul`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`;

export default function MenuProduct() {
  const { isGettingProductCategoriesGroup, metadata } =
    UseProductCategoryGroupApi.getAllCategoriesGroup();

  const productCategoriesGroupSorted = metadata?.productCategoriesGroup?.sort(
    (a, b) =>
      a.productCategoryGroup_name.localeCompare(b.productCategoryGroup_name)
  );

  return (
    <>
      {isGettingProductCategoriesGroup && <SpinnerLogo />}
      <MenuContainer>
        <MenuList>
          {productCategoriesGroupSorted?.map((group) => (
            <MenuItem productCategoryGroup={group} key={group._id} />
          ))}
        </MenuList>
      </MenuContainer>
    </>
  );
}
