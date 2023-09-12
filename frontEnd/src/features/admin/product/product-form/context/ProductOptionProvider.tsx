import { IProductOption } from "@/helpers";
import { randomKey } from "@/utils";
import { useContext, createContext, useCallback } from "react";

interface IProductForm {
  isEdit: boolean;
  productOptions: Array<IProductOption>;
  handlerAddProductSerial: (indexOption: number) => void;
  handlerAddProductOptionSpecificationMain: (indexOption: number) => void;
  handlerChangeProductOptionName: (
    event: React.ChangeEvent<HTMLInputElement>,
    indexOption: number
  ) => void;
  handlerChangeProductOptionPrice: (
    event: React.ChangeEvent<HTMLInputElement>,
    indexOption: number
  ) => void;
  handlerChangeProductSerialName: (
    event: React.ChangeEvent<HTMLInputElement>,
    indexOption: number,
    indexSerial: number
  ) => void;
  handlerChangeProductSerialPrice: (
    event: React.ChangeEvent<HTMLInputElement>,
    indexOption: number,
    indexSerial: number
  ) => void;
  handlerChangeProductSerialImage: (
    event: React.ChangeEvent<HTMLInputElement>,
    indexOption: number,
    indexSerial: number
  ) => void;
  handlerChangeProductOptionDescription: (
    description: string,
    indexOption: number
  ) => void;
  handlerChangeProductOptionSpecificationMainType: (
    event: React.ChangeEvent<HTMLInputElement>,
    indexOption: number,
    indexSpecMain: number
  ) => void;
  handlerChangeProductOptionSpecificationMainValue: (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    indexOption: number,
    indexSpecMain: number
  ) => void;
  handlerChangeProductOptionSpecificationDetail: (
    specification: string,
    indexOption: number
  ) => void;
  handlerDeleteProductSerial: (
    indexOption: number,
    indexSerial: number
  ) => void;
  handlerDeleteAllProductSerial: (indexOption: number) => void;
  handlerDeleteProductOptionSpecificationMain: (
    indexOption: number,
    indexSpecMain: number
  ) => void;
}

const initializeProductForm: IProductForm = {
  isEdit: false,
  productOptions: [],
  handlerAddProductSerial: () => {},
  handlerAddProductOptionSpecificationMain: () => {},
  handlerChangeProductOptionName: () => {},
  handlerChangeProductOptionPrice: () => {},
  handlerChangeProductSerialName: () => {},
  handlerChangeProductSerialPrice: () => {},
  handlerChangeProductSerialImage: () => {},
  handlerChangeProductOptionDescription: () => {},
  handlerChangeProductOptionSpecificationMainType: () => {},
  handlerChangeProductOptionSpecificationMainValue: () => {},
  handlerChangeProductOptionSpecificationDetail: () => {},
  handlerDeleteProductSerial: () => {},
  handlerDeleteAllProductSerial: () => {},
  handlerDeleteProductOptionSpecificationMain: () => {},
};

const ProductFormContext = createContext(initializeProductForm);

interface IProps {
  isEdit: boolean;
  children: any;
  productOptions: Array<IProductOption>;
  setProductOptions: React.Dispatch<
    React.SetStateAction<Array<IProductOption> | undefined>
  >;
}

export default function ProductOptionProvider({
  isEdit,
  children,
  productOptions,
  setProductOptions,
}: IProps) {
  const handlerAddProductOptionSpecificationMain = (indexOption: number) => {
    const newProductOptions: Array<IProductOption> = [...productOptions];
    newProductOptions[indexOption].product_specificationMain.push({
      id: randomKey(),
      specKey: "",
      specValue: "",
    });
    setProductOptions(newProductOptions);
  };

  const handlerAddProductSerial = (indexOption: number) => {
    const newProductOptions: Array<IProductOption> = [...productOptions];
    newProductOptions[indexOption]?.product_serials?.push({
      id: randomKey(),
      serialName: "",
      serialImage: "",
      serialPriceDifference: 0,
    });
    setProductOptions(newProductOptions);
  };
  const handlerChangeProductOptionName = (
    event: React.ChangeEvent<HTMLInputElement>,
    indexOption: number
  ) => {
    const newProductOptions: Array<IProductOption> = [...productOptions];
    newProductOptions[indexOption].product_optionName = event.target.value;
    setProductOptions(newProductOptions);
  };
  const handlerChangeProductOptionPrice = (
    event: React.ChangeEvent<HTMLInputElement>,
    indexOption: number
  ) => {
    const newProductOptions: Array<IProductOption> = [...productOptions];
    newProductOptions[indexOption].product_priceDifference = Number(
      event.target.value
    );
    setProductOptions(newProductOptions);
  };
  const handlerChangeProductSerialName = (
    event: React.ChangeEvent<HTMLInputElement>,
    indexOption: number,
    indexSerial: number
  ) => {
    const newProductOptions: Array<IProductOption> = [...productOptions];
    if (newProductOptions[indexOption]?.product_serials) {
      const serial =
        newProductOptions[indexOption].product_serials?.[indexSerial];

      if (serial) {
        serial.serialName = event.target.value;
        setProductOptions(newProductOptions);
      }
    }
  };
  const handlerChangeProductSerialPrice = (
    event: React.ChangeEvent<HTMLInputElement>,
    indexOption: number,
    indexSerial: number
  ) => {
    const newProductOptions: Array<IProductOption> = [...productOptions];
    if (newProductOptions[indexOption]?.product_serials) {
      const serial =
        newProductOptions[indexOption].product_serials?.[indexSerial];

      if (serial) {
        serial.serialPriceDifference = +event.target.value;
        setProductOptions(newProductOptions);
      }
    }
  };
  const handlerChangeProductSerialImage = (
    event: React.ChangeEvent<HTMLInputElement>,
    indexOption: number,
    indexSerial: number
  ) => {
    console.log("indexOption,indexSerial::",indexOption,indexSerial);
    const newProductOptions: Array<IProductOption> = [...productOptions];
    if (newProductOptions[indexOption]?.product_serials) {
      const serial =
        newProductOptions[indexOption].product_serials?.[indexSerial];
      if (serial) {
        serial.serialImage = event.target.files;
        setProductOptions(newProductOptions);
      }
    }
  };

  const handlerChangeProductOptionSpecificationMainType = (
    event: React.ChangeEvent<HTMLInputElement>,
    indexOption: number,
    indexSpecMain: number
  ) => {
    const newProductOptions: Array<IProductOption> = [...productOptions];
    newProductOptions[indexOption].product_specificationMain[
      indexSpecMain
    ].specKey = event.target.value;
    setProductOptions(newProductOptions);
  };

  const handlerChangeProductOptionSpecificationMainValue = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    indexOption: number,
    indexSpecMain: number
  ) => {
    const newProductOptions: Array<IProductOption> = [...productOptions];
    newProductOptions[indexOption].product_specificationMain[
      indexSpecMain
    ].specValue = event.target.value;
    setProductOptions(newProductOptions);
  };

  const handlerChangeProductOptionDescription = (
    description: string,
    indexOption: number
  ) => {
    const newProductOptions: Array<IProductOption> = [...productOptions];
    newProductOptions[indexOption].product_description = description;
    setProductOptions(newProductOptions);
  };

  const handlerChangeProductOptionSpecificationDetail = (
    specification: string,
    indexOption: number
  ) => {
    const newProductOptions: Array<IProductOption> = [...productOptions];
    newProductOptions[indexOption].product_specificationDetail = specification;
    setProductOptions(newProductOptions);
  };

  const handlerDeleteProductSerial = (
    indexOption: number,
    indexSerial: number
  ) => {
    const newProductOptions: Array<IProductOption> = [...productOptions];
    newProductOptions[indexOption]?.product_serials?.splice(indexSerial, 1);
    setProductOptions(newProductOptions);
  };

  const handlerDeleteAllProductSerial = (indexOption: number) => {
    const newProductOptions: Array<IProductOption> = [...productOptions];
    newProductOptions[indexOption]?.product_serials?.splice(0);
    setProductOptions(newProductOptions);
  };

  const handlerDeleteProductOptionSpecificationMain = (
    indexOption: number,
    indexSpecMain: number
  ) => {
    const newProductOptions: Array<IProductOption> = [...productOptions];
    newProductOptions[indexOption]?.product_specificationMain.splice(
      indexSpecMain,
      1
    );
    setProductOptions(newProductOptions);
  };

  const value: IProductForm = {
    isEdit,
    productOptions,
    handlerAddProductSerial,
    handlerAddProductOptionSpecificationMain,
    handlerChangeProductOptionName,
    handlerChangeProductSerialName,
    handlerChangeProductOptionPrice,
    handlerChangeProductSerialPrice,
    handlerChangeProductSerialImage,
    handlerChangeProductOptionDescription,
    handlerChangeProductOptionSpecificationMainType,
    handlerChangeProductOptionSpecificationMainValue,
    handlerChangeProductOptionSpecificationDetail,
    handlerDeleteProductSerial,
    handlerDeleteAllProductSerial,
    handlerDeleteProductOptionSpecificationMain,
  };
  return (
    <ProductFormContext.Provider value={value}>
      {children}
    </ProductFormContext.Provider>
  );
}

export const useProductOption = () => {
  const context = useContext(ProductFormContext);
  if (!context)
    throw new Error("Context was used outside the ProductOptionProvider");
  return context;
};
