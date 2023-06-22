/* eslint-disable no-unused-vars */
import { Route, Routes } from "react-router-dom";
import { Home, Login, Public, Register } from "./pages/public";
import { Footer, Header } from "./components";
import PATH from "./utils/path";

export default function App() {
  return (
    <div className=" flex flex-col items-center">
      <Header />
      <div className="">
        <Routes>
          <Route path={PATH.PUBLIC} Component={Public}>
            <Route path={PATH.HOME} Component={Home} />
            <Route path={PATH.LOGIN} Component={Login} />
            <Route path={PATH.REGISTER} Component={Register} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
