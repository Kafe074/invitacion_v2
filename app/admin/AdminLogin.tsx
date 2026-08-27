import { loginAction } from "./actions";
import { pillButton } from "@/lib/styles";

export default function AdminLogin({ error }: { error?: string }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-sky px-4">
      <form
        action={loginAction}
        className="card-shadow w-full max-w-sm rounded-3xl bg-card p-8 text-center"
      >
        <h1 className="font-script text-3xl text-navy">Panel Admin</h1>
        <p className="mt-2 text-sm text-ink-soft">
          Ingresa la contraseña para gestionar invitados y respuestas.
        </p>
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          required
          className="mt-6 w-full rounded-full border border-navy/20 bg-sky/40 px-4 py-2 text-center text-sm text-navy outline-none focus:border-navy/50"
        />
        {error && (
          <p className="mt-3 text-sm text-red-500">Contraseña incorrecta.</p>
        )}
        <button
          type="submit"
          className={`mt-6 w-full px-6 py-2 text-sm ${pillButton}`}
        >
          Ingresar
        </button>
      </form>
    </main>
  );
}
