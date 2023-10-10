//

// cps-icon
//

// cps-icon
//

// cps-icon
//

// cps-icon
//

// cps-icon
//

import { BsPhoneFlip, BsFillGiftFill,BsFillCartCheckFill } from "react-icons/bs";
import { FcTwoSmartphones } from "react-icons/fc";
import styled from "styled-components";
const ContainerSMem = styled.div`
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
export default function SMem() {
  return (
    <ContainerSMem>
      <div>
        <BsFillCartCheckFill className="fontSize"/>
        <p>
          <span>Giảm thêm 0.5%</span>
          khi mua các sản phẩm máy (điện thoại, máy tính, máy tính bảng, Apple <br />
          Watch)
        </p>
      </div>
      <div>
        <BsFillCartCheckFill className="fontSize"/>
        <p>
          <span>Giảm thêm 3%</span>
          khi mua các sản phẩm thuộc nhóm hàng phụ kiện loa - tai nghe dưới 1 <br />
          triệu, sạc dự phòng, củ cáp, bao da, ốp lưng, balo - túi xách
        </p>
      </div>
      <div>
        <BsFillCartCheckFill className="fontSize"/>
        <p>
          <span>Giảm thêm 2%</span>
          khi mua các sản phẩm thuộc nhóm hàng phụ kiện còn lại
        </p>
      </div>
      <div>
        <BsPhoneFlip className="fontSize"/>
        <p>
          <span>Giảm thêm 5% (tối đa 200.000đ)</span>
          khi sử dụng các dịch vụ sửa chữa tại Điện Thoại Vui
        </p>
      </div>
      <div>
        <FcTwoSmartphones className="fontSize"/>
        <p>
          <span>Giảm thêm 5% (tối đa 300.000đ)</span>
          khi thực hiện thu cũ lên đời
        </p>
      </div>
      <div>
        <BsFillGiftFill className="fontSize"/>
        <p>
          Ưu đãi sinh nhật: Tặng phiếu mua hàng trị giá
          <span>200.000đ</span>
          (Code chỉ sử dụng 1 lần, áp dụng <br /> cho các đơn hàng (Trừ thẻ cào, sim,
          phí thu hộ, gói BHMR) có giá trị lớn gấp đôi giá trị <br /> code)
        </p>
      </div>
    </ContainerSMem>
  );
}
