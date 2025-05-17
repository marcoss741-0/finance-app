"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { useRouter } from "next/navigation";

const MONTH = [
  { value: "01", label: "Janeiro" },
  { value: "02", label: "Fevereiro" },
  { value: "03", label: "Março" },
  { value: "04", label: "Abril" },
  { value: "05", label: "Maio" },
  { value: "06", label: "Junho" },
  { value: "07", label: "Julho" },
  { value: "08", label: "Agosto" },
  { value: "09", label: "Setembro" },
  { value: "10", label: "Outubro" },
  { value: "11", label: "Novembro" },
  { value: "12", label: "Dezembro" },
];

const TimeSelect = () => {
  const { push } = useRouter();
  const handleMonthChange = (month: string) => {
    push(`/?month=${month}`);
  };
  return (
    <>
      <Select onValueChange={(value) => handleMonthChange(value)}>
        <SelectTrigger className="w-[160px] rounded-full">
          <SelectValue placeholder="Selecione o mês" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {MONTH.map((mth) => (
              <SelectItem key={mth.value} value={mth.value}>
                {mth.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
};

export default TimeSelect;
