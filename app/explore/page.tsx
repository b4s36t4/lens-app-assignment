"use client";

import { LensProfile } from "@/components/Profile";
import {
  ProfileSortCriteria,
  useActiveProfile,
  useExploreProfiles,
} from "@lens-protocol/react-web";
import Head from "next/head";
import { useState } from "react";

const Explore = () => {
  const [observerId, setObserverId] = useState();
  const { data: wallet } = useActiveProfile();

  const { data: profiles } = useExploreProfiles({
    sortCriteria: ProfileSortCriteria.MostFollowers,
    observerId,
    limit: 25,
  });

  return (
    <>
      <Head>
        <title>Lens Explore</title>
      </Head>
      <div className="mx-[10%] mt-10">
        <h1 className="text-3xl font-bold">Explore Profiles</h1>
        <div className="flex flex-wrap justify-between">
          {!!wallet &&
            profiles &&
            profiles?.map((profile) => {
              return <LensProfile key={profile.handle} profile={profile} />;
            })}
        </div>
      </div>
    </>
  );
};

export default Explore;
