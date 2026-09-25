import { motion, AnimatePresence } from "framer-motion";

import useForgotPasswordForm from "../lib/useForgotPasswordForm";
import MobileBrandHeader from "../../login/components/mobile-brand/MobileBrandHeader";
import EmailStep from "./steps/EmailStep";
import CodeStep from "./steps/CodeStep";
import NewPasswordStep from "./steps/NewPasswordStep";
import SuccessStep from "./steps/SuccessStep";

const stepMotion = {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 },
};

export default function ForgotPasswordForm() {
    const form = useForgotPasswordForm();

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
                    <motion.div key={form.step} {...stepMotion}>
                        {form.step === "email" && (
                            <EmailStep
                                email={form.email}
                                onEmailChange={form.handleEmailChange}
                                onSubmit={form.handleEmailSubmit}
                                isSubmitting={form.isSubmitting}
                                formError={form.formError}
                            />
                        )}

                        {form.step === "code" && (
                            <CodeStep
                                email={form.email}
                                code={form.code}
                                onCodeChange={form.handleCodeChange}
                                onSubmit={form.handleCodeSubmit}
                                onResend={form.handleResendCode}
                                onChangeEmail={form.handleChangeEmail}
                                resendCooldown={form.resendCooldown}
                                isSubmitting={form.isSubmitting}
                                formError={form.formError}
                            />
                        )}

                        {form.step === "password" && (
                            <NewPasswordStep
                                newPassword={form.newPassword}
                                newPasswordConfirm={form.newPasswordConfirm}
                                onNewPasswordChange={form.handleNewPasswordChange}
                                onNewPasswordConfirmChange={
                                    form.handleNewPasswordConfirmChange
                                }
                                onSubmit={form.handleNewPasswordSubmit}
                                isSubmitting={form.isSubmitting}
                                formError={form.formError}
                            />
                        )}

                        {form.step === "success" && <SuccessStep />}
                    </motion.div>
                </AnimatePresence>
            </motion.div>
        </section>
    );
}