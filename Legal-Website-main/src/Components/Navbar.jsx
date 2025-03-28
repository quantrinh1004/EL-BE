import logo from "../assets/logo-light.png";

const NavOption = (props) => {
  return (
    <li>
      <a
        className="grid py-12 uppercase text-center hover:underline-offset-[3rem] hover:underline"
        href={props.link || "/"}
      >
        {props.title || ""}
      </a>
    </li>
  );
};
const Navbar = () => {
  return (
    <div
      className="
    grid grid-flow-col relative justify-between place-items-center
    bg-red-500
    "
    >
      <div className="grid justify-start place-items-center bg-yellow-500">
        <a href="/" className="bg-red-500 inline-block">
          <img src={logo} className="bg-purple-400 w-60" />
        </a>
      </div>
      <div className="border-2 border-main px-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-8 fill-main stroke-main "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </div>

      {/* <ul className="grid grid-flow-col text-white font-medium gap-6 lg:gap-2">
        <NavOption link="/" title="Home" />
        <NavOption link="/" title="About" />
        <NavOption link="/" title="Feature" />
        <NavOption link="/" title="Team" />
        <NavOption link="/" title="Why Us" />
        <NavOption link="/" title="Feedback" />
        <NavOption link="/" title="Free Consultation" />
        <NavOption link="/" title="Blog" />
      </ul> */}
    </div>
  );
};

export default Navbar;
