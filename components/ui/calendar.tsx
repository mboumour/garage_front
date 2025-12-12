"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import type { DayPickerSingleProps } from "react-day-picker";
import { cn } from "@/utils";
import "react-day-picker/dist/style.css";

export type CalendarProps = DayPickerSingleProps;

export function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button:
          "h-8 w-8 bg-transparent p-0 opacity-50 hover:opacity-100 text-slate-700 transition",
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-slate-500 rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "text-center text-sm p-0 relative",
        day: "h-9 w-9 rounded-lg hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500",
        day_selected: "bg-amber-500 text-slate-900 hover:bg-amber-600",
        day_today: "bg-slate-100 text-slate-900",
        day_outside: "text-slate-300 opacity-50",
        day_disabled: "text-slate-300 opacity-50 cursor-not-allowed",
        ...classNames,
      }}
      {...props}
    />
  );
}
