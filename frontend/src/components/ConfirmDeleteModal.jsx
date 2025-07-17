import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

export default function ConfirmDeleteModal({ name, open, onClose, onConfirm }) {
  return (
    <Dialog open={open} handler={onClose} className="dark:bg-gray-900">
      <DialogHeader className="text-white">
        Do you really want to delete the {name}?
      </DialogHeader>
      <DialogBody className="text-white">
        This action cannot be taken back!
      </DialogBody>
      <DialogFooter>
        <Button variant="text" color="red" onClick={onClose} className="mr-1">
          <span>Cancel</span>
        </Button>
        <Button variant="gradient" color="green" onClick={onConfirm}>
          <span>Confirm</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
