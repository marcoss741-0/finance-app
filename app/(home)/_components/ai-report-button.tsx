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
import ReactMarkdown from "react-markdown";
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

  const sectionTitleStyle = {
    color: "#0056b3",
    borderBottom: "1px solid #333",
    paddingBottom: "8px",
    marginBottom: "15px",
    display: "flex", // Para alinhar com emojis
    alignItems: "center",
  };

  const highlightStyle = {
    fontWeight: "bold",
    color: "#56b22e", // Verde para valores positivos/importantes
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const negativeHighlightStyle = {
    fontWeight: "bold",
    color: "#dc3545",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse" as const,
    margin: "20px 0",
  };

  const thTdStyle = {
    border: "1px solid #ddd",
    padding: "10px",
    textAlign: "left" as const,
  };

  const listStyle = {
    listStyleType: "disc",
    marginLeft: "20px",
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
                <ReactMarkdown
                  components={{
                    h1: ({ ...props }) => (
                      <h1 style={sectionTitleStyle} {...props} />
                    ),
                    h2: ({ ...props }) => (
                      <h2 style={sectionTitleStyle} {...props} />
                    ),
                    p: ({ ...props }) => <p {...props} />,
                    strong: ({ ...props }) => (
                      <strong style={highlightStyle} {...props} />
                    ), // Negrito para destacar valores positivos
                    table: ({ ...props }) => (
                      <table style={tableStyle} {...props} />
                    ),
                    th: ({ ...props }) => <th style={thTdStyle} {...props} />,
                    td: ({ ...props }) => <td style={thTdStyle} {...props} />,
                    ul: ({ ...props }) => <ul style={listStyle} {...props} />,
                    ol: ({ ...props }) => <ol style={listStyle} {...props} />,
                  }}
                >
                  {report as string}
                </ReactMarkdown>
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
