import { styled } from "styled-components";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FiDelete } from "react-icons/fi";
// import { randomKey } from "@/utils";
import { randomKey } from "@/utils";
import { IFilterOption } from "@/helpers";

const ProductFilterOptionStyled = styled.div``;

const BtnAddFilterOption = styled.div`
  display: inline-block;
  padding: 1rem;
  border-radius: 1rem;
  background-color: var(--color-primary);
  cursor: pointer;
  color: var(--color-white);
  font-weight: 600;
  font-size: 1.4rem;
  margin-bottom: 1rem;
`;

const OptionBox = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const OptionItem = styled.div`
  display: flex;
  flex-direction: column;
  align-self: start;
  gap: 1rem;
  width: 31rem;
  padding: 1rem;
  border: 1px solid var(--color-grey-300);
  border-radius: 1rem;
  & input {
    background-color: var(--color-grey-100);
    border-radius: 1rem;
    border: 1px solid var(--color-grey-200);
    padding: 5px 1rem;
    min-width: 10rem;

    &:focus {
      outline: none;
    }
  }
`;

const FilterOption = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  & input {
    max-width: 18rem;
  }

  & div {
    display: inline-block;
    padding: 5px 1rem;
    border-radius: 1rem;
    background-color: var(--color-primary);
    color: var(--color-white);
    font-weight: 600;
    font-size: 1.2rem;
    cursor: pointer;
  }

  & svg {
    width: 2rem;
    height: 2rem;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      transform: scale(1.05);
      color: var(--color-primary);
    }
  }
`;

const FilterItemsBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const FilterItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  & input {
    flex-grow: 1;
  }

  & svg {
    width: 2rem;
    height: 2rem;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      transform: scale(1.05);
      color: var(--color-primary);
    }
  }
`;

// [{ filterName: "Màng hình", filterItem: ["Đục lỗ","Nốt ruồi","Dynamic Island"] }];

interface IProps {
  filtersOptions: Array<IFilterOption>;
  setFiltersOptions: React.Dispatch<React.SetStateAction<any>>;
}

export default function ProductFilterOption({
  filtersOptions,
  setFiltersOptions,
}: IProps) {
  const handlerChangeFilterType = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newFiltersType = [...filtersOptions];
    newFiltersType[index].filterOption = event.target.value;

    setFiltersOptions(newFiltersType);
  };
  const handlerChangeFilterItem = (
    event: React.ChangeEvent<HTMLInputElement>,
    indexOption: number,
    indexItem: number
  ) => {
    const newFiltersType = [...filtersOptions];
    newFiltersType[indexOption].filterItems[indexItem].itemName =
      event.target.value;

    setFiltersOptions(newFiltersType);
  };
  const handlerAddFilterType = () => {
    const newOptions: Array<IFilterOption> = [
      ...filtersOptions,
      {
        id: randomKey(),
        filterOption: "",
        filterOptionInfo: "",
        filterItems: [
          {
            id: randomKey(),
            itemName: "",
            itemInfo: "",
          },
        ],
      },
    ];
    setFiltersOptions(newOptions);
  };
  const handlerAddFilterItem = (indexOption) => {
    const newFiltersType: Array<IFilterOption> = [...filtersOptions];
    newFiltersType[indexOption].filterItems.push({
      id: randomKey(),
      itemName: "",
      itemInfo: "",
    });

    setFiltersOptions(newFiltersType);
  };
  const handlerDeleteFilterType = (indexOption: number) => {
    if (filtersOptions.length <= 1) return;
    const newFiltersType = [...filtersOptions];
    newFiltersType.splice(indexOption, 1);
    setFiltersOptions(newFiltersType);
  };
  const handlerDeleteFilterItem = (
    indexOption: number,
    indexItem: number,
    numberItems: number
  ) => {
    if (numberItems <= 1) return;
    const newFiltersType = [...filtersOptions];
    newFiltersType[indexOption].filterItems.splice(indexItem, 1);
    setFiltersOptions(newFiltersType);
  };
  return (
    <ProductFilterOptionStyled>
      <BtnAddFilterOption onClick={handlerAddFilterType}>
        Add New Filter Type
      </BtnAddFilterOption>
      <OptionBox>
        {filtersOptions.map((option, indexOption: number) => (
          <OptionItem key={option.id}>
            <FilterOption>
              <input
                value={option.filterOption}
                placeholder={`Filter Type ${indexOption + 1}`}
                onChange={(e) => handlerChangeFilterType(e, indexOption)}
              />
              <div onClick={() => handlerAddFilterItem(indexOption)}>
                Add item
              </div>
              <RiDeleteBin5Line
                onClick={() => handlerDeleteFilterType(indexOption)}
              />
            </FilterOption>
            <FilterItemsBox>
              {option.filterItems.map((filterItem, indexItem: number) => (
                <FilterItem key={filterItem.id}>
                  <input
                    value={filterItem.itemName}
                    placeholder={`Filter Item ${indexItem + 1}`}
                    onChange={(e) =>
                      handlerChangeFilterItem(e, indexOption, indexItem)
                    }
                  />
                  <FiDelete
                    onClick={() =>
                      handlerDeleteFilterItem(
                        indexOption,
                        indexItem,
                        option.filterItems.length
                      )
                    }
                  />
                </FilterItem>
              ))}
            </FilterItemsBox>
          </OptionItem>
        ))}
      </OptionBox>
    </ProductFilterOptionStyled>
  );
}
