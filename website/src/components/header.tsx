import Logo from "./logo";

export default function Header() {
  return (
    <div className="left-0 top-0 z-10 flex w-full flex-col items-center gap-4 pt-4 md:absolute md:mx-10 md:mt-10 md:flex-row md:gap-0 md:pt-0">
      <div className="flex items-center gap-2 text-3xl font-bold">
        <Logo />
        <span className="text-black dark:text-white">Habits Together</span>
      </div>

      <div className="mx-auto overflow-hidden rounded-full md:absolute md:left-1/2 md:-translate-x-1/2">
        <div className="flex items-center bg-gradient-to-r from-habitColors-orange-light to-habitColors-red-light px-8 py-4 dark:from-habitColors-orange-base/10 dark:to-habitColors-red-base/10">
          <span className="inline-block bg-gradient-to-r from-habitColors-orange-base to-habitColors-red-base bg-clip-text text-center text-xl font-bold text-transparent">
            Coming August 2024
          </span>
        </div>
      </div>
    </div>
  );
}
