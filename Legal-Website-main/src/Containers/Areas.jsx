import handcuffs from "../assets/handcuffs.svg";
import real_estate from "../assets/real_estate.svg";
import family from "../assets/family.svg";
import international from "../assets/international.svg";
import financial from "../assets/financial.svg";
import technology from "../assets/technology.svg";

const items = [
  {
    source: handcuffs,
    heading: "Criminal Law",
    description:
      "Lorem ipsum dolor sit amet, conse adipise elit, sed eiusmod tempor incidide.",
  },
  {
    source: real_estate,
    heading: "Real Estate Law",
    description:
      "Lorem ipsum dolor sit amet, conse adipise elit, sed eiusmod tempor incidide.",
  },
  {
    source: family,
    heading: "Family Law",
    description:
      "Lorem ipsum dolor sit amet, conse adipise elit, sed eiusmod tempor incidide.",
  },
  {
    source: international,
    heading: "International Law",
    description:
      "Lorem ipsum dolor sit amet, conse adipise elit, sed eiusmod tempor incidide.",
  },
  {
    source: financial,
    heading: "Financial Law",
    description:
      "Lorem ipsum dolor sit amet, conse adipise elit, sed eiusmod tempor incidide.",
  },
  {
    source: technology,
    heading: "Technology Law",
    description:
      "Lorem ipsum dolor sit amet, conse adipise elit, sed eiusmod tempor incidide.",
  },
];
const Item = ({ source, heading, description }) => {
  return (
    <div className="grid grid-cols-[4rem_auto] grid-rows-[1fr_2fr] gap-2  text-left pr-2">
      <img src={source} className="col-start-1 col-end-2 row-start-1 row-end-3 w-12" />
      <h2 className="col-start-2 col-end-3 row-start-1 row-end-2 justify-self-start text-lg " >{heading}</h2>
      <p className="col-start-2 col-end-3 row-start-2 row-end-3 justify-self-start text-sm text-gray-500" >{description}</p>
    </div>
  );
};
const Areas = () => {
  return (
    <div className="px-5 py-16 grid  text-center gap-8
    lg:px-10
     2xl:w-3/5 2xl:justify-self-center
    ">
      <h1 className="text-3xl">Practice Areas</h1>
      <p className="text-gray-500 text-xl">
        Lorem ipsum dolor amet, consectetur adipisice elite sede eiusmod tempor
        incidide labeore dolore magna.
      </p>
      <hr className="border-[1px] border-main w-12 justify-self-center" />
      <div className=" grid gap-12 py-10 
      lg:grid-cols-3
  
      ">
        {items.map((item) => (
          <Item
            source={item.source}
            description={item.description}
            heading={item.heading}
            key={item.heading}
          />
        ))}
      </div>
    </div>
  );
};

export default Areas;
