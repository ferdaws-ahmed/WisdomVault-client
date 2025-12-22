import React from "react";
import { useAuth } from "../context/AuthProvider";
import { useTheme } from "../context/ThemeProvider";
import { Link } from "react-router";

const TermsAndConditions = () => {
  const { user } = useAuth();
  const { theme } = useTheme();

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
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-center">
            Terms & Conditions
          </h1>
          <p className="text-center text-sm opacity-80">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </header>

        {/* Welcome */}
        <section className="mb-6">
          <p>
            Welcome to <span className="font-semibold">WisdomVault</span>. By
            accessing or using our platform, you agree to comply with these Terms
            & Conditions. If you do not agree, please discontinue using the
            service.
          </p>
        </section>

        {/* 1 */}
        <Section title="1. User Eligibility">
          Users must be at least 13 years old to use WisdomVault. By creating an
          account, you confirm that all provided information is accurate and
          complete.
        </Section>

        {/* 2 */}
        <Section title="2. User Accounts & Security">
          You are responsible for maintaining the confidentiality of your login
          credentials. Any activity performed through your account is your sole
          responsibility.
        </Section>

        {/* 3 */}
        <Section title="3. Content Ownership">
          You retain ownership of all life lessons you create. By making lessons
          public, you grant WisdomVault a non-exclusive license to display and
          distribute your content within the platform.
        </Section>

        {/* 4 */}
        <Section title="4. Premium Features & Payments">
          WisdomVault offers Premium features via a one-time lifetime payment.
          Payments are securely processed using{" "}
          <span className="font-medium">Stripe</span>. Premium access is
          non-refundable unless required by applicable law.
        </Section>

        {/* 5 */}
        <Section title="5. Acceptable Use">
          Users agree not to post content that is abusive, hateful, misleading,
          illegal, or harmful. Any violation may result in content removal or
          account suspension.
        </Section>

        {/* 6 */}
        <Section title="6. Reporting & Moderation">
          Users may report inappropriate content. WisdomVault reserves the right
          to review, restrict, or remove any content that violates community
          guidelines.
        </Section>

        {/* 7 */}
        <Section title="7. Account Termination">
          We may suspend or terminate accounts that breach these terms or misuse
          the platform without prior notice.
        </Section>

        {/* 8 */}
        <Section title="8. Limitation of Liability">
          WisdomVault is not responsible for actions taken based on shared life
          lessons. All content is provided for educational and inspirational
          purposes only.
        </Section>

        {/* 9 */}
        <Section title="9. Changes to Terms">
          These Terms & Conditions may be updated at any time. Continued use of
          the platform signifies acceptance of the revised terms.
        </Section>

        {/* User Info */}
        {user && (
          <div className="mt-10 p-4 rounded-lg border border-dashed text-sm opacity-80">
            You are currently logged in as{" "}
            <span className="font-medium">{user.email}</span>. Your usage of
            WisdomVault is subject to these Terms & Conditions.
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 text-center text-sm opacity-70">
          <p>
            Need help? Visit our{" "}
            <Link to="/contact" className="underline font-medium">
              Support Page
            </Link>
          </p>
        </footer>
      </div>
    </div>
  );
};

/* Reusable Section Component */
const Section = ({ title, children }) => {
  return (
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="leading-relaxed opacity-90">{children}</p>
    </section>
  );
};

export default TermsAndConditions;
