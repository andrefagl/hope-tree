import React from "React";
import ContactFormContext from "./ContactFormContext";

const ContactFormProvider = ({ children }) => {
    const goNext = () => {};

    return (
        <ContactFormContext.Provider value={{}}>
            children
        </ContactFormContext.Provider>
    );
};
