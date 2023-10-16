import { randomKey } from "@/utils";
import { AiOutlineClear } from "react-icons/ai";
import { PiClockCounterClockwiseBold, PiTrendUpBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import styled from "styled-components";

const BoxTrendSearchStyled = styled.div`
  .box__history {
    &--header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: var(--color-grey-100);
      padding: 5px 1rem;

      &-title,
      &-clear {
        font-size: 1.8rem;
        display: flex;
        align-items: center;
        gap: 5px;
      }

      &-clear {
        cursor: pointer;

        &:hover {
          text-decoration: underline;
          color: var(--color-primary);
        }
      }
    }

    &--result {
      display: flex;
      flex-direction: column;
      margin-top: 5px;

      &-key {
        font-size: 1.4rem;
        color: var(--color-grey-400);
        cursor: pointer;
        padding: 5px 1rem;

        &:hover {
          color: var(--color-text);
          background-color: var(--color-grey-100);
        }
      }
    }
  }
  .box__trend {
    margin-top: 1.5rem;

    &--header {
      display: flex;
      align-items: center;
      gap: 5px;
      margin-bottom: 5px;
      font-size: 1.8rem;
      background-color: var(--color-grey-100);
      padding: 5px 1rem;

      svg {
        color: var(--color-primary);
        margin-top: 2px;
      }
    }

    &--products {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      padding: 5px 1rem;

      &-item {
        display: flex;
        align-items: center;
        gap: 5px;
        padding: 5px 5px;

        &:hover {
          /* box-shadow: var(--shadow-around); */
          background-color: var(--color-grey-100);
          outline: 1px solid var(--color-grey-200);
          border-radius: 1rem;
        }
      }
    }
  }
`;

const itemsKeySearchTest = [
  "iphone",
  "laptop",
  "điện thoại giá rẻ",
  "laptop củ",
];

const productsTrendSearchTest = [
  {
    _id: randomKey(),
    product_name: "Iphone 15 Promax",
    product_thumb:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:40:0/q:100/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_2__1.jpg",
  },
  {
    _id: randomKey(),
    product_name: "Galaxy Z Fold5",
    product_thumb:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:40:0/q:100/plain/https://cellphones.com.vn/media/catalog/product/d/4/d4a672c5-4709-4056-9f7f-72d6d70c2c1d_1_1.jpg",
  },
  {
    _id: randomKey(),
    product_name: "Xiaomi 13T",
    product_thumb:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:40:0/q:100/plain/https://cellphones.com.vn/media/catalog/product/x/i/xiami-13t-den-01.jpg",
  },
  {
    _id: randomKey(),
    product_name: "Iphone 15 Promax",
    product_thumb:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:40:0/q:100/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_2__1.jpg",
  },
  {
    _id: randomKey(),
    product_name: "Iphone 15 Promax",
    product_thumb:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:40:0/q:100/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_2__1.jpg",
  },
  {
    _id: randomKey(),
    product_name: "Iphone 15 Promax",
    product_thumb:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:40:0/q:100/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_2__1.jpg",
  },
  {
    _id: randomKey(),
    product_name: "Iphone 15 Promax",
    product_thumb:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:40:0/q:100/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_2__1.jpg",
  },
  {
    _id: randomKey(),
    product_name: "Iphone 15 Promax",
    product_thumb:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:40:0/q:100/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_2__1.jpg",
  },
  {
    _id: randomKey(),
    product_name: "Iphone 15 Promax",
    product_thumb:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:40:0/q:100/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_2__1.jpg",
  },
  {
    _id: randomKey(),
    product_name: "Iphone 15 Promax",
    product_thumb:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:40:0/q:100/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-15-pro-max_2__1.jpg",
  },
];

export default function BoxTrendSearch() {
  return (
    <BoxTrendSearchStyled>
      <div className="box__history">
        <div className="box__history--header">
          <div className="box__history--header-title">
            <p>Lịch sử tìm kiếm</p>
            <PiClockCounterClockwiseBold />
          </div>
          <div className="box__history--header-clear">
            <p>Xóa tất cả</p>
            <AiOutlineClear />
          </div>
        </div>
        <ul className="box__history--result">
          {itemsKeySearchTest.map((keySearch) => (
            <li className="box__history--result-key" key={randomKey()}>
              <Link to={"#"}>{keySearch}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="box__trend">
        <div className="box__trend--header">
          <p>Xu hướng tìm kiếm</p>
          <PiTrendUpBold />
        </div>
        <div className="box__trend--products">
          {productsTrendSearchTest.map((product) => (
            <Link
              to={"#"}
              className="box__trend--products-item"
              key={product._id}
            >
              <div className="box__trend--products-item-thumb">
                <img src={product.product_thumb} alt={product.product_name} />
              </div>
              <div className="box__trend--products-item-name">
                {product.product_name}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </BoxTrendSearchStyled>
  );
}
