import { Empty } from "antd";
import React from "react";
import BlogItem from "./BlogItem";

const BlogList = ({ blogs, loading }) => {
  return (
    <>
      {!!blogs?.length && (
        <>
          <div className={`blog__list ${loading ? "is-loading" : "is-loaded"}`}>
            {blogs.map((blog) => {
              return (
                <BlogItem key={blogs?.id} {...blog} />
              )
            })}
          </div>
          {loading || []}
        </>
      )}
      {!loading && !blogs?.length && (
        <Empty description="Không tìm thấy bài viết." />
      )}
    </>
  );
};

export default BlogList;
