import EmailSignupButton from "@/components/emailSignupButton";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Image from "next/image";

export default function Home() {
  return (
    <main className="max-w-screen relative flex w-screen flex-col overflow-hidden bg-white md:h-screen md:max-h-screen md:flex-row dark:bg-stone-900">
      <Header />
      <div className="mb-16 mt-4 flex h-full w-full flex-col-reverse items-center justify-center md:mb-0 md:mt-0 md:flex-row lg:gap-20">
        <div className="z-10 flex w-[600px] flex-col items-center gap-4 md:gap-10">
          <span className="text-center text-4xl font-bold text-stone-900 md:text-6xl dark:text-white">
            Habits are hard.
          </span>
          <span className="inline-block w-screen max-w-[400px] overflow-auto px-1 text-center text-lg font-normal text-stone-900 md:inline md:w-auto md:max-w-full md:text-xl dark:text-white">
            Habits Together is the perfect app to help you and your friends stay
            accountable and motivated to reach your goals.
          </span>
          <div className="flex w-min flex-col items-center gap-2.5">
            <EmailSignupButton />
          </div>
        </div>
        <div className="relative -mb-4 flex w-64 items-center md:h-screen md:w-auto">
          <Image
            src="/phone-mockup-light.png"
            width={400}
            height={800}
            alt="Phone mockup"
            className="dark:hidden"
            priority
          />
          <Image
            src="/phone-mockup-dark.png"
            width={400}
            height={800}
            alt="Phone mockup"
            className="hidden dark:block"
            priority
          />
          <div className="absolute h-full w-full bg-gradient-to-t from-white via-transparent to-transparent dark:from-stone-900"></div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
