import client1 from '../assets/company1.jpg';
import client2 from '../assets/company2.jpg';
import client3 from '../assets/company3.jpg';
import client4 from '../assets/company4.jpg';
import client5 from '../assets/company5.jpg';
// 
const clients=[client1,client2,client3,client4,client5];
const Clients = () => {
  return <div className="bg-main py-16 grid grid-col-1 grid-rows-auto gap-20 
  md:grid-cols-3
  lg:grid-cols-5 lg:px-10
  2xl:
  ">
    {clients.map((client,index)=><img key={index} src={client} className='w-full'/>)}
    
  </div>;
};

export default Clients;
