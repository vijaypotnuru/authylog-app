import LoginForm from "../components/LoginForm";
import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decodedToken = jwt_decode(token);

          const currentTime = Date.now() / 1000;
          if (decodedToken.exp < currentTime) {
            localStorage.removeItem("token");
          } else {
            navigate(`/profile/${decodedToken.username}`, { replace: true });
          }
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      }
    };

    checkToken();
  }, [navigate]);

  return (
    <section className="bg-gray-50 dark:bg-gray-900 h-screen ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          Welcome
        </a>
        <LoginForm />
      </div>
    </section>
  );
};

export default LoginPage;
