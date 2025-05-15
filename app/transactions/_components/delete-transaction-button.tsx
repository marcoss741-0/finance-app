"use client";

import { Button } from "@/app/_components/ui/button";
import { Trash2Icon } from "lucide-react";

const DeleteTransactionButton = () => {
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground"
        onClick={() => {}}
      >
        <Trash2Icon />
      </Button>
    </>
  );
};

export default DeleteTransactionButton;
