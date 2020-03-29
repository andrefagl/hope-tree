import { useState, useReducer, useEffect } from "react";
import { getRandomPhoto } from "../utils/unsplash";

const steps = {
    name: 0,
    phone: 1,
    email: 2
};

const stepTypes = {
    forward: "FORWARD",
    back: "BACK"
};

const MAX_STEP = 2;
const MIN_STEP = 0;

const contactReducer = (state, action) => {
    switch (action.type) {
        case "PERFORM_STEP": {
            if (action.payload === stepTypes.forward) {
                return state.step < MAX_STEP
                    ? { ...state, step: state.step + 1 }
                    : state;
            }

            return state.step > MIN_STEP
                ? { ...state, step: state.step - 1 }
                : state;
        }
        case "SUBMIT":
            return state;

        default:
            return state;
    }
};

const Step = ({ children, isVisible }) => {
    if (!isVisible) return null;

    return children;
};

const AddContact = () => {
    const [{ step }, dispatch] = useReducer(contactReducer, {
        step: steps.name
    });

    const [backgroundPhoto, setBackgroundPhoto] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setBackgroundPhoto(getRandomPhoto());
    }, []);

    const [leaves, setLeafs] = useState([]);

    const addLeaf = () => {
        if (!name) {
            setError("Please provide a contact name");
        } else {
            setLeafs([...leaves, { name, phone, email }]);
        }
    };

    return (
        <div
            className="contact-form-wrapper py-4 flex flex-col h-full justify-center"
            style={{
                backgroundImage: `url(${backgroundPhoto})`
            }}
        >
            <div className="contact-form">
                <div>This is on step: {step + 1}</div>
                <button
                    onClick={() =>
                        dispatch({
                            type: "PERFORM_STEP",
                            payload: stepTypes.back
                        })
                    }
                >
                    prev
                </button>
                <button
                    onClick={() =>
                        dispatch({
                            type: "PERFORM_STEP",
                            payload: stepTypes.forward
                        })
                    }
                >
                    next
                </button>

                <Step isVisible={step === steps.name}>
                    <label className="block mt-4">
                        <span className="text-gray-700">Name</span>
                        <input
                            type="text"
                            className="form-input bg-transparent mt-1 block w-full border-t-0 border-r-0 border-l-0 rounded-none focus:outline-none focus:border-transparent focus:placeholder-transparent transition-all duration-200 ease-linear focus:shadow-none"
                            placeholder="Person you have been in contact"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </label>
                </Step>
                <Step isVisible={step === steps.phone}>
                    <label className="block mt-4">
                        <span className="text-gray-700">Phone</span>
                        <input
                            type="tel"
                            className="form-input bg-transparent mt-1 block w-full border-t-0 border-r-0 border-l-0 rounded-none focus:outline-none focus:border-transparent focus:placeholder-transparent transition-all duration-200 ease-linear focus:shadow-none"
                            placeholder="Person's phone number"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                        />
                    </label>
                </Step>
                <Step isVisible={step === steps.email}>
                    <label className="block mt-4">
                        <span className="text-gray-700">E-mail</span>
                        <input
                            type="email"
                            className="form-input bg-transparent mt-1 block w-full border-t-0 border-r-0 border-l-0 rounded-none focus:outline-none focus:border-transparent focus:placeholder-transparent transition-all duration-200 ease-linear focus:shadow-none"
                            placeholder="Person's e-mail"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </label>
                </Step>

                <div className="flex md:justify-end">
                    <button
                        className="w-full md:w-auto mt-4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                        onClick={addLeaf}
                    >
                        Add contact
                    </button>
                </div>

                {error && <div style={{ color: "red" }}>{error}</div>}
            </div>
        </div>
    );
};

export default AddContact;
