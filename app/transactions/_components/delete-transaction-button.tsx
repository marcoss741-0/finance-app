"use client";

import { Button } from "@/app/_components/ui/button";
import { Trash2Icon } from "lucide-react";
import { toast } from "sonner";
import { mutate } from "swr";

interface DeleteTransactionParams {
  ID: string;
}

const DeleteTransactionButton = ({ ID }: DeleteTransactionParams) => {
  const handleDeleteTransaction = async () => {
    try {
      const res = await fetch(`/api/transactions/delete-transaction`, {
        method: "POST",
        body: JSON.stringify({ transactionId: ID }),
      });
      const response = await res.json();

      if (response.success === false) {
        return toast.warning(response.message);
      }

      toast.success(response.message || "");
    } catch (error) {
      console.log(error);
    }

    await mutate("/api/transactions/get-transaction");
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground"
        onClick={handleDeleteTransaction}
      >
        <Trash2Icon />
      </Button>
    </>
  );
};

export default DeleteTransactionButton;
