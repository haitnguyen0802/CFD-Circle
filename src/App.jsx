import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Course from "./pages/Course";
import CourseDetail from "./pages/CourseDetail";
import CourseOrder from "./pages/CourseOrder";
import MainWrapper from "./pages/HomePage";
import ProfileStudent from "./pages/Profile";
import Payment from "./pages/Payment";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import MyInfo from "./pages/Profile/MyInfo";
import MyCourse from "./pages/Profile/MyCourse";
import MyPayment from "./pages/Profile/MyPayment";
import NotFound from "./pages/NotFound";
import PATHS from "./constants/paths";
import PrivateRoute from "./components/PrivateRoute";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATHS.HOME} element={<MainLayout />}>
          {/* HOME PAGE */}
          <Route path="/" element={<MainWrapper />} />

          {/* COURSE PAGE */}
          <Route path="/course" element={<Course />} />
          <Route path="/course/:courseSlug" element={<CourseDetail />} />
          <Route path="/course-order" element={<CourseOrder />} />

          {/* BLOG */}
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:blogId" element={<BlogDetail />} />

          {/* PROFILE */}
          {/* <Route path="/profile" element={<ProfileStudent />}>
            <Route index element={<MyInfo />} />
            <Route path={PATHS.PROFILE.MY_COURSE} element={<MyCourse />} />
            <Route path={PATHS.PROFILE.MY_PAYMENT} element={<MyPayment />} />
          </Route> */}

          <Route element={<PrivateRoute redirectPath={PATHS.HOME} />}>
            <Route path={PATHS.COURSE.ORDER} element={<CourseOrder />} />
            <Route path={PATHS.PROFILE.INDEX} element={<ProfileStudent />}>
              <Route index element={<MyInfo />} />
              <Route path={PATHS.PROFILE.MY_COURSE} element={<MyCourse />} />
              <Route path={PATHS.PROFILE.MY_PAYMENT} element={<MyPayment />} />
            </Route>
          </Route>
          {/* PAYMENT */}
          <Route path="/payment-method" element={<Payment />} />

          {/* CONTACT */}
          <Route path="/contact" element={<Contact />} />

          {/* ABOUT */}
          <Route path="/about" element={<About />} />

          {/* PRIVACY */}
          <Route path="/privacy" element={<Privacy />} />

          {/* Check + Kiểm tra Token đăng nhập, nếu không tồn tại thì cho quay lại trang đăng nhập */}
          {/* <Route element={<PrivateRoute redirectPath={PATHS.HOME} />}>
            <Route path={PATHS.COURSE.ORDER} element={<CourseOrder />} />
            <Route path={PATHS.COURSE.INDEX} element={<ProfileStudent />}>
              <Route index element={<MyInfo />} />
              <Route path={PATHS.PROFILE.MY_COURSE} element={<MyCourse />} />
              <Route path={PATHS.PROFILE.MY_PAYMENT} element={<MyPayment />} />
            </Route>
          </Route> */}
          {/* Page 404 */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
