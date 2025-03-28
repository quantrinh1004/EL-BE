import image1 from "../assets/team-1.jpg";
import image2 from "../assets/team-2.jpg";
import image3 from "../assets/team-3.jpg";
const cards = [
  {
    image: image1,
    name: "Mark Smith",
    designation: "CEO $ Manager",
  },
  {
    image: image2,
    name: "Ryan Printz",
    designation: "Family Lawyer",
  },
  {
    image: image3,
    name: "Steve Martin",
    designation: "Financial Lawyer",
  },
];

const Card = ({ source, name, designation }) => {
  return (
    <div className="grid gap-6">
      <img src={source} />
      <div className="grid gap-1">
        <h2 className="text-2xl font-semibold">{name}</h2>
        <p className="text-sm italic text-gray-400">{designation}</p>
      </div>
    </div>
  );
};
const Attorneys = () => {
  return (
    <div className="bg-light_background px-5 py-16 grid place-items-center text-center gap-8
    lg:px-10
    ">
      <h1 className="text-3xl">Experted Attorneys</h1>
      <p className="text-gray-500 text-xl">
        Lorem ipsum dolor amet, consectetur adipisice elite sede eiusmod tempor
        incidide labeore dolore magna.
      </p>
      <hr className="border-[1px] border-main w-12" />
      <div  className=" grid gap-12 py-10
      md:grid-cols-3
      2xl:w-3/5
      ">
        {cards.map((card) => (
          <Card
            key={card.name}
            source={card.image}
            name={card.name}
            designation={card.designation}
          />
        ))}
      </div>
    </div>
  );
};

export default Attorneys;
