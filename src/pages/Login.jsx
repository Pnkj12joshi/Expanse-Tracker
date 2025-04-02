import React, { useState } from "react";
import { db, auth } from "../Config/FireBase.js"; // Import Firestore instance
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {useNavigate} from "react-router-dom";

const Login = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [Confirmpassword, setConfirmpassword] = useState("");
  const [login, setlogin] = useState(false);
  const navigate = useNavigate("");


  // this for Signup 
const HandlleSignup = async () => {
    try {
      const userCredentail = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentail.user;

      console.log("User Created:", user);

      //store userdata in firebase
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
      });
      console.log("Signup Succesfully");
      localStorage.setItem("Email",email);
      setname("");
      setpassword("");
      setemail("");
      setConfirmpassword("");
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };


  // this is for Login 

  const HandleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Login Succesfully");
      localStorage.setItem("Email",email);
      setemail("");
      setpassword("");
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="w-screen flex justify-center items-center mt-5">
        <div className="w-[677px] h-[576px] bg-white shadow-lg  px-8 py-6">
          <div className="w-full text-center mt-6">
            <h1 className="font-montserrat text-[26px]">
              Sign Up On <span className="text-blue-500">Financely</span>
            </h1>
          </div>
          <div className="flex flex-col mt-5">
            <form action="" className="w-full">
              {!login ? (
                <div className="mb-4">
                  <label
                    htmlFor="Full Name"
                    className="block text-gray-600 font-medium"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full border-b-2 border-gray-300 outline-none py-2"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                  />
                </div>
              ) : (
                <></>
              )}
              <div className="mb-4">
                <label
                  htmlFor="Email"
                  className="block text-gray-600 font-medium"
                >
                  Email
                </label>
                <input
                  type="text"
                  placeholder="JohnDoe@gmail.com"
                  className="w-full border-b-2 border-gray-300 outline-none py-2"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="Password"
                  className="block text-gray-600 font-medium"
                >
                  Password
                </label>
                <input
                  type="password"
                  placeholder=".............."
                  className="w-full border-b-2 border-gray-300 outline-none py-2"
                  onChange={(e) => setpassword(e.target.value)}
                  value={password}
                />
              </div>

              {!login ? (
                <div className="mb-4">
                  <label
                    htmlFor="ConfirmPassword"
                    className="block text-gray-600 font-medium"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    placeholder=".........."
                    className="w-full border-b-2 border-gray-300 outline-none py-2"
                    value={Confirmpassword}
                    onChange={(e) => setConfirmpassword(e.target.value)}
                  />
                </div>
              ) : (
                <></>
              )}
            </form>
          </div>
          <button
            className="text-center w-full roundec-xl bg-blue-400 text-white py-2 px-4 mt-5"
            onClick={() => {
              if (login) {
                HandleLogin();
              } else {
                if (password === Confirmpassword) {
                  HandlleSignup();
                } else {
                  alert("Passwords do not match!");
                }
              }
            }}
          >
            {" "}
            {login ? "Login" : "Signup"}
          </button>
          <div className="w-full mt-5 flex gap-2 justify-center items-center">
            <p
              onClick={() => setlogin(true)}
              className="text-blue-400 cursor-pointer"
            >
              {" "}
              login{" "}
            </p>
            <p onClick={() => setlogin(false)} className=" cursor-pointer">
              {" "}
              goBack
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
