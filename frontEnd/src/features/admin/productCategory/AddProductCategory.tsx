import { Button, Modal } from "../../../components";
import ProductCategoryForm from "./ProductCategoryForm";

export default function AddProductCategory() {
  return (
    <Modal>
      <Modal.Open openWindowName="createProductCategory">
        <Button>Add New Product Category</Button>
      </Modal.Open>
      <Modal.Window windowName="createProductCategory">
        <ProductCategoryForm />
      </Modal.Window>
    </Modal>
  );
}
