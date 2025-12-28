"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type SelectContextValue = {
  value?: string;
  setValue: (value: string, label?: React.ReactNode) => void;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  displayLabel?: React.ReactNode;
  setDisplayLabel: React.Dispatch<React.SetStateAction<React.ReactNode | undefined>>;
};

const SelectContext = React.createContext<SelectContextValue | null>(null);

export interface SelectProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

export function Select({ value, defaultValue, onValueChange, children, className }: SelectProps) {
  const [internalValue, setInternalValue] = React.useState<string | undefined>(defaultValue);
  const [open, setOpen] = React.useState(false);
  const [displayLabel, setDisplayLabel] = React.useState<React.ReactNode>();
  const currentValue = value ?? internalValue;

  const setValue = (nextValue: string, label?: React.ReactNode) => {
    if (value === undefined) {
      setInternalValue(nextValue);
    }
    if (label !== undefined) {
      setDisplayLabel(label);
    }
    onValueChange?.(nextValue);
    setOpen(false);
  };

  return (
    <SelectContext.Provider
      value={{ value: currentValue, setValue, open, setOpen, displayLabel, setDisplayLabel }}
    >
      <div className={cn("relative", className)}>{children}</div>
    </SelectContext.Provider>
  );
}

export function SelectTrigger({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const context = React.useContext(SelectContext);
  if (!context) throw new Error("SelectTrigger must be used within Select");

  return (
    <button
      type="button"
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500",
        className,
      )}
      onClick={() => context.setOpen((prev) => !prev)}
      {...props}
    >
      {children}
      <svg
        className="ml-2 h-4 w-4 text-slate-500"
        viewBox="0 0 24 24"
        stroke="currentColor"
        fill="none"
        strokeWidth="2"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </button>
  );
}

export function SelectValue({ placeholder }: { placeholder?: string }) {
  const context = React.useContext(SelectContext);
  if (!context) throw new Error("SelectValue must be used within Select");
  return <span className="truncate">{context.displayLabel ?? placeholder}</span>;
}

export function SelectContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const context = React.useContext(SelectContext);
  if (!context || !context.open) return null;

  return (
    <div
      className={cn(
        "absolute z-20 mt-2 w-full rounded-xl border border-slate-200 bg-white p-1 shadow-lg",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function SelectItem({
  value,
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { value: string }) {
  const context = React.useContext(SelectContext);
  if (!context) throw new Error("SelectItem must be used within Select");

  const isActive = context.value === value;

  React.useEffect(() => {
    if (isActive) {
      context.setDisplayLabel(children);
    }
  }, [children, context, isActive]);

  return (
    <div
      role="option"
      aria-selected={isActive}
      onClick={() => context.setValue(value, children)}
      className={cn(
        "flex cursor-pointer items-center rounded-lg px-3 py-2 text-sm transition-colors",
        isActive ? "bg-amber-500/10 text-amber-600" : "text-slate-600 hover:bg-slate-100",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
