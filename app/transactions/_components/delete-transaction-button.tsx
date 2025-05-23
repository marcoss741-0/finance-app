"use client";

import { Button } from "@/app/_components/ui/button";
import { Loader, TrashIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { mutate } from "swr";

interface DeleteTransactionParams {
  ID: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userId: string | any;
}

const DeleteTransactionButton = ({ ID, userId }: DeleteTransactionParams) => {
  const [isLoading, setIsloading] = useState(false);

  const handleDeleteTransaction = async () => {
    setIsloading(true);
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
      setIsloading(false);
    }

    const swrKey: [string, string] = [
      "/api/transactions/get-transaction",
      userId,
    ];

    await mutate(swrKey);
    setIsloading(false);
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground"
        onClick={handleDeleteTransaction}
      >
        {isLoading ? <Loader className="animate-spin" /> : <TrashIcon />}
      </Button>
    </>
  );
};

export default DeleteTransactionButton;
