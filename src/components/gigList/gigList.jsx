import React from "react";
import "./gigList.scss";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest.js";
import GigCard from "../gigCard/GigCard";

const GigList = () => {
  const { isLoading, error, data: gigs } = useQuery({
    queryKey: ["gigs"],
    queryFn: () =>
      newRequest.get("/gigs").then((res) => {
        return res.data;
      }),
  });

  return (
    <section className="gig-list">
      <h2>Latest Gigs</h2>
      <p>Quality Gigs. Talented Freelancers. Fast Results.</p>

      {isLoading ? (
        <p>Loading gigs...</p>
      ) : error ? (
        <p>Error loading gigs: {error.message}</p>
      ) : (
        <div className="gig-cards">
          {gigs.map((gig) => (
            <GigCard key={gig._id} item={gig} />
          ))}
          
        </div>
      )}
    </section>
  );
};

export default GigList;