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
    deleteFn: () => void | Promise<void>;
    onDeleted?: () => void;
    className?: string;
};

export default function DeleteTicketModal({
                                              ticketId,
                                              deleteFn,
                                              onDeleted,
                                              className,
                                          }: Props) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleConfirm = async () => {
        setLoading(true);
        try {
            await deleteFn();
            onDeleted?.();
            setOpen(false);
        } catch (err) {
            console.error("Delete failed:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={className}>
            {/* DELETE BUTTON */}
            <Button color="danger" onPress={() => setOpen(true)}>
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
                        <Button variant="flat" onPress={() => setOpen(false)}>
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
        </div>
    );
}
