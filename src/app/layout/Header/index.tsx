import Link from "next/link";
import SearchInput from "./SearchInput";

const Header = () => {
  return (
    <header className="shadow-sm shadow-blue-200">
      <div className="container flex items-center justify-between gap-8 py-5">
        <Link
          href={"/"}
          className="font-bold italic hover:text-blue-500 transition-colors duration-300 text-xl"
        >
          Posts
        </Link>

        <SearchInput />

        <button className="button bg-blue-500 text-white">New</button>
      </div>
    </header>
  );
};

export default Header;
