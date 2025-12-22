import React from "react";
import { Link } from "react-router";
import { useAuth } from "../Context/AuthContext";
import { useTheme } from "../Context/ThemeContext";

const TermsAndConditions = () => {
  const auth = useAuth();
  const themeContext = useTheme();

  const user = auth?.user;
  const theme = themeContext?.theme || "light";

  return (
    <div
      className={`min-h-screen px-4 py-12 ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div
        className={`max-w-5xl mx-auto rounded-xl shadow-lg p-6 md:p-10 ${
          theme === "dark"
            ? "bg-gray-800 text-gray-200"
            : "bg-white text-gray-700"
        }`}
      >
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Terms & Conditions</h1>
          <p className="text-sm opacity-80">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </header>

        {/* Intro */}
        <section className="mb-6">
          <p>
            Welcome to <strong>WisdomVault</strong>. By accessing or using this
            platform, you agree to comply with these Terms & Conditions. If you
            do not agree, please discontinue using the service.
          </p>
        </section>

        <Section title="1. User Eligibility">
          Users must be at least 13 years old to use WisdomVault. You are
          responsible for providing accurate account information.
        </Section>

        <Section title="2. Account Security">
          You are responsible for safeguarding your login credentials and all
          activities under your account.
        </Section>

        <Section title="3. Content Ownership">
          You retain ownership of the lessons you create. Public lessons may be
          displayed within the platform.
        </Section>

        <Section title="4. Premium Features">
          Premium access is available through a one-time lifetime payment.
          Payments are processed securely via Stripe and are non-refundable.
        </Section>

        <Section title="5. Acceptable Use">
          Posting harmful, abusive, illegal, or misleading content is strictly
          prohibited.
        </Section>

        <Section title="6. Moderation & Reports">
          WisdomVault reserves the right to review or remove content that
          violates platform guidelines.
        </Section>

        <Section title="7. Account Termination">
          Accounts violating these terms may be suspended or terminated without
          prior notice.
        </Section>

        <Section title="8. Limitation of Liability">
          All content is for educational and inspirational purposes only.
          WisdomVault is not liable for user actions.
        </Section>

        <Section title="9. Changes to Terms">
          These terms may be updated at any time. Continued use implies
          acceptance of updates.
        </Section>

        {/* Logged-in Info */}
        {user && (
          <div className="mt-8 p-4 rounded-lg border border-dashed text-sm opacity-80">
            Logged in as <strong>{user.email}</strong>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 text-center text-sm opacity-70">
          <Link to="/" className="underline font-medium">
            Back to Home
          </Link>
        </footer>
      </div>
    </div>
  );
};

const Section = ({ title, children }) => (
  <section className="mb-6">
    <h2 className="text-xl font-semibold mb-2">{title}</h2>
    <p className="leading-relaxed opacity-90">{children}</p>
  </section>
);

export default TermsAndConditions;
