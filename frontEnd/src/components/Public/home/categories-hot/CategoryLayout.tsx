import { Link } from "react-router-dom";
import { styled } from "styled-components";

const accessories = [
  {
    title: "Phụ kiện Appple",
    img: "https://cdn2.cellphones.com.vn/x/media/icons/category/cate-43.svg",
  },
  {
    title: "Dán màng hình",
    img: "https://cdn2.cellphones.com.vn/x/media/icons/category/cate-286.svg",
  },
  {
    title: "Ốp lưng - Bao da",
    img: "https://cdn2.cellphones.com.vn/x/media/icons/category/cate-108.svg",
  },
  {
    title: "Cáp sạt",
    img: "https://cdn2.cellphones.com.vn/x/media/icons/category/cate-114.svg",
  },
  {
    title: "Pin dự phòng",
    img: "https://cdn2.cellphones.com.vn/x/media/icons/category/cate-122.svg",
  },
  {
    title: "Thiết bị mạng",
    img: "https://cdn2.cellphones.com.vn/x/media/icons/category/cate-43.svg",
  },
  {
    title: "Phụ kiện Appple",
    img: "https://cdn2.cellphones.com.vn/x/media/icons/category/cate-43.svg",
  },
  {
    title: "Phụ kiện Appple",
    img: "https://cdn2.cellphones.com.vn/x/media/icons/category/cate-43.svg",
  },
  {
    title: "Phụ kiện Appple",
    img: "https://cdn2.cellphones.com.vn/x/media/icons/category/cate-43.svg",
  },
  {
    title: "Phụ kiện Appple",
    img: "https://cdn2.cellphones.com.vn/x/media/icons/category/cate-43.svg",
  },
  {
    title: "Phụ kiện Appple",
    img: "https://cdn2.cellphones.com.vn/x/media/icons/category/cate-43.svg",
  },
  {
    title: "Phụ kiện Appple",
    img: "https://cdn2.cellphones.com.vn/x/media/icons/category/cate-43.svg",
  },
  {
    title: "Phụ kiện Appple",
    img: "https://cdn2.cellphones.com.vn/x/media/icons/category/cate-43.svg",
  },
];

const CategoryLayoutStyled = styled.div`
  box-shadow: var(--shadow-lg);
  border-radius: 1rem;
  overflow: hidden;
  border-bottom: 1px solid #bbb;
  margin-top: 2rem;
`;

const CategoryHeader = styled.div`
  padding: 1rem 0;
  text-align: center;
  background-color: var(--color-primary);

  & span {
    font-size: 3.4rem;
    text-transform: uppercase;
    color: #fff;
    text-shadow: #fff 2px 1px 6px;
  }
`;

const CategoryList = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 2rem;
  padding: 3.2rem 4.2rem;
`;

const CategoryItem = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: center;
  font-size: 1.2rem;
  color: var(--color-text);

  & div {
    width: 9.5rem;
    height: 9.5rem;
    background-color: var(--color-secondary);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    transition: all 0.3s;
    overflow: hidden;

    & img {
      object-fit: contain;
      object-position: center;
      transition: all 0.3s;
    }
  }

  &:hover {
    div {
      box-shadow: var(--shadow-arrow);

      & img {
        scale: 1.1;
      }
    }
  }
`;

export default function CategoryLayout() {
  return (
    <CategoryLayoutStyled>
      <CategoryHeader>
        <span>Danh mục nổi bật</span>
      </CategoryHeader>
      <CategoryList>
        {accessories.map((acc) => (
          <CategoryItem key={Math.floor(Math.random() * 100000)} to={"#"}>
            <div>
              <img src={acc.img} />
            </div>
            <span>{acc.title}</span>
          </CategoryItem>
        ))}
      </CategoryList>
    </CategoryLayoutStyled>
  );
}
