import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ComponentLoading from "../../components/ComponentLoading";
import { ROLES } from "../../constants/roles";
import useDebounce from "../../hooks/useDebounce";
import useMutation from "../../hooks/useMutation";
import useQuery from "../../hooks/useQuery";
import { courseService } from "../../services/CourseService";
import { questionService } from "../../services/QuestionService";
import { formatCurrency, formatDate } from "../../utils/format";
import FaqSection from "../HomePage/FaqSection";
import ContentDetailSection from "./ContentDetailSection";
import CoursesSection from "./CourseSection";
import FeaturedSection from "./FeaturedSection";
import HeaderTop from "./HeaderTop";
import HeroSection from "./HeroSection";

const CourseDetail = () => {
  const params = useParams();
  const { courseSlug } = params;
  const { data: questionData, loading: questionLoading } = useQuery(
    questionService.getQuestions
  );
  const { data: courseData, loading: courseLoading } = useQuery(
    courseService.getCourses
  );
  const {
    data: courseDetailData,
    loading: courseDetailLoading,
    execute,
  } = useMutation(courseService.getCourseBySlug);
  console.log('courseDetailData', courseDetailData)
  useEffect(() => {
    if (courseSlug) execute(courseSlug || "", {});
  }, [courseSlug]);

  const questions = questionData?.questions || [];
  const courses = courseData?.courses || [];
  const orderLink = `/course-order/` + courseSlug;

  const { teams, startDate, price } = courseDetailData || {};
  const modifiedProps = {
    ...courseDetailData,
    teacherInfo: teams?.find((item) => item.tags.includes(ROLES.Teacher)),
    startDate: formatDate(startDate || ""),
    price: formatCurrency(price),
    orderLink,
  };

  const apiLoading = courseDetailLoading || questionLoading || courseLoading;

  const pageLoading = useDebounce(apiLoading, 500);

  if (pageLoading) {
    return (
      <div id={"thai-" + new Date().getTime()}>
        <ComponentLoading />
      </div>
    );
  }
  return (
    <div id={"course-detail" + new Date().getTime()}>
      <HeaderTop {...modifiedProps} />
      <main className="mainwrapper coursedetailpage">
        <HeroSection {...modifiedProps} />
        <ContentDetailSection {...modifiedProps} />
        <FeaturedSection {...modifiedProps} />
        <FaqSection questions={questions} loading={questionLoading} />
        <CoursesSection
          courses={courses}
          loading={courseLoading}
          courseDetailId={courseDetailData?.id}
        />
      </main>
    </div>
  );
};

export default CourseDetail;
