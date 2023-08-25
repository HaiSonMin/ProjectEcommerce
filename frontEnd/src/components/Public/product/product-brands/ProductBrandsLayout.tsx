import { Link } from "react-router-dom";
import { styled } from "styled-components";

const ProductBrandsLayoutStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 2rem;
  gap: 1rem;
`;

const BrandItem = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 1rem;
  background-color: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 1rem;
  box-shadow: var(--shadow-md);

  & img {
    height: 20px;
    max-width: none;
    transition: all 0.3s;
  }

  &:hover {
    img {
      scale: 1.1;
    }
  }
`;

const brandsTest = [
  {
    id: 1,
    brandName: "Hinh anh ne",
    brandImage:
      "https://cdn2.cellphones.com.vn/x50,webp,q30/media/wysiwyg/Icon/brand_logo/acer.png",
    linkTo: "#",
  },
  {
    id: 2,
    brandName: "Hinh anh ne",
    brandImage:
      "https://cdn2.cellphones.com.vn/x50,webp,q30/media/wysiwyg/Icon/brand_logo/macbook.png",
    linkTo: "#",
  },
  {
    id: 3,
    brandName: "Hinh anh ne",
    brandImage:
      "https://cdn2.cellphones.com.vn/x50,webp,q30/media/wysiwyg/Icon/brand_logo/Asus.png",
    linkTo: "#",
  },
  {
    id: 4,
    brandName: "Hinh anh ne",
    brandImage:
      "https://cdn2.cellphones.com.vn/x50,webp,q30/media/wysiwyg/Icon/brand_logo/LG.png",
    linkTo: "#",
  },
  {
    id: 5,
    brandName: "Hinh anh ne",
    brandImage:
      "https://cdn2.cellphones.com.vn/x50,webp,q30/media/wysiwyg/Icon/brand_logo/Xiaomi.png",
    linkTo: "#",
  },
  {
    id: 6,
    brandName: "Hinh anh ne",
    brandImage:
      "https://cdn2.cellphones.com.vn/x50,webp,q30/media/wysiwyg/Icon/brand_logo/Xiaomi.png",
    linkTo: "#",
  },
  {
    id: 7,
    brandName: "Hinh anh ne",
    brandImage:
      "https://cdn2.cellphones.com.vn/x50,webp,q30/media/wysiwyg/Icon/brand_logo/Xiaomi.png",
    linkTo: "#",
  },
  {
    id: 8,
    brandName: "Hinh anh ne",
    brandImage:
      "https://cdn2.cellphones.com.vn/x50,webp,q30/media/wysiwyg/Icon/brand_logo/Xiaomi.png",
    linkTo: "#",
  },
  {
    id: 9,
    brandName: "Hinh anh ne",
    brandImage:
      "https://cdn2.cellphones.com.vn/x50,webp,q30/media/wysiwyg/Icon/brand_logo/Xiaomi.png",
    linkTo: "#",
  },
  {
    id: 10,
    brandName: "Hinh anh ne",
    brandImage:
      "https://cdn2.cellphones.com.vn/x50,webp,q30/media/wysiwyg/Icon/brand_logo/Xiaomi.png",
    linkTo: "#",
  },
  {
    id: 11,
    brandName: "Hinh anh ne",
    brandImage:
      "https://cdn2.cellphones.com.vn/x50,webp,q30/media/wysiwyg/Icon/brand_logo/Xiaomi.png",
    linkTo: "#",
  },
  {
    id: 12,
    brandName: "Hinh anh ne",
    brandImage:
      "https://cdn2.cellphones.com.vn/x50,webp,q30/media/wysiwyg/Icon/brand_logo/Xiaomi.png",
    linkTo: "#",
  },
  {
    id: 13,
    brandName: "Hinh anh ne",
    brandImage:
      "https://cdn2.cellphones.com.vn/x50,webp,q30/media/wysiwyg/Icon/brand_logo/Xiaomi.png",
    linkTo: "#",
  },
];

export default function ProductBrandsLayout() {
  return (
    <ProductBrandsLayoutStyled>
      {brandsTest.map((brand) => (
        <BrandItem key={brand.id} to={brand.linkTo}>
          <img src={brand.brandImage} alt={brand.brandName} />
        </BrandItem>
      ))}
    </ProductBrandsLayoutStyled>
  );
}
