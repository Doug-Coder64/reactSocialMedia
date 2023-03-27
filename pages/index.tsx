import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import { gql, useQuery } from "@apollo/client";
import type { Link } from "@prisma/client";

const AllLinksQuery = gql`
  query {
    links {
      id
      Url
      altText
    }
  }
`;

const Home: NextPage = () => {
  const { data, loading, error } = useQuery(AllLinksQuery);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <div>
      <Head>
        <title>Awesome Links</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='container mx-auto max-w-5xl my-20'>
        <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
          {data.links.map((link: Link) => (
            <li key={link.id} className='shadow  max-w-md  rounded'>
              <img
                className='shadow-sm'
                src={
                  link.Url === null
                    ? "../../src/images/imageNotFound.png"
                    : link.Url
                }
              />
              <div className='p-5 flex flex-col space-y-2'>
                <p className='text-gray-600'>{link.altText}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
