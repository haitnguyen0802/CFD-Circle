import React from "react";
import CourseItem from "../../components/CourseItem";
import { useAuthContext } from "../../components/context/AuthContext";
import { CourseTypes } from "../../constants/general";
import { Empty } from "antd";

const MyCourse = () => {
  const { courseInfo } = useAuthContext();

  return (
    <div className="tab__content-item" style={{ display: "block" }}>
      <div className="courses__list">
        {!!!courseInfo.length ? (
          <Empty
            description="Không tìm thấy dữ liệu nào"
            style={{ margin: "0 auto" }}
          />
        ) : (
          ""
        )}
        {!!courseInfo.length ? (
          courseInfo.map((item, index) => (
            <CourseItem
              key={item.id || new Date().getTime() + index}
              type={CourseTypes.Normal}
              {...item?.course}
            />
          ))
        ) : (
          <Empty
            description="Không tìm thấy dữ liệu nào"
            style={{ margin: "0 auto" }}
          />
        )}
      </div>
    </div>
  );
};

export default MyCourse;
