import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../Firebase";
import { Link, useNavigate } from "react-router-dom";
// Component inspired by github.com/zavalit/bayer-dithering-webgl-demo

// import PixelBlast from '../components/ui/PixelBlast';



const Newuser = () => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [pincode, setPincode] = useState("");
  const [districts, setDistricts] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();

  // 🔹 Sample states (can be replaced with API)
  const states = ["Uttar Pradesh", "Delhi", "Maharashtra", "Karnataka", "Bihar"];

  useEffect(() => {
    if (state) {
      if (state === "Uttar Pradesh") {
        setDistricts(["Noida", "Lucknow", "Varanasi"]);
      } else if (state === "Delhi") {
        setDistricts(["New Delhi", "North Delhi", "South Delhi"]);
      } else if (state === "Maharashtra") {
        setDistricts(["Mumbai", "Pune", "Nagpur"]);
      } else {
        setDistricts([]);
      }
    }
  }, [state]);

  useEffect(() => {
    if (district) {
      fetch(`https://api.postalpincode.in/postoffice/${district}`)
        .then((res) => res.json())
        .then((data) => {
          if (data[0]?.PostOffice) {
            setPincode(data[0].PostOffice[0].Pincode);
          } else {
            setPincode("");
          }
        })
        .catch(() => setPincode(""));
    }
  }, [district]);

  const HandleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("SignUp Done");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const HandleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Google Sign In Success:", result.user);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* <div className="fixed to-0% w-[100%] h-[100%] z-50 ">
        <PixelBlast
          variant="circle"
          pixelSize={6}
          color="#B19EEF"
          patternScale={3}
          patternDensity={1.2}
          pixelSizeJitter={0.5}
          enableRipples
          rippleSpeed={0.4}
          rippleThickness={0.12}
          rippleIntensityScale={1.5}
          liquid
          liquidStrength={0.12}
          liquidRadius={1.2}
          liquidWobbleSpeed={5}
          speed={0.6}
          edgeFade={0.25}
          transparent
        />
      </div> */}
      <div className="flex items-center justify-center min-h-screen relative backdrop-blur-lg z-30">
        <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl w-full max-w-lg p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Create Account</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Join Saarthi to access mental health support
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={HandleSignUp}>
            {/* Personal Info */}
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              />
              <select
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="">Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            {/* Location */}
            <div className="grid grid-cols-2 gap-4">
              <select
                onChange={(e) => setState(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="">Select State</option>
                {states.map((st, idx) => (
                  <option key={idx} value={st}>
                    {st}
                  </option>
                ))}
              </select>

              <select
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="">Select District</option>
                {districts.map((dist, idx) => (
                  <option key={idx} value={dist}>
                    {dist}
                  </option>
                ))}
              </select>
            </div>

            <input
              type="text"
              value={pincode}
              readOnly
              placeholder="Pincode"
              className="w-full px-3 py-2 border rounded-lg bg-gray-100"
            />

            {/* Account */}
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />

            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Create Account
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-300 dark:border-gray-600" />
            <span className="px-2 text-sm text-gray-500 dark:text-gray-400">OR CONTINUE WITH</span>
            <hr className="flex-grow border-gray-300 dark:border-gray-600" />
          </div>

          {/* Google Sign In */}
          <button
            onClick={HandleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 border py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Newuser;
