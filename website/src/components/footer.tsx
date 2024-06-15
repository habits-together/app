import Link from "next/link";
import React from "react";

const links = [
  {
    name: "Owen",
    link: "https://www.linkedin.com/in/owengretzinger/",
  },
  {
    name: "Ankush",
    link: "https://www.linkedin.com/in/ankush-sarkar-a55a5b213/",
  },
  {
    name: "Michael",
    link: "https://www.linkedin.com/in/michael-zhang-baa72a221/",
  },
  {
    name: "Timmy",
    link: "https://www.linkedin.com/in/timothy-leung-002831232/",
  },
  {
    name: "Hilary",
    link: "https://www.linkedin.com/in/hilary-he-0a947322b/",
  },
  {
    name: "Geon",
    link: "https://www.linkedin.com/in/geon-youn/",
  },
  {
    name: "Eduardo",
    link: "https://www.linkedin.com/in/eduardo-salvacion-52357321b/",
  },
  {
    name: "Aaron",
    link: "https://www.linkedin.com/in/aaron-loh26/",
  },
  {
    name: "James",
    link: "https://www.linkedin.com/in/james-dias-574588239/",
  },
  {
    name: "Mina",
    link: "https://www.linkedin.com/in/mina-mankarious-4829a3221/",
  },
];

export default function Footer() {
  return (
    <footer className="mx-auto flex w-full flex-col gap-2 pb-2 text-center text-sm text-stone-500 md:absolute md:bottom-0 md:block md:py-4">
      <span>&copy; 2024 Habits Together.&nbsp;</span>
      <span>
        Being built by&nbsp;
        {links.map((link, index) => (
          <React.Fragment key={index}>
            <Link
              href={link.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-500 underline hover:text-stone-900 hover:underline md:no-underline dark:hover:text-white"
            >
              {link.name}
            </Link>
            {index < links.length - 2 && ", "}
            {index === links.length - 2 && ", and "}
          </React.Fragment>
        ))}
        .
      </span>
      <span>
        {" "}
        <Link
          href="https://github.com/owengretzinger/habits-together"
          target="_blank"
          rel="noopener noreferrer"
          className="text-stone-500 underline hover:text-stone-900 hover:underline md:no-underline dark:hover:text-white"
        >
          Code is open source on GitHub.
        </Link>
      </span>
    </footer>
  );
}
