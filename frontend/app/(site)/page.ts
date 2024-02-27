import { redirect } from 'next/navigation';

const Home = async () => {
  redirect('/schedules');
};

export default Home;
