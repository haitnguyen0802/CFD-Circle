import { Navigate } from "react-router-dom";
import ContactForm from "./ContactForm";
import ContactSidebar from "./ContactSidebar";
import ContactTitle from "./ContactTitle";
import PATHS from "../../constants/paths";
import useMutation from "../../hooks/useMutation";
import { subscribesService } from "../../services/SubcribesService";

const Contact = () => {
  const {execute, data, error, loading} = useMutation(
    subscribesService.subscribes
  )
    
  const handleFormSubmit = (formData) => {
    //Call API Submit
    const payload = {
      name:formData?.name || "",
      email:formData?.email || "",
      phone:formData?.phone || "",
      title:formData?.topic || "",
      description: formData?.content || "",
    }
    execute?.(payload, {
      onSuccess: (data) => {
        console.log('data', data)
        Navigate(PATHS.HOME)
      },
      onFail: (error) => {
        console.log('error', error)
      }
    })
    console.log("formData", formData);
  };
  return (
    <>
      <main className="mainwrapper contact --ptop">
        <div className="container">
          <ContactTitle />
        </div>
        <div className="contact__content">
          <div className="container">
            <div className="wrapper">
              <ContactSidebar />
              <ContactForm handleFormSubmit={handleFormSubmit} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Contact;
