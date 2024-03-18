import React from "react";
import CourseItem from "../../components/CourseItem";
import { useAuthContext } from "../../components/context/AuthContext";
import { CourseTypes } from "../../constants/general";

const MyCourse = () => {
  const { courseInfo } = useAuthContext();

  return (
    <div className="tab__content-item" style={{ display: "block" }}>
      <div className="courses__list">
        {!!!courseInfo.length && <p>Không có dữ liệu.</p>}
        {!!courseInfo.length &&
          courseInfo.map((item, index) => (
            <CourseItem
              key={item.id || new Date().getTime() + index}
              type={CourseTypes.Normal}
              {...item?.course}
            />
          ))}
      </div>
    </div>
  );
};

export default MyCourse;
