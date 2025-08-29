import { AuthLayout } from "@/components/auth/auth-layout";
import { SignupForm } from "@/components/component/forms/signup-form";

export default function SignupPage() {
  return (
    <AuthLayout
      title="Join PalmTechnIQ"
      subtitle="Create your account and start learning today">
      <SignupForm />
    </AuthLayout>
  );
}
