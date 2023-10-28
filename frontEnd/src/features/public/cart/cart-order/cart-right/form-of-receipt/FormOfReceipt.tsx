import { useMemo, useState } from "react";
import styled from "styled-components";
import { Heading, Input, InputChecked } from "@/components/shared";
import Select, { SingleValue } from "react-select";
import IOptionSelect from "@/interfaces/shared/ISelectOption.interface";
import UseCityApi from "@/apis-use/UseCityApi";

const FormOfReceiptStyled = styled.div`
  margin-top: 1.5rem;

  .box__receipt {
    &--chose {
      display: flex;
      gap: 3rem;
      margin-top: 1rem;
      border: 1px solid var(--color-grey-200);
      padding: 1.5rem 2rem;

      &-input {
        position: relative;
        &.active {
          &::after {
            content: "";
            width: 14px;
            height: 14px;
            border-top: 1px solid var(--color-grey-200);
            border-right: 1px solid var(--color-grey-200);
            background: var(--color-grey-100);
            transform: rotate(-45deg) translateX(-50%);
            display: block;
            position: absolute;
            bottom: -1.7rem;
            left: 50%;
          }
        }
      }
    }

    &--info {
      padding: 1.5rem 2rem;
      background-color: var(--color-grey-100);
      &-select-address {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
      }
      &-input-address {
        margin-top: 1rem;
      }
    }
  }
`;

enum EReceive {
  home = "home",
  store = "store",
}

export default function FormOfReceipt() {
  const [choseReceive, setChoseReceive] = useState<string>(EReceive.home);

  // Select Input
  const [selectCity, setSelectCity] =
    useState<SingleValue<Pick<IOptionSelect, "value">>>();
  const [selectDistrict, setSelectDistrict] =
    useState<SingleValue<Pick<IOptionSelect, "value">>>();
  const [selectWard, setSelectWard] =
    useState<SingleValue<Pick<IOptionSelect, "value">>>();

  const { isGettingCities, metadata: cities } = UseCityApi.getAllCities();
  const { isGettingDistricts, metadata: districtsData } =
    UseCityApi.getAllDistricts(Number(selectCity?.value || 1));
  const { isGettingWards, metadata: wardsData } = UseCityApi.getAllWards(
    Number(selectDistrict?.value || 1)
  );

  const optionSelectCities: Array<IOptionSelect> | undefined = useMemo(() => {
    return cities?.map((city) => {
      return {
        value: `${city.code}`,
        label: city.name,
      };
    });
  }, [isGettingCities]);

  const optionSelectDistricts: Array<IOptionSelect> | undefined =
    useMemo(() => {
      return districtsData?.districts?.map((district) => {
        return {
          value: `${district.code}`,
          label: district.name,
        };
      });
    }, [selectCity, isGettingDistricts]);

  const optionSelectWards: Array<IOptionSelect> | undefined = useMemo(() => {
    return wardsData?.wards?.map((ward) => {
      return {
        value: `${ward.code}`,
        label: ward.name,
      };
    });
  }, [selectDistrict, isGettingWards]);

  // Handle Event
  const handleChoseReceive = (receive: string) => setChoseReceive(receive);
  const handleChoseCity = (option: SingleValue<Pick<IOptionSelect, "value">>) =>
    setSelectCity(option);

  const handleChoseDistrict = (
    option: SingleValue<Pick<IOptionSelect, "value">>
  ) => setSelectDistrict(option);
  const handleChoseWard = (option: SingleValue<Pick<IOptionSelect, "value">>) =>
    setSelectWard(option);

  return (
    <FormOfReceiptStyled>
      <Heading $as="h4">Chọn hình thức nhận hàng</Heading>

      <div className="box__receipt">
        <div className="box__receipt--chose">
          <div
            className={`box__receipt--chose-input ${
              choseReceive === EReceive.home && "active"
            }`}
            onClick={() => handleChoseReceive(EReceive.home)}
          >
            <InputChecked
              isChose={choseReceive === EReceive.home}
              label="Nhận tại nhà"
            />
          </div>
          <div
            className={`box__receipt--chose-input ${
              choseReceive === EReceive.store && "active"
            }`}
            onClick={() => handleChoseReceive(EReceive.store)}
          >
            <InputChecked
              isChose={choseReceive === EReceive.store}
              label="Nhận tại cửa hàng"
            />
          </div>
        </div>
        <div className="box__receipt--info">
          {choseReceive === EReceive.home ? (
            <div>
              <div className="box__receipt--info-select-address">
                <Select
                  id="inputChoseCity"
                  placeholder="Tỉnh/Thành phố"
                  value={selectCity}
                  onChange={handleChoseCity}
                  options={optionSelectCities}
                  className="text-[1.4rem] "
                />
                <Select
                  id="inputChoseDistrict"
                  placeholder="Quận/Huyện"
                  options={optionSelectDistricts}
                  onChange={handleChoseDistrict}
                  value={selectDistrict}
                  className="text-[1.4rem] "
                />
                <Select
                  id="inputChoseWard"
                  placeholder="Phường/Xã"
                  options={optionSelectWards}
                  onChange={handleChoseWard}
                  value={selectWard}
                  className="text-[1.4rem] "
                />
              </div>
              <div className="box__receipt--info-input-address">
                <Input type="text" placeholder="Nhập địa chỉ của bạn" />
              </div>
            </div>
          ) : (
            <div>Tính năng này sẽ được bổ sung sau nhé</div>
          )}
        </div>
      </div>
    </FormOfReceiptStyled>
  );
}
