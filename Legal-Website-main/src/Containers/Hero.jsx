import logo from "../assets/logo-light.png";
const NavOption = (props) => {
  return (
    <li className="grid place-content-center">
      <a
        className="grid  uppercase text-center hover:underline-offset-[3rem] hover:underline"
        href={props.link || "/"}
      >
        {props.title || ""}
      </a>
    </li>
  );
};
const Hero = () => {
  return (
    <div
      className="bg-hero bg-center bg-red-500 bg-cover
    px-5 py-6 grid grid-col-2 gap-16 bg-no-repeat
    lg:px-10
    
    "
    >
      <img src={logo} className="col-start-1 col-end-2" />
      <div
        className="grid border-[1px] w-fit justify-self-end border-main px-[0.3rem]
      lg:hidden
      "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-8  col-start-2 col-end-3 self-center stroke-main"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </div>
      <ul
        className="hidden grid-flow-col text-white font-medium gap-6 lg:gap-2 
      lg:grid
      "
      >
        <NavOption link="/" title="Home" />
        <NavOption link="/" title="About" />
        <NavOption link="/" title="Feature" />
        <NavOption link="/" title="Team" />
        <NavOption link="/" title="Why Us" />
        <NavOption link="/" title="Feedback" />
        <NavOption link="/" title="Free Consultation" />
        <NavOption link="/" title="Blog" />
      </ul>
      <div
        className="text-white col-span-2 text-center grid gap-10 place-items-center
        pt-[6rem]
        md:py-[12rem]
      "
      >
        <h1
          className="
        text-3xl
        lg:text-6xl
        "
        >
          Welcome To Legal Firm
        </h1>
        <p
          className="
        md:w-96 
        lg:text-2xl lg:w-3/4
        "
        >
          This should be used to tell a story and let your users know a little
          more about your service
        </p>
        <a
          href="/"
          className="uppercase  justify-self-center text-main border-[1px] font-semibold border-main px-10 py-4 rounded-lg hover:bg-main hover:text-white"
        >
          free consulation
        </a>
      </div>
    </div>
  );
};

export default Hero;
