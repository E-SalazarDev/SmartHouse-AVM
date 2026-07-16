import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home,
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

export default function LoginForm() {
  const [showPassword, setShowPassword] =
    useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    /*
     * Aquí agregaremos después:
     *
     * 1. Obtener correo y contraseña.
     * 2. Enviar los datos al backend.
     * 3. Recibir access y refresh token.
     * 4. Guardar los tokens.
     * 5. Redirigir al usuario.
     */
  };

  return (
    <section className="flex items-center justify-center bg-white px-6 py-12">
      <motion.div
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.4,
        }}
        className="w-full max-w-sm"
      >
        {/* Logo visible solamente en dispositivos pequeños */}
        <div className="mb-8 flex items-center gap-2.5 lg:hidden">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950">
            <Home
              size={17}
              strokeWidth={1.8}
              className="text-white"
            />
          </div>

          <span className="text-lg font-semibold tracking-tight text-slate-900">
            SmartHouse AI
          </span>
        </div>

        <header>
          <h1 className="font-serif text-3xl font-normal text-slate-900">
            Bienvenido de vuelta
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Ingresa tus credenciales para continuar.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-4"
        >
          {/* Correo electrónico */}
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-xs font-semibold text-slate-600"
            >
              Correo electrónico
            </label>

            <div className="relative">
              <Mail
                size={16}
                strokeWidth={1.8}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                id="email"
                type="email"
                name="email"
                placeholder="tu@correo.com"
                autoComplete="email"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/60 py-2.5 pl-10 pr-3.5 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
              />
            </div>
          </div>

          {/* Contraseña */}
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-slate-600"
              >
                Contraseña
              </label>

              <Link
                to="/recuperar-password"
                className="text-xs font-medium text-violet-600 hover:text-violet-700"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <div className="relative">
              <Lock
                size={16}
                strokeWidth={1.8}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                id="password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                placeholder="••••••••"
                autoComplete="current-password"
                className="w-full rounded-xl border border-slate-200 bg-slate-50/60 py-2.5 pl-10 pr-10 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-violet-400 focus:bg-white focus:ring-4 focus:ring-violet-100"
              />

              <button
                type="button"
                onClick={() => {
                  setShowPassword(
                    (currentValue) =>
                      !currentValue
                  );
                }}
                aria-label={
                  showPassword
                    ? "Ocultar contraseña"
                    : "Mostrar contraseña"
                }
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? (
                  <EyeOff size={16} />
                ) : (
                  <Eye size={16} />
                )}
              </button>
            </div>
          </div>

          {/* Mantener sesión */}
          <label className="flex items-center gap-2 pt-1 text-xs text-slate-500">
            <input
              type="checkbox"
              name="remember"
              className="h-3.5 w-3.5 rounded border-slate-300 text-violet-600 focus:ring-violet-400"
            />

            Mantener sesión iniciada
          </label>

          {/* Botón */}
          <motion.button
            whileHover={{
              scale: 1.01,
            }}
            whileTap={{
              scale: 0.98,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 17,
            }}
            type="submit"
            className="w-full rounded-xl bg-linear-to-r from-indigo-600 to-fuchsia-600 py-2.5 text-sm font-medium tracking-normal text-white shadow-sm transition-shadow hover:shadow-md"
          >
            Iniciar sesión
          </motion.button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-500">
          ¿No tienes cuenta?{" "}
          <Link
            to="/registro"
            className="font-semibold text-violet-600 hover:text-violet-700"
          >
            Crear cuenta
          </Link>
        </p>
      </motion.div>
    </section>
  );
}