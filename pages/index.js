import React from "react";
import Head from "next/head";
import { format, parse } from "date-fns";
const PAGE = "Home";

const Home = ({ sermons, meta }) => {
  return (
    <div className="w-full max-w-xl mx-auto">
      <Head>
        <title>Welcome to HZHG</title>
      </Head>
      <div className="container flex flex-wrap items-center w-full py-4 mx-auto border-b">
        <h1 className="w-full mb-4 text-3xl text-center">Welcome to HZHG!</h1>
        <h2 className="w-full mb-4 text-center">
          Meeting Time: {meta[0].meetingTime}
        </h2>
        <a
          className="px-4 py-2 mx-auto text-xl text-white bg-gray-900 rounded-lg"
          href="https://hegau.church/hzhg"
        >
          Join the Service
        </a>
      </div>
      <div className="py-4">
        {sermons.map((sermon, key) => {
          return (
            <div
              className={`px-6 py-4 border-b ${
                key === 0 ? "" : "text-gray-600"
              }`}
              key={key}
            >
              <p className="mb-6 font-bold text-md">
                {format(
                  parse(sermon.date, "yyyy-MM-dd", new Date()),
                  "EEEE dd/MM/yy"
                )}
              </p>
              <section className="block mb-6">
                <h1 className="mb-2 text-md">Main Message</h1>
                {sermon.message ? (
                  sermon.message.link ? (
                    <a className="block p-8 border" href={sermon.message.link}>
                      {sermon.title}
                    </a>
                  ) : (
                    <a
                      className="block p-8 border"
                      href={sermon.message.file.url}
                    >
                      {sermon.title}
                    </a>
                  )
                ) : (
                  <p>{sermon.title}</p>
                )}
              </section>
              {key === 0 && (
                <section className="block mb-6">
                  <h1 className="mb-2 text-md">Let's Pray for</h1>
                  <ul className="mx-6">
                    {[
                      "Our families that we stay healthy.",
                      "Our testimony that others see our hope.",
                      "Our love for those who need hope.",
                      "Our elderly and at risk.",
                      "Our leaders as they guide our country.",
                    ].map((pr, key) => (
                      <li key={key}>{pr}</li>
                    ))}
                  </ul>
                </section>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export async function getStaticProps(context) {
  require("isomorphic-fetch");
  const response = await fetch(process.env.GCMS_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GCMS_PROD}`,
    },
    body: JSON.stringify({
      query: `{
          meta: metas(first: 1) {
            meetingTime
          }
          sermons(orderBy:date_DESC) {
            title
            message {
              ... on LinkedMessage {
                link: message
              }
              ... on UploadedMessage {
                file: message {
                  url
                }
              }
            }
            preacher {
              name
            }
            date
          }
        }`,
    }),
  });

  let errors = [];

  if (response.status >= 400) {
    errors.push({ message: "Something went wrong" });
  }

  const {
    data: { sermons, meta },
  } = await response.json();

  return {
    props: { sermons, meta, errors }, // will be passed to the page component as props
  };
}

export default Home;
