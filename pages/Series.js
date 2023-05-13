import React from "react";
import Layout from "@/Layout/Layout";
import LightNovel from "components/Other/LightNovel";

const Series = () => {
  return (
    <Layout>
      <div className="series-container flex">
        <div className="h-full w-[30%]">
          <div>Sort</div>
        </div>
        <div className="h-full w-[70%]">
          <div>Search bar</div>
          <div>Pagination</div>
          <div className="lightnovel">
            <LightNovel
              title="Title"
              description="Description"
              volumn="Volumn"
            />
            <LightNovel
              title="Title"
              description="Description"
              volumn="Volumn"
            />
            <LightNovel
              title="Title"
              description="Description"
              volumn="Volumn"
            />
          </div>
          <div>Pagination</div>
        </div>
      </div>
    </Layout>
  );
};

export default Series;
