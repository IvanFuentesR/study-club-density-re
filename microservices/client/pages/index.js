import axios from 'axios';
import { buildClient, buildClientV2 } from '../api/build-client';

const LandingPage = ({ currentUser }) => {
  console.log(currentUser);

  return <h1>Landing Page</h1>;
};

// LandingPage.getInitialProps = async () => {
//   if (typeof window === 'undefined') {
//     // we are on the server!
//     // requests should be made to http://ingress-nginx.ingress-nginx...laksdjfk
//     const { data } = await axios.get(
//       'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
//       {
//         headers: {
//           Host: 'ticketing.dev',
//         },
//       }
//     );

//     return data;
//   } else {
//     // we are on the browser!
//     // requests can be made with a base url of ''
//     const { data } = await axios.get('/api/users/currentuser');

//     return data;
//   }
// };

// LandingPage.getInitialProps = async (context) => {
//   const client = buildClient(context);

//   const { data } = await client.get('/api/users/currentuser');

//   return data;
// };

export const getServerSideProps = async (context) => {
  const client = buildClientV2(context);

  const { data } = await client.get('/api/users/currentuser');

  return { props: data };
};

export default LandingPage;
