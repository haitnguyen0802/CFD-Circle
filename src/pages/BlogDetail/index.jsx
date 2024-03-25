import { useParams } from "react-router-dom";
import useMutation from "../../hooks/useMutation";
import { blogService } from "../../services/BlogService";
import useDebounce from "../../hooks/useDebounce";
import BlogDetailTitle from "./BlogDetailTitle";
import BlogDetailContent from "./BlogDetailContent";
import BlogDetailRelated from "./BlogDetailRelated";

const BlogDetail = () => {
  const { blogSlug } = useParams();

  const {
    data: blogDetail,
    loading: blogDetailLoading,
    execute: getBlogDetail,
  } = useMutation(() => blogService.getBlogsBySlug);

  useEffect(() => {
    !!blogSlug && getBlogDetail(blogSlug);
  }, [blogSlug]);

  const {
    data: blogsRelated,
    loading: blogsRelatedLoading,
    execute: getBlogsRelated,
  } = useMutation((query) => blogService.getBlogs(query));

  const blogProps = blogDetail || {};
  const categoryId = blogProps?.category?.id;
  const query = categoryId ? `?limit=3&category=${categoryId}` : "?limit=3";

  const loadingApi = blogDetailLoading || blogsRelatedLoading;
  const loadingPage = useDebounce(loadingApi, 300);

  useEffect(() => {
    if (query) {
      getBlogsRelated(query);
    }
  }, [query]);

  return (
    <>
      <main className="mainwrapper blogdetail --ptop">
        <div className="container">
          <div className="wrapper">
            <BlogDetailTitle {...blogProps} />
            <BlogDetailContent {...blogProps} loading={loadingPage} />
          </div>
          {query && (
            <BlogDetailRelated
              blogs={blogsRelated?.blogs}
              loading={loadingPage}
            />
          )}
        </div>
      </main>
    </>
  );
};

export default BlogDetail;
