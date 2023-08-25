import { styled } from "styled-components";
import { CompositeFilter, GeneralFilter, PriceFilter } from "./filters";
import Heading from "@/components/Heading";
import FilterProvider from "./context/FilterProvider";
import OptionsSelected from "./filters/OptionsSelected";

const FilterContainerStyled = styled.div`
  margin-top: 1.6rem;
`;

const BoxFilter = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 6px;
  margin-bottom: 6px;
`;
const filters = [
  {
    filterType: "Dung lượng",
    filterOptions: ["2GB", "4GB", "6GB", "8GB", "12GB"],
  },
  {
    filterType: "Bộ nhớ trong",
    filterOptions: ["64GB", "128GB", "256GB", "512GB", "1TB"],
  },
  {
    filterType: "Tính năng đặc biệt",
    filterOptions: [
      "Sạt không dây",
      "Bảo mật vân tay",
      "Nhận diện khuôn mặt",
      "Kháng nước, kháng bụi",
      "Hỗ trợ 5G",
    ],
  },

  {
    filterType: "Tính năng camera",
    filterOptions: [
      "Chụp xóa phông",
      "Chụp góc rộng",
      "Chống run",
      "Quay video 4K",
      "Chụp zoom xa",
    ],
  },
  {
    filterType: "Kích thước màng hình",
    filterOptions: ["Trên 6inch", "Dưới 6inch"],
  },
  {
    filterType: "Tần số quét",
    filterOptions: ["60Hz", "90Hz", "120Hz", "144Hz trở lên"],
  },
  {
    filterType: "Kiểu màng hình",
    filterOptions: [
      "Tay thỏ",
      "Tràng viền",
      "Màng hình gập",
      "Giọt nước",
      "Đục lõ(Nốt ruồi)",
      "Viên thuốc(Dynamic island)",
    ],
  },
];

export default function FilterContainer() {
  return (
    <FilterProvider>
      <FilterContainerStyled>
        <Heading $as="h4">Lọc theo:</Heading>
        <BoxFilter>
          <CompositeFilter filters={filters} />
          <PriceFilter
            minPriceProduct={1_000_000}
            maxPriceProduct={10_000_0000}
          />
          {filters.map((filter) => (
            <GeneralFilter key={filter.filterType} filter={filter} />
          ))}
        </BoxFilter>
        <OptionsSelected />
      </FilterContainerStyled>
    </FilterProvider>
  );
}
