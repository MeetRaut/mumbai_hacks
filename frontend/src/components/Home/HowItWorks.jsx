import React from "react";
import Container from "../Container";
import SectionTitle from "./SectionTitle";
import { how_1, how_2, how_3, how_4 } from "../../assets/home";

const items = [
  {
    id: 1,
    icon: how_1,
    heading: "Alert Authorities in Danger",
    text: "Women can quickly alert local authorities and support networks when they feel threatened, ensuring a rapid response.",
  },
  {
    id: 2,
    icon: how_2,
    heading: "Share Your Location",
    text: "When an alert is triggered, the system shares the user's location with authorities, allowing for a swift rescue or intervention.",
  },
  {
    id: 3,
    icon: how_3,
    heading: "Receive Immediate Assistance",
    text: "Once alerted, nearby responders and support services receive notifications to provide immediate help and support.",
  },
  {
    id: 4,
    icon: how_4,
    heading: "Follow-Up and Support",
    text: "After an incident, users can access resources, counseling, and legal support to help them through their experience.",
  },
];

export default function HowItWorks() {
  return (
    <section className="my-14">
      <Container>
        <SectionTitle title="How It Works" />
        <div className="bg-[#D9CAB3] bg-opacity-30 px-8 py-14 rounded-md mt-8">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 place-items-center lg:gap-14 gap-8">
            {items.map((item) => (
              <div
                className="text-center flex flex-col items-center justify-center"
                key={item.id}
              >
                <img src={item.icon} alt="icon" className="pb-4 w-24" />
                <h1 className="font-bold text-lg py-4">{item.heading}</h1>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
