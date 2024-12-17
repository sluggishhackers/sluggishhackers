import Head from "next/head";
import Link from "next/link";

export default function SubscribePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Head>
        <title>Subscribe to Our Newsletter</title>
        <meta
          name="description"
          content="Stay updated with our latest news and articles."
        />
      </Head>
      <div className="card w-96 bg-white text-gray-800 shadow-lg">
        <div className="card-body">
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
            <button type="submit" className="btn btn-neutral w-full">
              Subscribe
            </button>
          </form>
          <p className="text-sm text-center mt-4">
            Already subscribed?{" "}
            <Link
              href="/manage-subscription"
              className="text-blue-500 underline"
            >
              Manage your subscription
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
