import signature from "../assets/signature.png";
import leader from "../assets/team-4.png";
import gavel from "../assets/gavel.svg";
import book from "../assets/book.svg";
import scales from "../assets/scales.svg";
import medal from "../assets/medal.svg";
const items = [
  {
    source: gavel,
    number: 2,
    description: "Cases Won",
  },
  {
    source: book,
    number: 0,
    description: "Skilled Lawyers",
  },
  {
    source: scales,
    number: 4,
    description: "Happy Clients",
  },
  {
    source: medal,
    number: 0,
    description: "Great Rewards",
  },
];

const Item = (props) => {
  const { source, number, description } = props;
  return (
    <div className="
    grid w-full grid-cols-[1fr_2fr] grid-rows-2 gap-x-2 gap-y-0
    md:gap-x-0
    lg:gap-x-2
    ">
      <img
        src={source}
        alt={description}
        className="col-start-1 col-end-2 row-span-2 w-14 justify-self-center place-self-center
        "
      />
      <h3 className="col-start-2 col-end-3 text-3xl font-bold">{number}</h3>
      <p className="col-start-2 col-end-3 text-sm self-center italic text-gray-500">{description}</p>
    </div>
  );
};
const About = () => {
  return (
    <div className="bg-light_background py-16 px-5 grid gap-16 relative 
    lg:grid-cols-2
    ">
      <div
        className="bg-white 
      px-12 py-16 grid gap-4 rounded-lg
      md:absolute md:grid-cols-2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[95%]  md:gap-x-24 
      lg:grid-cols-4
      2xl:w-fit
      "
      >
        {items.map((item, index) => (
          <Item
            key={index}
            source={item.source}
            number={item.number}
            description={item.description}
          />
        ))}
      </div>
      <div className="
      pt-16 m-auto
      md:pt-48
      2xl:  w-full grid
      ">
        <img className="2xl:justify-self-end" src={leader} />
      </div>
      <div className="grid gap-8
      lg:pt-48  lg:gap-12 lg:place-content-center
      2xl:justify-items-start 2xl:w-2/5
      ">
        <h1 className="text-2xl lg:text-3xl">About Our Firm</h1>
        <hr className="border-[1px] border-main w-12"  />
        <p className="text-gray-500 text-lg">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias
          temporibus ipsam eos exercitation.
          <br />
          <br />
          em repellat ab ipsum hic enim a. Harum quibusdam sed eum voluptate qui
          adipisci id, totam dolore eaque!
        </p>
        <img src={signature} />
      </div>
    </div>
  );
};

export default About;
