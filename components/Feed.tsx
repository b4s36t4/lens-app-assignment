import {
  FeedEventItemType,
  useActiveProfile,
  useFeed,
} from "@lens-protocol/react-web";
import { useState } from "react";

const Feed = () => {
  const { data: profile } = useActiveProfile();

  //   const [observerId, setObserverId] = useState();

  const { data: feed } = useFeed({
    profileId: profile?.id!,
    limit: 10,
    observerId: profile?.id,
    restrictEventTypesTo: [FeedEventItemType.Post],
  });

  const onLoadMore = () => {
    if (!feed) return;
    const lastFeed = feed[feed?.length - 1];
    // setObserverId(lastFeed.root.id);
  };

  return (
    <div>
      {feed &&
        feed.map((post) => {
          return (
            <div
              key={post.root.id}
              className="mb-4 border-2 px-4 py-4 rounded-lg"
            >
              <p>{post.root.metadata.content}</p>
              <span>
                Posted By: <b>{post.root.profile.name}</b>
              </span>
              <div className="border-[1px] my-4" />
              <div className="flex items-center mt-1 space-x-4">
                <p>Comments: {post.root.stats.commentsCount}</p>
                <p>Reactions: {post.reactions.length}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Feed;
