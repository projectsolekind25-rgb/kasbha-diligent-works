import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { inviteAdmin, listAdmins, removeAdmin, type AdminUser } from "@/lib/admin.functions";
import { Btn, Field, PageTitle, Panel, Skel, TextInput } from "@/components/admin/kit";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const Route = createFileRoute("/admin/users")({
  component: UsersPage,
});

const KEY = ["admins"];
const emailSchema = z.string().trim().toLowerCase().email("Enter a valid email").max(255);

function UsersPage() {
  const qc = useQueryClient();
  const list = useServerFn(listAdmins);
  const invite = useServerFn(inviteAdmin);
  const remove = useServerFn(removeAdmin);
  const [email, setEmail] = useState("");
  const [err, setErr] = useState<string>();
  const [target, setTarget] = useState<AdminUser | null>(null);

  const q = useQuery({ queryKey: KEY, queryFn: () => list() });

  const inv = useMutation({
    mutationFn: (e: string) => invite({ data: { email: e } }),
    onSuccess: (r) => {
      if (!r.ok) return toast.error(r.message);
      toast.success("Invite sent.");
      setEmail("");
      qc.invalidateQueries({ queryKey: KEY });
    },
    onError: () => toast.error("Invite could not be sent."),
  });

  const rm = useMutation({
    mutationFn: (id: string) => remove({ data: { userId: id } }),
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: KEY });
      const prev = qc.getQueryData<AdminUser[]>(KEY);
      qc.setQueryData<AdminUser[]>(KEY, (l) => l?.filter((u) => u.id !== id));
      return { prev };
    },
    onSuccess: (r, _id, ctx) => {
      if (r.ok) return toast.success("Admin removed.");
      if (ctx?.prev) qc.setQueryData(KEY, ctx.prev);
      toast.error(r.message);
    },
    onError: (_e, _id, ctx) => {
      if (ctx?.prev) qc.setQueryData(KEY, ctx.prev);
      toast.error("Could not remove admin.");
    },
    onSettled: () => qc.invalidateQueries({ queryKey: KEY }),
  });

  function submit(e: FormEvent) {
    e.preventDefault();
    const r = emailSchema.safeParse(email);
    if (!r.success) return setErr(r.error.issues[0]?.message);
    setErr(undefined);
    inv.mutate(r.data);
  }

  const admins = q.data ?? [];
  const onlyOne = admins.length <= 1;

  return (
    <>
      <PageTitle title="Users" sub="Admins can sign in and edit the website. Access is by invite only." />

      <Panel>
        <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row sm:items-end" noValidate>
          <div className="flex-1">
            <Field label="Invite by email" error={err}>
              <TextInput type="email" autoComplete="off" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" />
            </Field>
          </div>
          <Btn type="submit" disabled={inv.isPending} className="h-12">{inv.isPending ? "Sending…" : "Send invite"}</Btn>
        </form>
      </Panel>

      <div className="mt-5 space-y-2">
        {q.isLoading ? (
          [0, 1].map((i) => <Skel key={i} className="h-16" />)
        ) : q.isError ? (
          <p className="text-sm text-muted-foreground">Could not load admins.</p>
        ) : (
          admins.map((u) => (
            <div key={u.id} className="hairline flex items-center justify-between gap-3 rounded-2xl bg-card px-4 py-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">
                  {u.email} {u.isYou && <span className="font-normal text-muted-foreground">(you)</span>}
                </p>
                <p className="text-xs text-muted-foreground">
                  {u.pending ? "Invite pending" : `Last signed in ${new Date(u.lastSignIn!).toLocaleDateString("en-ZA")}`}
                </p>
              </div>
              <Btn variant="danger" className="h-9 px-4" disabled={onlyOne} title={onlyOne ? "You can't remove the last admin" : undefined} onClick={() => setTarget(u)}>
                Remove
              </Btn>
            </div>
          ))
        )}
      </div>

      <AlertDialog open={!!target} onOpenChange={(o) => !o && setTarget(null)}>
        <AlertDialogContent className="rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Remove admin?</AlertDialogTitle>
            <AlertDialogDescription>
              {target?.email} will no longer be able to edit the website{target?.isYou ? ", including you" : ""}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="rounded-full bg-primary text-primary-foreground"
              onClick={() => {
                if (target) rm.mutate(target.id);
                setTarget(null);
              }}
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
