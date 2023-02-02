import { Routes, Route } from "react-router-dom";
import MainPage from "../../pages/MainPage/MainPage";
import UserProfile from "../../pages/UserProfile/UserProfile";
import NotFound from "../../pages/NotFound";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/userProfile/:id" element={<UserProfile />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
