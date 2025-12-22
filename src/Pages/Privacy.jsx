import React from "react";
import { Link } from "react-router";
import { useAuth } from "../Context/AuthContext";
import { useTheme } from "../Context/ThemeContext";

const PrivacyPolicy = () => {
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
          <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-sm opacity-80">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </header>

        {/* Intro */}
        <section className="mb-6">
          <p>
            At <strong>WisdomVault</strong>, your privacy is important to us.
            This Privacy Policy explains how we collect, use, and protect your
            personal information when you use our platform.
          </p>
        </section>

        <Section title="1. Information We Collect">
          We may collect personal information such as your name, email address,
          profile photo, and content you create on the platform. We also collect
          usage data to improve user experience.
        </Section>

        <Section title="2. How We Use Your Information">
          Your information is used to manage your account, provide platform
          features, personalize content, process premium upgrades, and improve
          overall service quality.
        </Section>

        <Section title="3. Account & Authentication Data">
          Authentication data is securely handled through trusted third-party
          services. We do not store your passwords directly.
        </Section>

        <Section title="4. Content Visibility">
          Lessons marked as public may be visible to other users. Private
          lessons remain accessible only to you unless otherwise shared by your
          choice.
        </Section>

        <Section title="5. Payments & Premium Access">
          Premium payments are processed securely via third-party payment
          providers. WisdomVault does not store your payment card information.
        </Section>

        <Section title="6. Cookies & Local Storage">
          We may use cookies or local storage to remember preferences such as
          login state and theme selection to enhance user experience.
        </Section>

        <Section title="7. Data Protection">
          We implement reasonable security measures to protect your data.
          However, no system can guarantee complete security.
        </Section>

        <Section title="8. Data Sharing">
          We do not sell or rent your personal data. Information may be shared
          only when required by law or to maintain platform integrity.
        </Section>

        <Section title="9. Policy Updates">
          This Privacy Policy may be updated periodically. Continued use of the
          platform after updates indicates acceptance of the revised policy.
        </Section>

        {/* Logged-in Info */}
        {user && (
          <div className="mt-8 p-4 rounded-lg border border-dashed text-sm opacity-80">
            This policy applies to your account:{" "}
            <strong>{user.email}</strong>
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

export default PrivacyPolicy;
