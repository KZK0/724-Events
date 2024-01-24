import React, { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex < (data?.focus?.length || 0) - 1 ? prevIndex + 1 : 0));
    }, 5000);

    return () => clearInterval(interval); // Nettoyer l'intervalle lors du démontage du composant
  }, [index, data?.focus]);

  return (
    <div className="SlideCardList">
      {data?.focus.map((event, idx) => (
        <div
          key={event.id || idx}
          className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}
        >
          <img src={event.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {data?.focus.map((event) => (
            <input
              key={`radio-${event.id}`}
              type="radio"
              name="radio-button"
              checked={index === data?.focus.indexOf(event)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
