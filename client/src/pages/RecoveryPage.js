import RecoveryForm from "../components/RecoveryForm";



const RecoveryPage = () => {
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
          Recovery
        </a>
        <RecoveryForm />
      </div>
    </section>
  );
};

export default RecoveryPage;
