import { Button, Modal } from "../../../components";
import { BrandForm } from "./BrandForm";

export default function AddBrand() {
  return (
    <Modal>
      <Modal.Open openWindowName="createBrand">
        <Button>Add New Brand</Button>
      </Modal.Open>
      <Modal.Window windowName="createBrand">
        <BrandForm />
      </Modal.Window>
    </Modal>
  );
}
