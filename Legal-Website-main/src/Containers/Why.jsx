import why from "../assets/bg-1.jpg";
import scales from "../assets/scales.svg";
import lawyers from "../assets/lawyers.svg";
import cases from "../assets/cases.svg";
import experts from "../assets/experts.svg";
const items = [
  {
    source: scales,
    heading: "Exclusively Areas",
    description:
      "Lorem ipsum dolor sit amet, conse adipise elit, sed eiusmod tempor incidide.",
  },
  {
    source: lawyers,
    heading: "Group of Lawyers",
    description:
      "Lorem ipsum dolor sit amet, conse adipise elit, sed eiusmod tempor incidide.",
  },
  {
    source: cases,
    heading: "Case Results",
    description:
      "Lorem ipsum dolor sit amet, conse adipise elit, sed eiusmod tempor incidide.",
  },
  {
    source: experts,
    heading: "Experts In Law",
    description:
      "Lorem ipsum dolor sit amet, conse adipise elit, sed eiusmod tempor incidide.",
  },
];

const Item = ({ source, heading, description }) => {
  return (
    <div className="grid grid-flow-row gap-4">
      <img className="col-start-1 col-end-2 w-12 mt-2" src={source} />
      <div className="grid text-start gap-2">
        <h2 className="text-lg">{heading}</h2>
        <p className="text-gray-500 text-[0.9rem]">{description}</p>
      </div>
    </div>
  );
};
const Why = () => {
  return (
    <div className="grid grid-cols-1 grid-rows-2
    lg:grid-cols-[2fr_3fr] lg:grid-rows-1
    ">
      <img src={why} className="object-cover h-full" />
      <div className="p-12 grid gap-8
        md:p-24
      ">
        <h1 className="text-4xl">Why Hire Us?</h1>
        <p className="text-gray-400 text-lg">
          Lorem ipsum dolor amet, consectetur adipisice elite sede eiusmod
          tempor incidide labeore dolore magna.
        </p>
        <hr className="w-12 justify-self-start border-main" />
        <div className="grid gap-8
        md:grid-cols-2 md:gap-16 md:py-10
        ">
          {items.map((item) => (
            <Item
              key={item.heading}
              source={item.source}
              heading={item.heading}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Why;
