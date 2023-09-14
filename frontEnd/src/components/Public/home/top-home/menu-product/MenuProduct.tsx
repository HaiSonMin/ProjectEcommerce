import { css, styled } from "styled-components";
import { useState, useEffect } from "react";
import MenuItem from "./MenuItem";
import UseProductCategoryGroupApi from "@/features/admin/productCategoryGroup/UseProductCategoryGroupApi";
import UseProductCategoryApi from "@/features/admin/productCategory/UseProductCategoryApi";
import { IProductCategoryGroup } from "@/interfaces";

const MenuContainer = styled.div`
  position: relative;
  /* overflow: auto; */
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
  const { metadata } = UseProductCategoryGroupApi.getAllCategoriesGroup(10e9);

  const productCategoriesGroupSorted = metadata?.productCategoriesGroup?.sort(
    (a, b) =>
      a.productCategoryGroup_name.localeCompare(b.productCategoryGroup_name)
  );

  return (
    <MenuContainer>
      <MenuList>
        {productCategoriesGroupSorted?.map((group) => (
          <MenuItem productCategoryGroup={group} key={group._id} />
        ))}
      </MenuList>
    </MenuContainer>
  );
}
