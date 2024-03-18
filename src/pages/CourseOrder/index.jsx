import { message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button";
import { useAuthContext } from "../../components/context/AuthContext";
import { courseTagOptions } from "../../constants/general";
import PATHS from "../../constants/paths";
import { ROLES } from "../../constants/roles";
import useMutation from "../../hooks/useMutation";
import { courseService } from "../../services/CourseService";
import { orderService } from "../../services/OrderService";
import { formatCurrency } from "../../utils/format";
import FormOrder from "./FormOrder";
import InfoOrder from "./InfoOrder";
import PaymentOrder from "./PaymentOrder";

const CourseOrder = () => {
  const { courseSlug } = useParams();
  const navigate = useNavigate();

  //Hanle payment Method change
  const [paymentMethod, setPaymentMethod] = useState("");
  const handlePaymentMethodChange = (payment) => {
    setPaymentMethod(payment);
  };
  const { data: courseDetailData, execute: executeCourseDetail } = useMutation(
    courseService.getCourseBySlug
  );

  const {
    profile,
    courseInfo,
    handleGetProfileCourse,
    handleGetProfilePayment,
  } = useAuthContext();

  const { loading: orderLoading, execute: orderCourse } = useMutation(
    orderService.orderCourse
  );

  const alreadyOrderInfo = courseInfo?.find(
    (item) => item?.course?.slug === courseSlug
  );

  const isAlreadyOrder = !!alreadyOrderInfo;

  useEffect(() => {
    setPaymentMethod(alreadyOrderInfo?.paymentMethod || "");
    setForm((prev) => ({
      ...prev,
      type: alreadyOrderInfo?.type || "",
    }));
  }, [alreadyOrderInfo]);
  console.log('alreadyOrderInfo', alreadyOrderInfo)
  const _onOrder = () => {
    event.preventDefault();

    //start validate OrderForm
    const errorObject = {};

    if (!!!form.name) {
      errorObject.name = "Vui lòng nhập tên";
    }

    if (!!!form.email) {
      errorObject.email = "Vui lòng nhập email";
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) {
      errorObject.email = "Vui lòng nhập đúng định dạng email";
    }

    if (!!!form.phone) {
      errorObject.phone = "Vui lòng nhập phone";
    } else if (!/(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(form.phone)) {
      errorObject.phone = "Vui lòng nhập đúng định dạng phone";
    }

    if (!!!form.type) {
      errorObject.type = "Vui lòng chọn phương thức học";
    }

    setError(errorObject);
    //end validate

    if (Object.keys(errorObject).length > 0) {
      console.log("Profile form validate failed", errorObject);
    } else {
      if (paymentMethod) {
        //setup payload
        const payload = {
          name: form?.name,
          phone: form?.phone,
          course: courseDetailData?.id,
          type: form?.type,
          paymentMethod,
        };

        //Call API order
        orderCourse(payload, {
          onSuccess: async () => {
            message.success("Đăng ký thành công!");
            await handleGetProfileCourse();
            await handleGetProfilePayment();
            navigate(PATHS.PROFILE.MY_COURSE);
          },
          onFail: () => {
            message.error("Đăng ký thất bại!");
          },
        });
      } else {
        message.error("Vui lòng chọn hình thức thanh toán");
      }
    }
  };
  const {
    firstName: profileName,
    email: profileEmail,
    phone: profilePhone,
    type: profileType,
  } = profile || {};

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    type: "",
  });

  const [error, setError] = useState({});

  useEffect(() => {
    setForm({
      name: profileName,
      email: profileEmail,
      phone: profilePhone,
      type: profileType,
    });
  }, [profileName, profileEmail, profilePhone, profileType]);

  useEffect(() => {
    if (courseSlug) executeCourseDetail(courseSlug, {});
  }, [courseSlug]);

  //Modify render data
  const { teams, price, tags } = courseDetailData || {};

  //Chile props
  const register = (registerField) => {
    return {
      name: registerField,
      error: error[registerField],
      value: form[registerField],
      onChange: (e) => setForm({ ...form, [registerField]: e.target.value }),
    };
  };

  const InfoOrderProps = {
    ...courseDetailData,
    teacherInfo: teams?.find((item) => item.tags.includes(ROLES.Teacher)) || {},
    price: formatCurrency(price),
  };
  return (
    <>
      <main className="mainwrapper --ptop">
        <section className="sccourseorder">
          <div className="container small">
            <InfoOrder {...InfoOrderProps} />
            {/* addclass --processing khi bấm đăng ký */}
            <FormOrder
              register={register}
              types={courseTagOptions}
              disabled={isAlreadyOrder}
            />
            <PaymentOrder
              handleChange={handlePaymentMethodChange}
              selectedPayment={paymentMethod}
              disabled={isAlreadyOrder}
            />
            <Button
              style={{ width: "100%" }}
              onClick={_onOrder}
              disabled={isAlreadyOrder}
              loading={orderLoading}
            >
              <span>{isAlreadyOrder ? "Đã đăng ký" : "Đăng ký khoá học"}</span>
            </Button>
          </div>
        </section>
      </main>
    </>
  );
};

export default CourseOrder;
