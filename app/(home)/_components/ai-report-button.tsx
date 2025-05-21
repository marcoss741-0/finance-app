"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { BotIcon, Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Markdown from "react-markdown";
import { generateAiReport } from "../_actions/ai-report";

interface AiReportButtonProps {
  hasPremiumPlan: string;
  month: string;
}

const AiReportButton = ({ hasPremiumPlan, month }: AiReportButtonProps) => {
  const [report, setReport] = useState<string | null>(null);
  const [reportIsLoading, setReportIsLoading] = useState(false);
  const handleGenerateReportClick = async () => {
    try {
      setReportIsLoading(true);
      const aiReport = await generateAiReport(month as string);

      if (aiReport.success === false) {
        setReport(aiReport.message as string);
        return;
      }
      setReport(aiReport.text as string);
    } catch (error) {
      console.log(error);
    } finally {
      setReportIsLoading(false);
    }
  };

  return (
    <>
      <Dialog onOpenChange={(open) => !open && setReport(null)}>
        <DialogTrigger asChild>
          <Button variant="ghost">
            Relatório IA
            <BotIcon />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[600px]">
          {hasPremiumPlan === "SUB_OK" ? (
            <>
              <DialogHeader>
                <DialogTitle>Relatório IA</DialogTitle>
                <DialogDescription>
                  Use inteligência artificial para gerar um relatório com
                  insights sobre suas finanças.
                </DialogDescription>
              </DialogHeader>
              <ScrollArea className="prose prose-h3:text-white prose-h4:text-white prose-strong:text-white max-h-[450px] p-5 text-white">
                <Markdown>{report as string}</Markdown>
              </ScrollArea>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="ghost">Cancelar</Button>
                </DialogClose>
                <Button
                  onClick={handleGenerateReportClick}
                  disabled={reportIsLoading}
                >
                  {reportIsLoading && <Loader2Icon className="animate-spin" />}
                  Gerar relatório
                </Button>
              </DialogFooter>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Relatório IA</DialogTitle>
                <DialogDescription>
                  Você precisa de um plano premium para gerar relatórios com IA.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="ghost">Cancelar</Button>
                </DialogClose>
                <Button variant="link" asChild>
                  <Link href="/subscriptions">Assinar plano premium</Link>
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AiReportButton;
