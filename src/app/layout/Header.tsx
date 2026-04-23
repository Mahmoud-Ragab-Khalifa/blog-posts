import Link from "next/link";

const Header = () => {
  return (
    <header className="shadow-sm shadow-blue-400">
      <div className="container flex items-center justify-between gap-8 py-5">
        <Link
          href={"/"}
          className="font-bold italic hover:text-blue-500 transition-colors duration-300 text-xl"
        >
          Posts
        </Link>

        <input
          type="search"
          name="search"
          placeholder="Search By Title..."
          className="px-4 py-2 focus:outline-none ring ring-blue-400 focus:ring-2 w-full rounded-md"
        />

        <button className="button bg-blue-500 text-white">New</button>
      </div>
    </header>
  );
};

export default Header;
