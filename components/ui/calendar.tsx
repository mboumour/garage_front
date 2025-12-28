"use client";

import * as React from "react";
import {
  DayPicker,
  type DayPickerProps,
  useDayPicker,
} from "react-day-picker";
import { cn } from "@/lib/utils";
import "react-day-picker/dist/style.css";

/* =========================
   Caption personnalisé v9
   < février 2025 >
========================= */
function CustomCaption({
  calendarMonth,
}: {
  calendarMonth: { date: Date };
}) {
  const { goToMonth, previousMonth, nextMonth } = useDayPicker();

  return (
    <div className="flex items-center justify-center gap-4 mb-4">
      {/* Flèche gauche */}
      <button
        type="button"
        disabled={!previousMonth}
        onClick={() => previousMonth && goToMonth(previousMonth)}
        className="h-8 w-8 flex items-center justify-center rounded-md border
                   border-slate-300 text-slate-800 font-bold
                   hover:bg-slate-200 disabled:opacity-30"
      >
        &lt;
      </button>

      {/* Mois + année */}
      <span className="text-sm font-semibold text-slate-900 capitalize">
        {calendarMonth.date.toLocaleDateString("fr-FR", {
          month: "long",
          year: "numeric",
        })}
      </span>

      {/* Flèche droite */}
      <button
        type="button"
        disabled={!nextMonth}
        onClick={() => nextMonth && goToMonth(nextMonth)}
        className="h-8 w-8 flex items-center justify-center rounded-md border
                   border-slate-300 text-slate-800 font-bold
                   hover:bg-slate-200 disabled:opacity-30"
      >
        &gt;
      </button>
    </div>
  );
}

/* =========================
   Calendar
========================= */
export type CalendarProps = DayPickerProps;

export function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      hideNavigation
      components={{
        MonthCaption: CustomCaption,
      }}
      className={cn("p-4", className)}
      classNames={{
        months: "flex justify-center",
        month: "space-y-4",

        table: "w-full border-collapse",

        head_row: "flex",
        head_cell: "w-9 text-center text-xs font-semibold text-slate-700",

        row: "flex w-full mt-2",
        cell: "w-9 h-9 text-center text-sm",

        day: "h-9 w-9 rounded-md text-slate-900 hover:bg-slate-200",
        day_selected:
          "bg-amber-500 text-white font-semibold hover:bg-amber-600",
        day_today:
          "border-2 border-amber-500 text-amber-600 font-semibold",
        day_outside: "text-slate-400",
        day_disabled: "text-slate-400 cursor-not-allowed",

        ...classNames,
      }}
      {...props}
    />
  );
}
