import Footer from "../components/Footer";
import HeroPages from "../components/HeroPages";
import Person1 from "../images/team/ADARSH-SHARMA pass.png";
import Person2 from "../images/team/Screenshot_2024-11-29_130936-removebg-preview.png";
import Person3 from "../images/team/Screenshot_2024-11-29_130814-removebg-preview.png";


function Team() {
  const teamPpl = [
    { img: Person1, name: "Adarsh sharma", job: "Business Owner" },
    { img: Person2, name: "Emp1", job: "Photographer"  },
    { img: Person3, name: "Emp2", job: "Menager" },
    
  ];
  return (
    <>
      <section className="team-page">
        <HeroPages name="Our Team" />
        <div className="cotnainer">
          <div className="team-container">
            {teamPpl.map((ppl, id) => (
              <div key={id} className="team-container__box">
                <div className="team-container__box__img-div">
                  <img src={ppl.img} alt="team_img" />
                </div>
                <div className="team-container__box__descr">
                  <h3>{ppl.name}</h3>
                  <p>{ppl.job}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="book-banner">
          <div className="book-banner__overlay"></div>
          <div className="container">
            <div className="text-content">
              <h2>Book a car by getting in touch with us</h2>
              <span>
                <i className="fa-solid fa-phone"></i>
                <h3>(123) 456-7869</h3>
              </span>
            </div>
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
}

export default Team;