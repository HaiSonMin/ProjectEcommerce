import { formatCurrencyVND, randomKey } from "@/utils";
import { AiOutlineClear } from "react-icons/ai";
import { FaRegEye } from "react-icons/fa";
import { PiClockCounterClockwiseBold, PiTrendUpBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import styled from "styled-components";

const BoxResultSearchStyled = styled.div`
  .box__find {
    &--header {
      display: flex;
      align-items: center;
      gap: 5px;
      background-color: var(--color-grey-100);
      padding: 5px 1rem;
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
  .box__recommend {
    margin-top: 1rem;

    &--header {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 1.8rem;
      background-color: var(--color-grey-100);
      padding: 5px 1rem;

      svg {
        color: var(--color-primary);
        margin-top: 2px;
      }
    }

    &--products {
      display: flex;
      flex-direction: column;

      &-item {
        display: flex;
        align-items: center;
        gap: 5px;
        padding: 5px 1rem;

        &:hover {
          /* box-shadow: var(--shadow-around); */
          background-color: var(--color-grey-100);
          outline: 1px solid var(--color-grey-200);
        }

        &-thumb {
          height: 5.5rem;
          width: 5.5rem;
          img {
            object-fit: contain;
            object-position: center;
          }
        }

        &-info {
          &-name {
            font-size: 1.2rem;
            font-weight: 600;
          }
          &-prices {
            font-size: 1.2rem;
            display: flex;
            align-items: center;
            gap: 5px;
            &-root {
              font-weight: 600;
              color: var(--color-primary);
            }
            &-discount {
              font-weight: 500;
              color: var(--color-grey-400);
              text-decoration: line-through;
            }
          }
        }
      }
    }
  }
`;

const itemsKeySearchTest = [
  "Điện thoại Samsung Galaxy",
  "Điện thoại Samsung cũ giá rẻ",
  "Samsung Galaxy Z",
  "Máy tính bảng Samsung Galaxy Tab",
  "Điện thoại Samsung Galaxy S",
];

const productsTrendSearchTest = [
  {
    _id: randomKey(),
    product_name: "Samsung Galaxy S23 Ultra 256GB",
    product_thumb:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:80/plain/https://cellphones.com.vn/media/catalog/product/g/a/galaxys23ultra_front_green_221122_2.jpg",
    product_price: 21_000_000,
    product_priceDiscount: 19_000_000,
  },
  {
    _id: randomKey(),
    product_name: "Samsung Galaxy Z Flip5 256GB",
    product_thumb:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:80/plain/https://cellphones.com.vn/media/catalog/product/d/4/d4a672c5-4709-4056-9f7f-72d6d70c2c1d_1_1.jpg",
    product_price: 21_000_000,
    product_priceDiscount: 19_000_000,
  },
  {
    _id: randomKey(),
    product_name: "Samsung Galaxy S23 Ultra 256GB",
    product_thumb:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:80/plain/https://cellphones.com.vn/media/catalog/product/g/a/galaxys23ultra_front_green_221122_2.jpg",
    product_price: 21_000_000,
    product_priceDiscount: 19_000_000,
  },
  {
    _id: randomKey(),
    product_name: "Samsung Galaxy S23 Ultra 256GB",
    product_thumb:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:80/plain/https://cellphones.com.vn/media/catalog/product/g/a/galaxys23ultra_front_green_221122_2.jpg",
    product_price: 21_000_000,
    product_priceDiscount: 19_000_000,
  },
  {
    _id: randomKey(),
    product_name: "Samsung Galaxy S23 Ultra 256GB",
    product_thumb:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:80/plain/https://cellphones.com.vn/media/catalog/product/g/a/galaxys23ultra_front_green_221122_2.jpg",
    product_price: 21_000_000,
    product_priceDiscount: 19_000_000,
  },
];

export default function BoxResultSearch() {
  return (
    <BoxResultSearchStyled>
      <div className="box__find">
        <div className="box__find--header">
          <p>Có phải bạn muốn tìm</p>
          <FaRegEye />
        </div>
        <ul className="box__find--result">
          {itemsKeySearchTest.map((keySearch) => (
            <li className="box__find--result-key" key={randomKey()}>
              <Link to={"#"}>{keySearch}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="box__recommend">
        <div className="box__recommend--header">
          <p>Sản phẩm gợi ý</p>
          <PiTrendUpBold />
        </div>
        <div className="box__recommend--products">
          {productsTrendSearchTest.map((product) => (
            <Link
              to={"#"}
              className="box__recommend--products-item"
              key={product._id}
            >
              <div className="box__recommend--products-item-thumb">
                <img src={product.product_thumb} alt={product.product_name} />
              </div>
              <div className="box__recommend--products-item-info">
                <p className="box__recommend--products-item-info-name">
                  {product.product_name}
                </p>
                <p className="box__recommend--products-item-info-prices">
                  <span className="box__recommend--products-item-info-prices-root">
                    {formatCurrencyVND(product.product_price)}
                  </span>
                  <span className="box__recommend--products-item-info-prices-discount">
                    {formatCurrencyVND(product.product_priceDiscount)}
                  </span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </BoxResultSearchStyled>
  );
}
