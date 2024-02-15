import React, { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  const byDateDesc = data?.focus?.sort((evtA, evtB) =>
    new Date(evtB.date) < new Date(evtA.date) ? -1 : 1
  );

  const nextCard = () => {
    if (byDateDesc) {
      setTimeout(() => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0), 5000);
    }
  };

  useEffect(() => {
    nextCard();
  });

  const handleRadioChange = (idx) => {
    setIndex(idx);
  };

  return byDateDesc ? (
    <div className="SlideCardList">
      {byDateDesc.map((event, idx) => (
        <div
          key={event.id}
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
          {byDateDesc.map((_, idx) => (
            <input
              key={byDateDesc[idx].id} // Utilisation de l'ID de l'événement comme clé
              type="radio"
              name="radio-button"
              checked={index === idx}
              onChange={() => handleRadioChange(idx)}
            />
          ))}
        </div>
      </div>
    </div>
  ) : null;
};

export default Slider;
