"use client";

import { useState } from "react";
import { Button } from "@/app/_components/ui/button";
import { EditIcon } from "lucide-react";
import UpsertDialogTransaction from "../../_components/upsert-dialog-transaction";
import { Transaction } from "@prisma/client";

interface EditTransactionsProps {
  transaction: Transaction;
}

const EditTransactionsButton = ({ transaction }: EditTransactionsProps) => {
  const [dialogIsOpen, setDialoIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground"
        onClick={() => setDialoIsOpen(true)}
      >
        <EditIcon />
      </Button>

      <UpsertDialogTransaction
        isOpen={dialogIsOpen}
        setIsOpen={setDialoIsOpen}
        defValues={{
          ...transaction,
          amount: Number(transaction.amount),
          date: new Date(transaction.date),
        }}
        transactionId={transaction.id}
      />
    </>
  );
};

export default EditTransactionsButton;
