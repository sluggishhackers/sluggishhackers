import TwitterApi from "twitter-api-v2";

const post = ({ text, bearerToken }: { text: string; bearerToken: string }) => {
  const twitterClient = new TwitterApi(bearerToken);
  return twitterClient.v2.tweet(text);
};

export default { post };
