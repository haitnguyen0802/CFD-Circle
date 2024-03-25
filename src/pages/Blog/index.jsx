import { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import useMutation from "../../hooks/useMutation";
import useQuery from "../../hooks/useQuery";
import { blogService } from "../../services/BlogService";
import BlogList from "./BlogList";
import BlogMenu from "./BlogMenu";

const Blog = () => {
  const { data: categoryData } = useQuery(blogService.getBlogCategory);
  const [selectedCategory, setSelectedCategory] = useState("");

  const query = selectedCategory ? `?category=${selectedCategory}` : "";
  const {
    data: blogsData,
    loading: blogsLoading,
    execute: getBlogCategory,
    setData,
  } = useMutation((query) => blogService.getBlogs(query));
  const loadingDebounce = useDebounce(blogsLoading, 300);
  const blogs = blogsData?.blogs || [];
  useEffect(() => {
    getBlogCategory(query, {
      onFail: (error) => {
        console.log('error', error)
        if (error?.response?.status == 404) {
          setData([]);
        }
      },
    });
  }, [query]);

  useEffect(() => {
    getBlogCategory(query);
  }, [query]);

  return (
    <>
      <main className="mainwrapper blog --ptop">
        <div className="container">
          <div className="textbox">
            <h2 className="title --t2">Blog</h2>
          </div>
          <BlogMenu
            categories={categoryData?.blogs}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <BlogList blogs={blogs} loading={loadingDebounce} />
          <ul className="paging">
            <li>
              <a href="#">
                <i>
                  <img src="img/iconprev.svg" alt />
                </i>
              </a>
            </li>
            <li>
              <a href="#" className="active">
                1
              </a>
            </li>
            <li>
              <a href="#">2</a>
            </li>
            <li>
              <a href="#">3</a>
            </li>
            <li>
              <a href="#">4</a>
            </li>
            <li>
              <a href="#">
                <i>
                  <img src="img/iconprev.svg" alt />
                </i>
              </a>
            </li>
          </ul>
        </div>
      </main>
    </>
  );
};

export default Blog;
