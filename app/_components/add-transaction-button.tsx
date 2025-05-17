"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { ArrowUpDown } from "lucide-react";
import UpsertDialogTransaction from "./upsert-dialog-transaction";

interface AddTransactionsParams {
  userId?: string;
}

const AddTransactionsButton = ({ userId }: AddTransactionsParams) => {
  const [dialogIsOpen, setDialoIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="default"
        className="gap-2 rounded-full text-[14px] font-semibold"
        onClick={() => setDialoIsOpen(true)}
      >
        Adicionar transação <ArrowUpDown />
      </Button>

      <UpsertDialogTransaction
        isOpen={dialogIsOpen}
        setIsOpen={setDialoIsOpen}
        userId={userId}
      />
    </>
  );
};

export default AddTransactionsButton;
