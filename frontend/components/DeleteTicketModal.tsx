"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "@heroui/modal";

type Props = {
    ticketId: number;
    deleteFn: (id: number) => void | Promise<void>;
    onDeleted?: () => void;
};

export default function DeleteTicketModal({ ticketId, deleteFn, onDeleted }: Props) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const openModal = () => setOpen(true);
    const closeModal = () => setOpen(false);

    const handleConfirm = async () => {
        setLoading(true);
        try {
            await deleteFn(ticketId);
            if (onDeleted) onDeleted();
            closeModal();
        } catch (err) {
            console.error("Delete failed:", err);
        }
        setLoading(false);
    };

    return (
        <>
            {/* DELETE BUTTON */}
            <Button color="danger" onPress={openModal}>
                Delete
            </Button>

            {/* MODAL */}
            <Modal isOpen={open} onOpenChange={setOpen}>
                <ModalContent>
                    <ModalHeader className="text-lg font-semibold">
                        Confirm Delete
                    </ModalHeader>

                    <ModalBody>
                        <p className="text-default-600">
                            Are you sure you want to delete this ticket?
                            <br />
                            This action cannot be undone.
                        </p>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant="flat" onPress={closeModal}>
                            Cancel
                        </Button>

                        <Button
                            color="danger"
                            isLoading={loading}
                            onPress={handleConfirm}
                        >
                            Confirm
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
