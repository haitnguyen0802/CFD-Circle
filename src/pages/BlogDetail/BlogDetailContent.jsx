import { Empty } from "antd";
import React from "react";

const BlogDetailContent = ({ id, image, description, loading = true }) => {
  return (
    <>
      <div
        className={`blogdetail__content ${
          loading ? "is-loading" : "is-loaded"
        }`}
      >
        {!!image && <img src={image} alt="Post Thumbnail"></img>}
        {!!description && (
          <div
            className="blogdetail__content-entry"
            dangerouslySetInnerHTML={{ __html: description }}
          ></div>
        )}
        <div className="blogdetail__line" />
        <div className="blogdetail__content-social btngroup">
          <a href="#" className="btn btn-fb">
            <img src="/img/icon-fb-share.svg" alt />
            <span>Share</span>
          </a>
          <a href="#" className="btn btn-linkedin">
            <img src="/img/icon-in-share.svg" alt />
            <span>Share</span>
          </a>
        </div>
      </div>
      {!loading && !id && <Empty description="Không tìm thấy dữ liệu nào." />}
    </>
  );
};

export default BlogDetailContent;
