import logo from "../assets/logo-light.png";
import blog1 from "../assets/blog_item_1.jpg";
import blog2 from "../assets/blog_item_2.jpg";
import blog3 from "../assets/blog_item_3.jpg";

const items = [
  {
    source: blog1,
    header: "Four ways to cheer yourself up on the Blue Monday!",
    date: "Jan 20, 2017",
    comments: "6",
  },
  {
    source: blog2,
    header: "Old cameras can capture images better than nowdays camera!",
    date: "Jan 20, 2017",
    comments: "3",
  },
  {
    source: blog3,
    header: "Four ways to cheer yourself up on the Blue Monday!",
    date: "Jan 20, 2017",
    comments: "5",
  },
];

const BlogItem = (props) => {
  const { source, header, date, comments } = props;
  return (
    <div className="grid grid-cols-[1fr_1fr_2fr] grid-rows-[2fr_1fr] gap-x-2 gap-y-0 ">
      <img
        src={source}
        className="col-start-1 col-end-2 row-start-1 row-end-3 rounded-lg "
      />
      <p className="col-start-2 col-end-4 row-start-1 row-end-2 text-[0.9rem] text-gray-400">
        {header}
      </p>
      <span className="col-start-2 col-end-3 row-start-2 row-end-3 text-[0.7rem] self-end text-gray-500">
        {date}
      </span>
      <span className="  col-start-3 col-end-4 row-start-2 row-end-3 text-[0.7rem] grid grid-flow-col self-end justify-self-start text-gray-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
          />
        </svg>
        {comments} comments
      </span>
    </div>
  );
};
const Footer = () => {
  return (
    <div className="bg-dark px-5 py-16 grid gap-10
    md:grid-cols-2
    lg:grid-cols-3 lg:px-10
    2xl:px-[32rem]
    ">
      <div className="text-gray-500 grid gap-6">
        <img src={logo} />
        <p>
          Proin gravida nibh vel velit auctor aliquet anean lorem quis. bindum
          auctor, nisi elite conset ipsums sagtis id duis sed odio sit.
        </p>
        <p>links</p>
      </div>
      <div className="grid text-white gap-8">
        <h3>Blog Posts</h3>
        <div className="grid gap-8">
          {items.map((item, index) => (
            <BlogItem
              key={index}
              source={item.source}
              header={item.header}
              date={item.date}
              comments={item.comments}
            />
          ))}
        </div>
      </div>
      <div className="text-white grid gap-8">
        <h3>Get In Touch</h3>
        <div className="grid gap-10 text-gray-400 text-[0.9rem] ">
          <div className="grid grid-flow-col  justify-start gap-4 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-5 fill-main"
            >
              <path
                fillRule="evenodd"
                d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                clipRule="evenodd"
              />
            </svg>
            <p>
              1220 Petersham town, Wardll St New South Wales Australia PA 6550.
            </p>
          </div>
          <div className="grid grid-flow-col justify-start gap-4 place-items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-5 fill-main"
            >
              <path
                fillRule="evenodd"
                d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                clipRule="evenodd"
              />
            </svg>
            <p>(04) 491 570 110</p>
          </div>
          <div className="grid grid-flow-col gap-4 place-items-center  justify-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5 stroke-main"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>
            <p>contact@zytheme.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
