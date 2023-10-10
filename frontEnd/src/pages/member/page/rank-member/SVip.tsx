// Giảm thêm 1% 

// cps-icon
// Giảm thêm 5% khi mua các sản phẩm thuộc nhóm hàng phụ kiện loa - tai nghe dưới 1 triệu, sạc dự phòng, củ cáp, bao da, ốp lưng, balo - túi xách

// cps-icon
// Giảm thêm 3% khi mua các sản phẩm thuộc nhóm hàng phụ kiện còn lại

// cps-icon
// Giảm thêm 5% (tối đa 300.000đ) khi sử dụng các dịch vụ sửa chữa tại Điện Thoại Vui

// cps-icon
// Giảm thêm 5% (tối đa 500.000đ) khi thực hiện thu cũ lên đời

// cps-icon
// Ưu đãi sinh nhật: Tặng phiếu mua hàng trị giá 500.000đ (Code chỉ sử dụng 1 lần, áp dụng cho các đơn hàng (Trừ thẻ cào, sim, phí thu hộ, gói BHMR) có giá trị lớn gấp đôi giá trị code)

import { BiCartAdd } from "react-icons/bi";
import { BsPhoneFlip, BsFillGiftFill, BsFillCartCheckFill } from "react-icons/bs";
import { FcTwoSmartphones } from "react-icons/fc";
import styled from "styled-components";

const ContainerSVip = styled.div`
    display: grid;
    grid-template-columns: auto;
    gap: 1rem;
    row-gap: 2rem;
    div{
        display: grid;
        grid-template-columns: auto auto;
        align-items: center;
        justify-content: start;
        gap: 2rem;
        .fontSize{
            font-size: 70px;
            color: red;
        }
        p{
            color:black;
            span{
                color:black;
            }
        }
    }
`
export default function SVip() {
  return (
    <ContainerSVip>
      <div>
        <BsFillCartCheckFill className="fontSize" />
        <p>
          <span>Giảm thêm 1%</span>
          khi mua các sản phẩm máy (điện thoại, máy tính, máy tính bảng, Apple <br /> Watch)
        </p>
      </div>
      <div>
        <BsFillCartCheckFill className="fontSize" />
        <p>
          <span>Giảm thêm 5%</span>
          khi mua các sản phẩm thuộc nhóm hàng phụ kiện loa - tai nghe dưới 1 <br />
          triệu, sạc dự phòng, củ cáp, bao da, ốp lưng, balo - túi xách
        </p>
      </div>
      <div>
        <BsFillCartCheckFill className="fontSize"/>
        <p>
          <span>Giảm thêm 3%</span>
          khi mua các sản phẩm thuộc nhóm hàng phụ kiện còn lại
        </p>
      </div>
      <div>
        <BsPhoneFlip className="fontSize"/>
        <p>
          <span>Giảm thêm 5% (tối đa 300.000đ)</span>
          khi sử dụng các dịch vụ sửa chữa tại Điện Thoại Vui
        </p>
      </div>
      <div>
        <FcTwoSmartphones className="fontSize"/>
        <p>
          <span>Giảm thêm 5% (tối đa 500.000đ)</span>
          khi thực hiện thu cũ lên đời
        </p>
      </div>
      <div>
        <BsFillGiftFill className="fontSize"/>
        <p>
          Ưu đãi sinh nhật: Tặng phiếu mua hàng trị giá
          <span>500.000đ</span>
          (Code chỉ sử dụng 1 lần, áp dụng <br /> cho các đơn hàng (Trừ thẻ cào, sim,
          phí thu hộ, gói BHMR) có giá trị lớn gấp đôi giá trị <br /> code)
        </p>
      </div>
    </ContainerSVip>
  );
}

