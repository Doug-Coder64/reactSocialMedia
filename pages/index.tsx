import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import { gql, useQuery } from "@apollo/client";
import type { Link } from "@prisma/client";

const AllLinksQuery = gql`
  query Query($first: Int, $after: ID) {
    links(first: $first, after: $after) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          Url
          altText
        }
      }
    }
  }
`;

function Home() {
  const { data, loading, error, fetchMore } = useQuery(AllLinksQuery, {
    variables: { first: 1 },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  const { endCursor, hasNextPage } = data.links.pageInfo;

  return (
    <div>
      <Head>
        <title>React Social Media</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='container mx-auto max-w-5xl my-20'>
        <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
          {data?.links.edges.map(({ node }: { node: Link }) => (
            <li key={node.id} className='shadow  max-w-md  rounded'>
              <Image
                key={node.id}
                width={100}
                height={100}
                className='shadow-sm'
                src={node.Url ? node.Url : ""}
                alt={node.altText ? node.altText : ""}
              />
              <div className='p-5 flex flex-col space-y-2'>
                <p className='text-gray-600'>{node.altText}</p>
              </div>
            </li>
          ))}
        </ul>
        {hasNextPage ? (
          <button
            className='px-4 py-2 bg-blue-500 text-white rounded my-10'
            onClick={() => {
              fetchMore({
                variables: { after: endCursor },
                updateQuery: (prevResult, { fetchMoreResult }) => {
                  fetchMoreResult.links.edges = [
                    ...prevResult.links.edges,
                    ...fetchMoreResult.links.edges,
                  ];
                  return fetchMoreResult;
                },
              });
            }}
          >
            more
          </button>
        ) : (
          <p className='my-10 text-center font-medium'>
            You&apos;ve reached the end!{" "}
          </p>
        )}
      </div>
    </div>
  );
}

export default Home;
