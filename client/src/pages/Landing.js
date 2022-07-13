import { Logo } from '../components';
import main from '../assets/images/main.svg';

import Wrapper from '../assets/wrappers/LandingPage';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            Job <span>tracking</span> app
          </h1>
          <p>
            I'm baby ipsum taxidermy exercitation air plant occupy cliche
            drinking vinegar bushwick vegan meh sed. Keffiyeh gluten-free
            adaptogen, aute whatever cupidatat kale chips poutine sriracha 90's
            officia pop-up ullamco. Raw denim qui vice helvetica, cred hot
            chicken asymmetrical edison bulb copper mug officia fingerstache
            tofu beard occupy.
          </p>
          <Link to="/register" className="btn btn-hero">
            Login/Register
          </Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
