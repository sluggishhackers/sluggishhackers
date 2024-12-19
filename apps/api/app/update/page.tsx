"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Head from "next/head";

export default function NewsletterPage() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState([
    "Tech News",
    "Health Tips",
  ]);

  const handleUnsubscribe = () => {
    setIsSubscribed(false);
    setSelectedTopics([]);
  };

  const handleUpdate = (topic: any) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Head>
        <title>
          {isSubscribed
            ? "Manage Your Subscription"
            : "Subscribe to Our Newsletter"}
        </title>
        <meta
          name="description"
          content="Stay updated with our latest news and articles."
        />
      </Head>
      <div className="card w-96 bg-white text-gray-800 shadow-lg">
        <div className="card-body">
          {isSubscribed ? (
            <>
              <h2 className="card-title text-center">
                Manage Your Subscription
              </h2>
              <p className="text-center">Your current preferences:</p>
              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Selected Topics:</span>
                </label>
                <div className="space-y-2">
                  {[
                    "Tech News",
                    "Health Tips",
                    "Daily Inspiration",
                    "Travel Updates",
                  ].map((topic) => (
                    <label className="flex items-center space-x-2" key={topic}>
                      <input
                        type="checkbox"
                        className="checkbox"
                        checked={selectedTopics.includes(topic)}
                        onChange={() => handleUpdate(topic)}
                      />
                      <span>{topic}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <button
                  onClick={handleUnsubscribe}
                  className="btn btn-error w-full"
                >
                  Unsubscribe
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="card-title text-center">
                Subscribe to our Newsletter
              </h2>
              <p className="text-center">
                Stay updated with our latest news and offers!
              </p>
              <form className="mt-4 space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email Address</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="input input-bordered w-full bg-gray-50 text-gray-800"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Select your interests</span>
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="checkbox" />
                      <span>Tech News</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="checkbox" />
                      <span>Health Tips</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="checkbox" />
                      <span>Daily Inspiration</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="checkbox" />
                      <span>Travel Updates</span>
                    </label>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsSubscribed(true)}
                  className="btn btn-neutral w-full"
                >
                  Subscribe
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
