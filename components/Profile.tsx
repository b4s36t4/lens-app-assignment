/* eslint-disable @next/next/no-img-element */
import { getImageURL } from "@/lib/utils";
import {
  Profile,
  useActiveProfile,
  useFollow,
  useUnfollow,
} from "@lens-protocol/react-web";
import { Button } from "./ui/button";

export const LensProfile = ({ profile }: { profile: Profile }) => {
  const isFollowing = profile.isFollowedByMe;

  const { data: myProfile } = useActiveProfile();

  const { execute: follow } = useFollow({
    follower: myProfile!,
    followee: profile,
  });

  const { execute: unfollow } = useUnfollow({
    followee: profile,
    follower: myProfile!,
  });

  const isFollowLoading = !isFollowing && !profile.followStatus?.canFollow;
  const isUnfollowLoading = isFollowing && !profile.followStatus?.canUnfollow;
  const isLoading = isFollowLoading || isUnfollowLoading;

  const onFollow = async () => {
    if (!profile.followStatus?.canFollow) {
      alert("You're already following");
      return;
    }
    await follow();
  };

  const onUnFollow = async () => {
    console.log(profile, "prolfile");
    if (!profile.followStatus?.canUnfollow) return;
    await unfollow();
  };

  return (
    <div className="cursor-pointer flex flex-col items-start border-[1px] border-white p-2 mb-4 mr-2">
      <img
        src={getImageURL(profile.coverPicture?.original?.url)}
        className="bg-no-repeat bg-cover w-[400px] h-64"
        alt={`${profile.handle}'s Pic`}
      />
      <div className="flex justify-between mt-2 w-full items-center">
        <p className="font-bold text-xl mt-1">{profile.handle}</p>
        <Button
          disabled={isLoading}
          onClick={isFollowing ? onUnFollow : onFollow}
        >
          {isLoading ? "..." : isFollowing ? "UnFollow" : "Follow"}
        </Button>
      </div>
    </div>
  );
};
