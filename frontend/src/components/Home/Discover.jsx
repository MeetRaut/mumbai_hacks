import  discover_1  from '../../Images/women1.jpg'
import  discover_2  from '../../Images/women2.jpg'
import  discover_3  from '../../Images/women3.jpg'
import Container from "../Container";
import SectionTitle from "./SectionTitle";

const cards = [
  {
    id: 1,
    image: discover_1,
    title: "Support Programs",
  },
  {
    id: 2,
    image: discover_2,
    title: "Safety Networks",
  },
  {
    id: 3,
    image: discover_3,
    title: "Community Partners",
  },
];

const DiscoverCard = ({ card }) => {
  return (
    <div className="relative rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-transform">
      <img src={card.image} alt="discover_image" />
      <div className="absolute bottom-10 capitalize left-10 text-white font-bold md:text-[50px] text-[40px]">
        {card.title}
      </div>
    </div>
  );
};

export default function Discover() {
  return (
    <section className="my-14">
      <Container>
        <div>
          <SectionTitle title="Explore Women's Safety Initiatives" />
          <div className="grid lg:grid-cols-3 mt-8 sm:grid-cols-2 grid-cols-1 place-items-center lg:gap-14 gap-4">
            {cards.map((card) => (
              <DiscoverCard card={card} key={card.id} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
