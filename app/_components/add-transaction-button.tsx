"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { ArrowUpDown } from "lucide-react";
import UpsertDialogTransaction from "./upsert-dialog-transaction";

interface AddTransactionsParams {
  userId?: string;
  userCanAddTransaction?: boolean;
}

const AddTransactionsButton = ({
  userId,
  userCanAddTransaction,
}: AddTransactionsParams) => {
  const [dialogIsOpen, setDialoIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="default"
        className="gap-2 rounded-full text-[14px] font-semibold"
        onClick={() => setDialoIsOpen(true)}
        disabled={!userCanAddTransaction}
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
