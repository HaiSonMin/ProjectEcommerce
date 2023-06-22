import { Link } from "react-router-dom";
import PATH from "../../utils/path";

export default function Login() {
  return (
    <section className=" w-desktop">
      <div className="w-[50%] py-5 shadow-lg border rounded-lg mt-10 m-auto flex flex-wrap items-center justify-center">
        <form className="w-[70%]">
          <div className="flex flex-col items-center justify-center lg:justify-start">
            <h1 className="text-3xl font-medium">Well Comeback</h1>
            <button className="px-4 py-2 mt-7 border flex gap-2 border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150">
              <img
                className="w-6 h-6"
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                loading="lazy"
                alt="google logo"
              />
              <span>Sign in with Google</span>
            </button>
            <div className="mt-5">
              <Link
                href="#"
                className="flex items-center justify-center w-full px-4 py-2  space-x-3 text-sm text-center bg-blue-500 text-white transition-colors duration-200 transform border rounded-lg "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="bi bi-facebook w-6 h-6"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                </svg>
                <span className="text-sm text-white dark:text-gray-200">
                  Sign in with Facebook
                </span>
              </Link>
            </div>
          </div>

          <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
            <p className="mx-4 mb-0 text-center text-lg font-semibold dark:text-white">
              Or
            </p>
          </div>

          <div className="relative mb-6" data-te-input-wrapper-init>
            <input
              type="email"
              className="peer block w-full rounded-lg border-2 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
              id="emailLogin"
              required
            />
            <label
              htmlFor="emailLogin"
              className="pointer-events-none bg-white px-[4px] absolute left-4 top-3 mb-0 max-w-[90%] origin-[0_0] truncate  text-neutral-500 transition-all duration-200 ease-out peer-data-[te-input-state-active]:scale-[0.8] -translate-y-[22px] scale-[0.8]  font-semibold motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary "
            >
              Enter Email/Phone
            </label>
          </div>

          <div className="relative mb-6" data-te-input-wrapper-init>
            <input
              type="password"
              className="peer block w-full rounded-lg border-2 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
              id="passwordLogin"
              required

            />
            <label
              htmlFor="passwordLogin"
              className="pointer-events-none bg-white px-[4px] absolute left-4 top-3 mb-0 max-w-[90%] origin-[0_0] truncate  text-neutral-500 transition-all duration-200 ease-out peer-data-[te-input-state-active]:scale-[0.8] -translate-y-[22px] scale-[0.8] font-semibold motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary "
            >
              Password
            </label>
          </div>

          <div className="text-center lg:text-left">
            <button
              type="button"
              className="block w-full rounded-lg bg-primary py-2 px-4 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 "
              data-te-ripple-init
              data-te-ripple-color="light"
            >
              Login
            </button>

            <div className="flex gap-2 mt-3 ">
              <p>Don&apos;t have an account?</p>
              <Link
                to={PATH.REGISTER}
                className="text-blue-600"
              >
                Register
              </Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
