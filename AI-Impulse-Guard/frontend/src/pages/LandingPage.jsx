import { NavLink,useNavigate } from "react-router-dom";

const cn = (...c) => c.filter(Boolean).join(" ");

function PrimaryButton({ children, className }) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center justify-center rounded-[48px] px-10 py-4",
        "bg-[linear-gradient(162deg,rgba(192,193,255,1)_0%,rgba(75,77,216,1)_100%)]",
        "text-sm font-semibold leading-5 text-[#0B1326]",
        "shadow-[0_10px_30px_rgba(0,0,0,0.25)]",
        className,
      )}
    >
      {children}
    </button>
  );
}

function SecondaryButton({ children, className }) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center justify-center rounded-[48px] px-10 py-4",
        "border border-[rgba(70,69,85,0.15)] bg-transparent",
        "text-sm font-semibold leading-5 text-[#DAE2FD]",
        className,
      )}
    >
      {children}
    </button>
  );
}

function FeatureCard({ iconSrc, iconTintClassName, title, body }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-[48px] border border-[rgba(70,69,85,0.1)] bg-[rgba(34,42,61,1)]">
      <div className="flex flex-col gap-4 p-8">
        <div className={cn("h-10 w-10", iconTintClassName)}>
          <img src={iconSrc} alt="" className="h-full w-full" />
        </div>
        <h3 className="text-[20px] font-bold leading-7 tracking-[-0.05em] text-[#DAE2FD]">
          {title}
        </h3>
        <p className="whitespace-pre-line text-sm leading-[1.6] text-[rgba(199,196,216,0.8)]">
          {body}
        </p>
      </div>
      <div className="border-t border-[rgba(70,69,85,0.15)] px-8 py-6">
        <button
          type="button"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#4EDEA3]"
        >
          Learn More
          <img src="/figma/icon-arrow-right-1.svg" alt="" className="h-4 w-4" />
        </button>
      </div>
    </article>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#0B1326] font-sans text-[#DAE2FD]">
      {/* Header - Top Navigation */}
      <header className="pointer-events-none fixed left-1/2 top-0 z-50 w-full max-w-[1280px] -translate-x-1/2 px-8 pt-0">
        <div className="pointer-events-auto mt-0 flex h-20 items-center justify-between px-8 backdrop-blur-[24px]">
          <div className="flex items-center gap-8">
            <span className="text-[20px] font-bold leading-7 tracking-[-0.05em] text-[#F1F5F9]">
              Impulse Guard
            </span>
            <nav className="hidden items-center gap-8 md:flex">
              <a
                href="#features"
                className="border-b-2 border-[#818CF8] pb-1 text-sm font-semibold tracking-[-0.025em] text-[#A5B4FC]"
              >
                Features
              </a>
              <NavLink
              to="/dashboard">Dashboard</NavLink>
             <NavLink to="/insights" >
              Insights
             </NavLink>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/login")}
              type="button"
              className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(163deg,rgba(192,193,255,1)_0%,rgba(75,77,216,1)_100%)] px-5 py-2 text-sm font-semibold text-[#0B1326]"
            >
              Get Started
              <img
                src="/figma/footer-ornament.svg"
                alt=""
                className="h-5 w-5"
              />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-[1440px] flex-col items-stretch gap-20 pb-32">
        {/* Hero Section */}
        <section className="flex flex-col items-center px-8 pb-32 pt-48">
          <div className="flex max-w-[1152px] flex-col items-center gap-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(70,69,85,0.15)] bg-[#222A3D] px-3 py-1">
              <span className="h-2 w-2 rounded-full bg-[#4EDEA3]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#4EDEA3]">
                AI-Powered Defense v2.4
              </span>
            </div>

            <h1 className="text-center text-[56px] font-black leading-none tracking-[-0.04em] md:text-[96px]">
              Stop Impulse
              <br />
              Buying with AI.
            </h1>

            <p className="max-w-[672px] text-center text-[18px] leading-[1.333] text-[rgba(199,196,216,0.8)] md:text-[24px]">
              Protect your wealth with an ethereal guardian. Impulse Guard
              monitors your digital footprint to intercept emotional spending
              before it happens.
            </p>

            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <PrimaryButton>Get Started</PrimaryButton>
              <SecondaryButton>Try Demo</SecondaryButton>
            </div>

            <div className="w-full pt-24">
              <div className="relative overflow-hidden rounded-[48px] border border-[rgba(70,69,85,0.1)] bg-[#222A3D] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] backdrop-blur-[20px]">
                <div className="opacity-60">
                  <img
                    src="/figma/financial-dashboard-1d3548.png"
                    alt=""
                    className="h-[646px] w-full object-cover"
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgba(11,19,38,1)_0%,rgba(11,19,38,0)_50%,rgba(11,19,38,0)_100%)]" />
              </div>
            </div>
          </div>
        </section>

        {/* Guardian Ecosystem */}
        <section id="features" className="mx-auto w-full max-w-[1152px] px-8">
          <div className="flex flex-col items-center gap-6">
            <h2 className="text-center text-[48px] font-extrabold leading-[1.05] tracking-[-0.03em] text-[#DAE2FD]">
              The Guardian Ecosystem
            </h2>
            <p className="text-center text-[18px] leading-[1.6] text-[rgba(199,196,216,0.8)]">
              Intelligent protection layers built for the modern consumer.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <FeatureCard
              iconSrc="/figma/icon-spending-analysis.svg"
              title="Spending analysis"
              body={
                "Deep-dive into the 'why' behind your purchases.\nUncover emotional triggers and seasonal patterns."
              }
            />
            <FeatureCard
              iconSrc="/figma/icon-predictive-guardrails.svg"
              title="Predictive guardrails"
              body={
                "AI forecasts risk windows and places friction before checkout.\nAlways on, always learning."
              }
            />
            <FeatureCard
              iconSrc="/figma/icon-guardian-ai.svg"
              title="Guardian AI"
              body={
                "A calm, private co-pilot that nudges you back to your goals.\nLess guilt, more control."
              }
            />
          </div>

          <div className="mt-10 overflow-hidden rounded-[48px] border border-[rgba(70,69,85,0.1)] bg-[#222A3D]">
            <div className="grid gap-8 p-10 md:grid-cols-[1fr_auto] md:items-center">
              <div className="space-y-4">
                <h3 className="text-[32px] font-extrabold leading-[1.1] tracking-[-0.03em] text-[#DAE2FD]">
                  Military-Grade Privacy
                </h3>
                <p className="text-[16px] leading-[1.6] text-[rgba(199,196,216,0.8)]">
                  Your data never leaves your device. We use on-device machine
                  learning and zero-knowledge proofs to protect your financial
                  identity.
                </p>
              </div>
              <img
                src="/figma/background-border-ornament.svg"
                alt=""
                className="h-24 w-24 opacity-90"
              />
            </div>
          </div>
        </section>

        {/* High Impact CTA Section */}
        <section className="mx-auto w-full max-w-[1152px] px-8">
          <div className="relative overflow-hidden rounded-[48px] border border-[rgba(70,69,85,0.1)] bg-[#222A3D] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] backdrop-blur-[20px]">
            <div className="absolute left-8 top-8 h-12 w-12 opacity-90">
              <img
                src="/figma/logo-mark.svg"
                alt=""
                className="h-full w-full"
              />
            </div>

            <div className="flex flex-col items-center gap-8 px-8 py-16 text-center">
              <h2 className="text-[40px] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[56px]">
                Ready to take control of
                <br />
                your financial destiny?
              </h2>

              <div className="flex flex-col items-center gap-4 sm:flex-row">
                <PrimaryButton className="bg-[linear-gradient(163deg,rgba(192,193,255,1)_0%,rgba(75,77,216,1)_100%)]">
                  Join the Waitlist
                </PrimaryButton>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-[48px] border border-[rgba(129,140,248,0.45)] bg-[#0B1326] px-10 py-4 text-sm font-semibold text-[#DAE2FD]"
                >
                  Talk to an Advisor
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <footer className="mt-10 w-full rounded-t-[48px] border-t border-[rgba(70,69,85,0.15)] bg-[rgba(34,42,61,0.35)]">
          <div className="mx-auto w-full max-w-[1152px] px-12 py-20">
            <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
              <div className="space-y-6">
                <div className="text-[20px] font-bold tracking-[-0.05em] text-[#E2E8F0]">
                  Impulse Guard
                </div>
                <p className="max-w-[384px] text-sm leading-[1.6] text-[#64748B]">
                  The world&apos;s first AI-driven emotional spending barrier.
                  Built for a future where every dollar counts and every impulse
                  is checked.
                </p>
                <img src="/figma/social-icons.svg" alt="" className="h-10" />
              </div>

              <div className="space-y-6">
                <div className="text-sm font-bold text-[#F1F5F9]">Product</div>
                <ul className="space-y-3 text-sm text-[#64748B]">
                  <li>Features</li>
                  <li>Pricing</li>
                  <li>Security</li>
                  <li>Roadmap</li>
                </ul>
              </div>

              <div className="space-y-6">
                <div className="text-sm font-bold text-[#F1F5F9]">Legal</div>
                <ul className="space-y-3 text-sm text-[#64748B]">
                  <li>Privacy Policy</li>
                  <li>Terms of Service</li>
                  <li>Cookie Policy</li>
                </ul>
              </div>
            </div>

            <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-[rgba(70,69,85,0.15)] pt-10 text-sm text-[#64748B] md:flex-row">
              <span>
                © {new Date().getFullYear()} Impulse Guard. All rights reserved.
              </span>
              <img
                src="/figma/footer-ornament.svg"
                alt=""
                className="h-6 opacity-70"
              />
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
