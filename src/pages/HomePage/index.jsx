import useQuery from "../../hooks/useQuery";
import { courseService } from "../../services/CourseService";
import { galleryService } from "../../services/GalleryService";
import { questionService } from "../../services/QuestionService";
import { teamService } from "../../services/TeamService";
import CallRegister from "./CallRegister";
import CourseComing from "./CourseComing";
import CourseSection from "./CourseSection";
import FaqSection from "./FaqSection";
import Featured from "./Featured";
import GallerySection from "./GallerySection";
import HeroSection from "./HeroSection";
import TeacherSection from "./TeacherSection";
import TestiMonial from "./TestiMonial";

const MainWrapper = () => {
  //Get Course
  const { data: coursesData, loading: coursesLoading } = useQuery(
    courseService.getCourses
  );
  console.log('coursesData', coursesData?.courses[0].id)
  //Modify Data
  const comingCourses =
    coursesData?.courses?.filter(
      (course) => course.startDate && new Date(course.startDate) > new Date()
    ) || [];
  //Get TEAMS
  const { data: teamsData, loading: teamsLoading } = useQuery(
    teamService.getTeams
  );
  //Get Questions
  const { data: questionData, loading: questionLoading } = useQuery(
    questionService.getQuestions
  );
  const questions = questionData?.questions || [];
  //Get GALLERIES
  const { data: galleriesData, galleriesLoading } = useQuery(
    galleryService.getGalleries
  );
  const galleries = galleriesData?.galleries?.[0]?.images || [];
  return (
    <>
      <main className="mainwrapper">
        <HeroSection />
        <CourseComing courses={comingCourses} loading={coursesLoading} />
        <CourseSection
          courses={coursesData?.courses}
          loading={coursesLoading}
        />
        <TeacherSection teachers={teamsData?.teams} loading={teamsLoading} />
        <Featured />
        {/* --------------------------------Testimonial-------------------------------- */}
        <TestiMonial />
        {/* --------------------------------faq-------------------------------- */}
        <FaqSection questions={questions} loading={questionLoading} />

        <GallerySection galleries={galleries} loading={galleriesLoading} />
        <CallRegister />
      </main>
    </>
  );
};

export default MainWrapper;
