import icon from "../assets/react.svg";
const cards = [
  {
    source: icon,
    testimony:
      "Legal represented me on a very serious matter where I was looking at significant prison time. Immediately, I knew that I was in good hands.",
    name: "Mark Smith",
  },
  {
    source: icon,
    testimony:
      "Legal represented me on a very serious matter where I was looking at significant prison time. Immediately, I knew that I was in good hands.",
    name: "Mark Smith",
  },
  {
    source: icon,
    testimony:
      "Legal represented me on a very serious matter where I was looking at significant prison time. Immediately, I knew that I was in good hands.",
    name: "Mark Smith",
  },
];
const Card = ({ source, testimony, name }) => {
  return (
    <div className="grid  text-center gap-5">
      <img src={source} className="justify-self-center" />
      <p className="italic text-[0.9rem] leading-7 text-gray-400">{testimony}</p>
      <p className="font-medium">-{name}</p>
    </div>
  );
};
const Feedback = () => {
  return (
    <div className="bg-light_background grid px-5 py-16 text-center place-items-center gap-8
    lg:px-10
    ">
      <h1 className="text-3xl">Clients Feedback</h1>
      <p className="text-gray-500 text-xl">
        Lorem ipsum dolor amet, consectetur adipisice elite sede eiusmod tempor
        incidide labeore dolore magna.
      </p>
      <hr className="border-[1px] border-main w-12" />
      <div className="grid gap-12 pt-12
      md:grid-cols-3
      2xl:w-3/5
      ">
        {cards.map((card,index) => (
          <Card
            key={index}
            source={card.source}
            testimony={card.testimony}
            name={card.name}
          />
        ))}
      </div>
    </div>
  );
};

export default Feedback;
