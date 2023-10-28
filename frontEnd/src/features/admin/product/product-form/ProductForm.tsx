import {
  Form,
  Input,
  Button,
  FormRow,
  Heading,
  FormBox,
  InputFileImage,
  FromHeading,
  SelectMultiV2,
  Spinner,
  ImagesGroup,
} from "@/components/shared";
import {
  ProductOptions,
  ProductFilterOptionSelect,
} from "./element-product-form";
import { useMoveBack } from "@/hooks";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import Select, { SingleValue } from "react-select";
import { DefaultOptionType } from "antd/es/select";
import IOptionSelect from "@/interfaces/shared/ISelectOption.interface";
import { useEffect, useMemo, useState } from "react";
import { formatCurrencyVND, randomKey } from "@/utils";
import { IFilterOption, IProductOption } from "@/interfaces/shared";
import { UseProductApi, UseProductCategoryApi } from "@/apis-use";
import { IBrand, IDemand, IProduct, IProductCategory } from "@/interfaces/models";
import FormHeading from "@/components/shared/FormHeading";
import FormRowButton from "@/components/shared/FormRowButton";

const initializeProductOption: Array<IProductOption> = [
  {
    id: randomKey(),
    product_optionName: "",
    product_description: "",
    product_priceDifference: 0,
    product_serials: [],
    product_specificationMain: [],
    product_specificationDetail: "",
  },
];

const initialFilterOption: Array<IFilterOption> = [];

interface IProps {
  productEdit?: IProduct;
}

export default function ProductForm({ productEdit }: IProps) {
  const moveBack = useMoveBack();

  const isEditSession: boolean = !!productEdit;
  const [imagesProductUpdate, setImagesProductUpdate] = useState<Array<string>>(
    productEdit?.product_imagesProduct || []
  );
  const [imagesHighLightUpdate, setImagesHighLightUpdate] = useState<
    Array<string>
  >(productEdit?.product_imagesHighlights || []);

  const handlerUpdateImagesHighLight = (img: string) => {
    if (imagesHighLightUpdate.length <= 1)
      return toast.error("Không được để trống hình ảnh nổi bật");
    const newImages = imagesHighLightUpdate.filter(
      (imgItem) => imgItem !== img
    );
    setImagesHighLightUpdate(newImages);
  };

  const handlerUpdateImagesProduct = (img: string) => {
    if (imagesProductUpdate.length <= 1)
      return toast.error("Không được để trống hình ảnh sản phẩm");
    const newImages = imagesProductUpdate.filter((imgItem) => imgItem !== img);
    setImagesProductUpdate(newImages);
  };

  const { handleSubmit, formState, register, watch, setFocus } =
    useForm<IProduct>({
      defaultValues: isEditSession ? productEdit : {},
    });

  useEffect(() => {
    setFocus("product_name");
  }, []);

  const { isCreatingProduct, createProduct } = UseProductApi.createProduct();
  const { isUpdatingProduct, updateProduct } = UseProductApi.updateProduct();

  const [productOptions, setProductOptions] = useState<
    Array<IProductOption> | undefined
  >(isEditSession ? productEdit?.product_options : initializeProductOption);

  let demandIds: Array<string> | undefined,
    demandNames: Array<string> | undefined;
  if (productEdit) {
    demandIds = (productEdit?.product_demands as Array<IDemand>)?.map(
      (demand) => demand._id
    );
    demandNames = (productEdit?.product_demands as Array<IDemand>)?.map(
      (demand) => demand.demand_name
    );
  }
  const [selectDemands, setSelectDemands] = useState<Array<string>>(
    demandIds || []
  );

  const productCategoryId: Pick<IOptionSelect, "value"> = {
    value: (productEdit?.product_category as IProductCategory)?._id + "",
  };
  const [selectCategory, setSelectCategory] =
    useState<SingleValue<Pick<IOptionSelect, "value">>>(productCategoryId);

  const brandId: Pick<IOptionSelect, "value"> = {
    value: (productEdit?.product_brand as IBrand)?._id + "",
  };
  const [selectBrand, setSelectBrand] =
    useState<SingleValue<Pick<IOptionSelect, "value">>>(brandId);

  const { errors: errorsForm } = formState;
  const { metadata: categories, isGettingProductCategories } =
    UseProductCategoryApi.getAllCategories(10e9);
  const { metadata: category, isGettingProductCategory } =
    UseProductCategoryApi.getCategoryById(selectCategory?.value || "");

  const [selectedFilterOptions, setSelectedFilterOptions] = useState<
    Array<IFilterOption>
  >(productEdit ? productEdit.product_optionFilters : initialFilterOption);
  const [filtersOptions, setFiltersOptions] = useState<Array<IFilterOption>>(
    []
  );

  const optionsCategory: Array<IOptionSelect> | undefined = useMemo(() => {
    return categories?.productCategories?.map((cate) => {
      return {
        value: cate._id,
        label: cate.productCategory_name,
      };
    });
  }, [isGettingProductCategories]);

  const optionsBrands: Array<IOptionSelect> | undefined = useMemo(() => {
    const filtersOption =
      category?.productCategory_filtersOptions &&
      JSON.parse(category?.productCategory_filtersOptions);
    setFiltersOptions(filtersOption);
    if (isGettingProductCategory) return;
    return (category?.productCategory_brands as Array<IBrand>)?.map((brand) => {
      return {
        value: brand._id,
        label: brand.brand_name,
      };
    });
  }, [selectCategory, isGettingProductCategory]);

  const optionsDemands: Array<DefaultOptionType> | undefined = useMemo(() => {
    if (isGettingProductCategory) return;
    return (category?.productCategory_demands as Array<IDemand>)?.map(
      (demand) => {
        return {
          label: demand.demand_name,
          value: demand.demand_name,
        };
      }
    );
  }, [selectCategory, isGettingProductCategory]);

  const handlerSelectCategory = (
    option: SingleValue<Pick<IOptionSelect, "value">>
  ) => {
    setSelectCategory(option);
  };

  const handlerSelectBrand = (
    option: SingleValue<Pick<IOptionSelect, "value">>
  ) => {
    setSelectBrand(option);
  };

  const handlerSelectMultiDemands = (demands: Array<string>) => {
    const demandsSelected = (
      category?.productCategory_demands as Array<IDemand>
    )
      .filter((demand) => demands.includes(demand.demand_name))
      .map((demand) => demand._id);
    setSelectDemands(demandsSelected);
  };

  const onSubmit = (dataForm: Partial<IProduct>) => {
    if (
      !selectBrand?.value ||
      !selectCategory?.value ||
      productOptions?.some((option) => !option.product_optionName) ||
      productOptions?.some(
        (option) => option.product_serials?.some((serial) => !serial.serialName)
      ) ||
      productOptions?.some(
        (option) =>
          option.product_specificationMain?.some((spec) => !spec.specKey)
      ) ||
      productOptions?.some(
        (option) =>
          option.product_specificationMain?.some((spec) => !spec.specValue)
      )
    )
      return toast.error("Vui lòng điền đầy đủ thông tin của sản phẩm");
    let dataProduct: Partial<IProduct>;
    if (isEditSession)
      dataProduct = {
        product_name: dataForm["product_name"],
        product_brand: selectBrand?.value || "",
        product_category: selectCategory?.value || "",
        product_thumb: dataForm["product_thumb"] || productEdit?.product_thumb,
        product_demands: selectDemands,
        product_imagesProduct:
          imagesProductUpdate.length !==
          productEdit?.product_imagesProduct?.length
            ? imagesProductUpdate
            : dataForm["product_imagesProduct"],
        product_imagesHighlights:
          imagesHighLightUpdate.length !==
          productEdit?.product_imagesHighlights?.length
            ? imagesHighLightUpdate
            : dataForm["product_imagesHighlights"],
        product_price: dataForm["product_price"],
        product_options: productOptions,
        product_optionFilters: selectedFilterOptions,
      };
    else
      dataProduct = {
        product_name: dataForm["product_name"],
        product_brand: selectBrand?.value || "",
        product_category: selectCategory?.value || "",
        product_thumb: dataForm["product_thumb"],
        product_demands: selectDemands,
        product_imagesProduct: dataForm["product_imagesProduct"],
        product_imagesHighlights: dataForm["product_imagesHighlights"],
        product_price: dataForm["product_price"],
        product_options: productOptions,
        product_optionFilters: selectedFilterOptions,
      };
    console.log("dataProduct:::", dataProduct);

    if (!isEditSession)
      createProduct(dataProduct, { onSuccess: () => moveBack() });
    else
      updateProduct(
        { _id: productEdit?._id, ...dataProduct },
        { onSuccess: () => moveBack() }
      );
  };

  if (isGettingProductCategories) return <Spinner />;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FromHeading>
        <Heading $as="h2">Nhập thông tin sản phẩm</Heading>
      </FromHeading>
      <FormBox>
        <FormRow label="Tên sản phẩm" error={errorsForm["product_name"]}>
          <Input
            placeholder={"Nhập tên sản phẩm"}
            type="text"
            id="productName"
            {...register("product_name", {
              required: "Vui lòng bổ sung tên sản phẩm",
            })}
          />
        </FormRow>
        <FormRow
          label="Danh mục sản phẩm"
          error={!selectCategory && "Vui lòng bổ sung danh mục sản phẩm"}
        >
          <Select
            id="productCategory"
            placeholder={"Vui lòng chọn danh mục"}
            value={selectCategory}
            onChange={handlerSelectCategory}
            options={optionsCategory}
          />
        </FormRow>
        <FormRow
          label="Thương hiệu"
          error={!selectBrand && "Vui lòng bổ sung thương hiệu sản phẩm"}
        >
          <Select
            id="productBrand"
            placeholder={"Vui lòng chọn thương hiệu"}
            value={selectBrand}
            onChange={handlerSelectBrand}
            options={optionsBrands}
          />
        </FormRow>
        <FormRow label="Nhu cầu sử dụng">
          <SelectMultiV2
            id="productDemands"
            placeholder="Chọn nhu cầu sử dụng"
            options={optionsDemands}
            onChange={handlerSelectMultiDemands}
            defaultValues={demandNames}
          />
        </FormRow>
        <FormRow
          label={`Giá (${
            !!watch("product_price")
              ? formatCurrencyVND(watch("product_price"))
              : formatCurrencyVND(0)
          })`}
          error={errorsForm["product_price"]}
        >
          <Input
            type="number"
            id="productPrice"
            placeholder={"Vui lòng nhập giá sản phẩm"}
            {...register("product_price", {
              required: "Vui lòng giá danh mục sản phẩm",
              min: {
                message: "Vui lòng nhập giá lớn hơn 10000vnđ",
                value: 10000,
              },
            })}
          />
        </FormRow>

        {!isEditSession ? (
          <>
            <FormRow label="Hình ảnh đại diện" error={errorsForm.product_thumb}>
              <InputFileImage
                id="productThumb"
                register={register("product_thumb", {
                  required: "Vui lòng bổ sung hình ảnh đại diện sản phẩm",
                })}
                numberImage={watch("product_thumb")?.length}
              />
            </FormRow>
            <FormRow
              label="Hình ảnh sản phẩm"
              error={errorsForm.product_imagesProduct}
            >
              <InputFileImage
                multiple
                id="productImages"
                register={register("product_imagesProduct", {
                  required: "Vui lòng bổ sung hình ảnh về sản phẩm",
                })}
                numberImage={watch("product_imagesProduct")?.length}
              />
            </FormRow>
            <FormRow
              label="Hình ảnh nổi bật"
              error={errorsForm.product_imagesHighlights}
            >
              <InputFileImage
                multiple
                id="productImagesInfo"
                register={register("product_imagesHighlights", {
                  required: "Vui lòng bổ sung hình ảnh nổi bật về sản phẩm",
                })}
                numberImage={watch("product_imagesHighlights")?.length}
              />
            </FormRow>
          </>
        ) : (
          <>
            <FormRow
              label="Thay đổi hình ảnh đại diện"
              error={errorsForm.product_thumb}
            >
              <InputFileImage
                id="productThumb"
                register={register("product_thumb")}
                numberImage={1}
              />
              <ImagesGroup
                images={productEdit?.product_thumb || ""}
                altTitle="Thumb image"
              />
            </FormRow>
            <FormRow label="Bổ sung hình ảnh sản phẩm">
              <InputFileImage
                id="productImages"
                multiple
                register={register("product_imagesProduct")}
                numberImage={watch("product_imagesProduct")?.length}
                disabled={
                  !isEditSession
                    ? false
                    : productEdit?.product_imagesProduct.length !==
                      imagesProductUpdate.length
                }
              />
              <ImagesGroup
                onClick={handlerUpdateImagesProduct}
                images={imagesProductUpdate}
                altTitle="Product image"
              />
            </FormRow>
            <FormRow label="Bổ sung hình ảnh nổi bật">
              <InputFileImage
                id="productImagesInfo"
                multiple
                numberImage={watch("product_imagesHighlights")?.length}
                disabled={
                  !isEditSession
                    ? false
                    : productEdit?.product_imagesHighlights.length !==
                      imagesHighLightUpdate.length
                }
                register={register("product_imagesHighlights")}
              />
              <ImagesGroup
                onClick={handlerUpdateImagesHighLight}
                images={imagesHighLightUpdate}
                altTitle="Highlight image"
              />
            </FormRow>
          </>
        )}
        {/* <FormRowContent label="Product Promotion">
          <JoditEditor
            value={productPromotion}
            onChange={(promotion) => setProductPromotion(promotion)}
          />
        </FormRowContent> */}
        {filtersOptions?.length && (
          <div className="mb-5">
            <FormHeading>
              <Heading $as="h4">
                Bộ lọc tùy chọn (Sử dụng cho việc lọc sản phẩm)
              </Heading>
            </FormHeading>
            <FormBox>
              <ProductFilterOptionSelect
                filtersOptions={filtersOptions}
                selectedFilterOptions={selectedFilterOptions}
                setSelectedFilterOptions={setSelectedFilterOptions}
              />
            </FormBox>
          </div>
        )}
        <>
          <FormHeading>
            <Heading $as="h4">All options of product</Heading>
          </FormHeading>
          <FormBox>
            <ProductOptions
              isEdit={isEditSession}
              productOptions={productOptions}
              setProductOptions={setProductOptions}
            />
          </FormBox>
        </>
        <FormRowButton>
          <Button type="reset" $variation="secondary" onClick={moveBack}>
            Back
          </Button>
          {!isEditSession ? (
            <Button disabled={isCreatingProduct} type="submit">
              {isCreatingProduct ? "Creating...." : "Create New Product"}
            </Button>
          ) : (
            <Button disabled={isUpdatingProduct} type="submit">
              {isUpdatingProduct ? "Updating...." : "Update Product"}
            </Button>
          )}
        </FormRowButton>
      </FormBox>
    </Form>
  );
}
