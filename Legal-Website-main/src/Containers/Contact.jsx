import image from "../assets/bg-2.jpg";

const Contact = () => {
  return (
    <div className=" grid grid-cols-1 grid-rows-2
    lg:grid-cols-[3fr_2fr] lg:grid-rows-1
    ">
      <div className="p-12 grid gap-8
      md:p-24">
        <h1 className="text-3xl">Free Consultation</h1>
        <p className="text-gray-500 text-xl">
          Lorem ipsum dolor amet, consectetur adipisice elite sede eiusmod
          tempor incidide labeore dolore magna.
        </p>
        <hr className="border-[1px] border-main w-12" />
        <form className="grid gap-8 pt-10">
          <input
            type="text"
            placeholder="Your Name"
            className="bg-light_background w-full py-3 px-4 rounded-lg"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="bg-light_background w-full py-4 px-4 rounded-lg"
          />
          <select
            placeholder="Your Email"
            className="bg-light_background w-full py-4 px-4 rounded-lg"
          >
            <option value="practice_area">Practice Area</option>
            <option value="criminal_law">Criminal Law</option>
            <option value="international_law">International Law</option>
            <option value="financial_law">Financial Law</option>
          </select>
          <textarea
            placeholder="Your Message"
            className="bg-light_background w-full py-4 px-4  resize-none rounded-lg"
            rows="8"
          />
          <input
            type="submit"
            value="Send Request"
            className=" bg-main text-white py-4 rounded-lg font-semibold uppercase hover:bg-dark"
          />
        </form>
      </div>
      <div>
        <img src={image} className="object-cover h-full" />
      </div>
    </div>
  );
};

export default Contact;
