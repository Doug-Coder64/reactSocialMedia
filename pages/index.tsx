import Image from "next/image";
import styles from "../styles/Home.module.scss";
import { gql, useQuery } from "@apollo/client";
import type { Link } from "@prisma/client";
import { Main } from "next/document";
import Head from "next/head";

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
    <main className='content-wrapper'>
      <Head>
        <title>React Social Media</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='content w-full'>
        <div className='feed-container'>
          <div className='feed-wrapper'>
            <div className='feed'>
              <div className='feed-heading'>
                <h2>Home</h2>
              </div>
              <ul>
                {data?.links.edges.map(({ node }: { node: Link }) => (
                  <li key={node.id} className='shadow max-w-md rounded'>
                    <Image
                      key={node.id}
                      width={100}
                      height={100}
                      className='shadow-sm'
                      src={node.Url ? node.Url : ""}
                      alt={node.altText ? node.altText : ""}
                    />
                    <div className='p-5 flex flex-col space-y-2'>
                      <p className=''>{node.altText}</p>
                    </div>
                  </li>
                ))}
              </ul>
              {hasNextPage ? (
                <button
                  className='px-4 py-2 rounded'
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
          <div></div>
        </div>
      </div>
    </main>
  );
}

export default Home;
