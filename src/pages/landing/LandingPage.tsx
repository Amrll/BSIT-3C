import { Link, useNavigate } from "react-router";
import Button from "../../components/Button";

function LandingPage() {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="">
      <h1 className="text-2xl font-bold text-blue-500">
        This is the Landing Page
      </h1>

      <Link to="/login">Go to Login</Link>

      <Button label="Go to Login" onClick={navigateToLogin} />
      <Button label="Go to Login" onClick={navigateToLogin} />
      <Button label="Go to Login" onClick={navigateToLogin} />
      <Button label="Go to Login" onClick={navigateToLogin} />
      <Button label="Go to Login" onClick={navigateToLogin} />
    </div>
  );
}

export default LandingPage;
