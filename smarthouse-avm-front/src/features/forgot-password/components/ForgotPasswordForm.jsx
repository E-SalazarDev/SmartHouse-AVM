import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MailCheck, ArrowLeft } from "lucide-react";

import useForgotPasswordForm from "../lib/useForgotPasswordForm";
import MobileBrandHeader from "../../login/components/mobile-brand/MobileBrandHeader";
import EmailField from "../../login/components/form/EmailField";
import FormError from "../../login/components/form/FormError";
import SubmitButton from "../../login/components/form/SubmitButton";

export default function ForgotPasswordForm() {
    const {
        email,
        formError,
        isSubmitting,
        isSubmitted,
        handleInputChange,
        handleSubmit,
    } = useForgotPasswordForm();

    return (
        <section className="flex items-center justify-center bg-white px-6 py-12">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-sm"
            >
                <MobileBrandHeader />

                <AnimatePresence mode="wait">
                    {isSubmitted ? (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50">
                                <MailCheck size={22} className="text-emerald-600" />
                            </div>

                            <h1 className="mt-5 text-3xl font-bold text-slate-950">
                                Revisa tu correo
                            </h1>
                            <p className="mt-2 text-sm text-slate-500">
                                Si existe una cuenta asociada a{" "}
                                <span className="font-semibold text-slate-700">{email}</span>,
                                te enviamos un enlace para restablecer tu contraseña.
                            </p>

                            <Link
                                to="/login"
                                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-violet-600 hover:text-violet-700"
                            >
                                <ArrowLeft size={15} />
                                Volver a iniciar sesión
                            </Link>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <header>
                                <h1 className="text-3xl font-bold text-slate-950">
                                    ¿Olvidaste tu contraseña?
                                </h1>
                                <p className="mt-2 text-sm text-slate-500">
                                    Ingresa tu correo electrónico y te enviaremos un enlace
                                    para restablecerla.
                                </p>
                            </header>

                            <form onSubmit={handleSubmit} className="mt-8 space-y-4" noValidate>
                                <EmailField
                                    value={email}
                                    onChange={handleInputChange}
                                    disabled={isSubmitting}
                                />

                                <FormError message={formError} />

                                <SubmitButton isLoading={isSubmitting}>
                                    {isSubmitting ? "Enviando..." : "Enviar enlace de recuperación"}
                                </SubmitButton>
                            </form>

                            <p className="mt-8 text-center text-sm text-slate-500">
                                <Link
                                    to="/login"
                                    className="inline-flex items-center gap-1.5 font-semibold text-violet-600 hover:text-violet-700"
                                >
                                    <ArrowLeft size={14} />
                                    Volver a iniciar sesión
                                </Link>
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </section>
    );
}