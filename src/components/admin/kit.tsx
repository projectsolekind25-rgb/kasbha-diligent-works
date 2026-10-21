import type { ReactNode, InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Field({ label, error, children, hint }: { label: string; error?: string | undefined; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-medium text-muted-foreground">{label}</span>
      {children}
      {hint && !error && <span className="mt-1 block text-xs text-muted-foreground">{hint}</span>}
      {error && <span className="mt-1 block text-xs text-primary">{error}</span>}
    </label>
  );
}

const inputCls =
  "hairline w-full rounded-2xl bg-secondary/50 px-4 py-3 text-[15px] text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:bg-secondary";

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(inputCls, "h-12 py-0", props.className)} />;
}
export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea rows={3} {...props} className={cn(inputCls, props.className)} />;
}

export function Btn({
  children,
  variant = "primary",
  className,
  ...rest
}: { variant?: "primary" | "glass" | "danger" } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const v = {
    primary: "bg-primary text-primary-foreground",
    glass: "hairline bg-secondary/60 text-foreground hover:bg-secondary",
    danger: "hairline bg-secondary/60 text-primary hover:bg-secondary",
  }[variant];
  return (
    <button
      {...rest}
      className={cn(
        "press inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold disabled:pointer-events-none disabled:opacity-50",
        v,
        className,
      )}
    >
      {children}
    </button>
  );
}

export function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("hairline rounded-3xl bg-card p-5 sm:p-6", className)}>{children}</div>;
}

export function Skel({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-2xl bg-secondary/60", className)} />;
}

export function PageTitle({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="mb-6">
      <h1 className="text-4xl sm:text-5xl">{title}</h1>
      {sub && <p className="mt-2 text-sm text-muted-foreground">{sub}</p>}
    </div>
  );
}
