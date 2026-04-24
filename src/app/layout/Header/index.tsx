import Link from "next/link";
import SearchInput from "./SearchInput";

const Header = () => {
  return (
    <header className="shadow-sm shadow-blue-200 z-50">
      <div className="container flex items-center justify-between gap-8 py-5">
        <Link
          href={"/"}
          className="font-bold italic hover:text-blue-500 transition-colors duration-300 text-xl"
        >
          Posts
        </Link>

        <SearchInput />

        <Link href={"/posts/new"} className="button bg-blue-500 text-white">
          New
        </Link>
      </div>
    </header>
  );
};

export default Header;
