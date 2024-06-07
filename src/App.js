
import { Routes, Route } from 'react-router-dom';
import Home from "./Pages/Home";
// import Header from './Component/AppBar';
// import Footer from './Component/footer';
import { useEffect } from 'react';
import PageNotFound from './Pages/PageNotFound';
import LeadershipTeamPage from './Pages/LeadershipTeamPage';
import PresidentMessagePage from './Pages/PresidentMessagePage';
import ImageGallery from './Pages/ImageGallery';
import VideoGalleryPage from './Pages/VideoGalleryPage';
import PressPhotosAndVideos from './Pages/PressPhotosAndVideosPage';
import CircularPage from './Pages/CircularPage';
import BeAMemberPage from './Pages/BeAMemberPage';
import LoginPage from './Pages/LoginPage';
import AffiliationPage from './Pages/AffiliationPage';
import BlogPage from './Pages/Blog'
import BlogDetail from './Component/BlogDetail';
import NewsAndEventPage from './Pages/NewsAndEventPage';
import NewsAndEventDetail from './Component/NewsEventDetail'
import axios from 'axios';
import { apiUrl } from './constants';
import Auth from './Authentication';
import UserPortal from './Pages/UserPortal';
import MemberListPage from './Pages/MemberListPage';
// import SelectMemberOption from './Pages/SelectMemberOption'
import ShowMembers from './Pages/ShowMembers';
import ContactUsPage from './Pages/ContactUsPage';
import MissionAndVision from './Pages/MissionAndVisionPage';
import TrainingPage from './Pages/TrainingPage';
import ForgotPasswordSendLink from './Component/ForgotPasswordSendLink';
import ForgotPasswordChangePassword from './Component/ForgotPasswordChangePassword';
import LeadershipTeamMember from './Pages/LeadershipTeamMember';
function App() {
  // const [sessionRunning, setSessionRunning] = useState(false);
  const { decoded } = Auth();
  useEffect(() => {
    const storedSessionRunning = sessionStorage.getItem("sessionIsRunning");
    // console.log("t", storedSessionRunning);
    if (!storedSessionRunning) {
      increaseVisitorCount();
      sessionStorage.setItem("sessionIsRunning", "true");
    }
  }, []);

  const increaseVisitorCount = () => {
    axios.post(`${apiUrl}/jmoa_website_visitor`)
      .then(response => {
        // console.log('Visitor count increased successfully');
      })
      .catch(error => {
        console.error('Error increasing visitor count:', error);
      });
  };


  return (
    <>

      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/leadership-team" element={<LeadershipTeamPage />} />
        <Route path="/leadership-team/:title" element={<LeadershipTeamMember />} />
        <Route path="/president's-message" element={<PresidentMessagePage />} />
        <Route path="/image-gallery" element={<ImageGallery />} />
        <Route path="/video-gallery" element={<VideoGalleryPage />} />
        <Route path="/press-photos-and-videos" element={<PressPhotosAndVideos />} />

        <Route path="/circular" element={<CircularPage />} />
        <Route path="/training" element={< TrainingPage/>} />

        <Route path="/be-a-member" element={<BeAMemberPage />} />
        <Route path="/affiliation" element={<AffiliationPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
        <Route path="/news-and-event" element={<NewsAndEventPage />} />
        <Route path="/news-and-event/:id" element={<NewsAndEventDetail />} />
        <Route path="/member-list" element={<MemberListPage />} />
        <Route path="/member-list/:district" element={<ShowMembers />} />
        {/* <Route path="/member-list/:district/:option" element={<ShowMembers />} /> */}
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="/mission-vision" element={<MissionAndVision />} />

        <Route path="/forgot-password" element={<ForgotPasswordSendLink />} />
        <Route path="/forgot-password/:token" element={<ForgotPasswordChangePassword />} />


        <Route path='*' element={<PageNotFound />} />
        {decoded?.role === "member" ? <Route path='/userPortal' element={<UserPortal />} /> : ""}
      </Routes>
      {/* <Footer /> */}
    </>)
}

export default App;