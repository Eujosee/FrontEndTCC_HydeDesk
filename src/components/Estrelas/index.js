import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Container, Rating } from "./RatingStyles";
const Rate = () => {
    const [rate, setRate] = useState(0);
    return (

        <div>
            <Container>
                {[...Array(5)].map((item, index) => {
                    const givenRating = index + 1;
                    return (
                        <label>
                            <button
                                type="radio"
                                value={givenRating}
                                onClick={() => {
                                    setRate(givenRating);


                                }}
                            />
                            <Rating>
                                <FaStar
                                    color={
                                        givenRating < rate || givenRating === rate
                                            ? "rgb(255 239 69)"
                                            : "rgb(192,192,192)"
                                    }
                                />
                            </Rating>
                        </label>
                    );
                })}
            </Container>
            <div>
                {rate < 3 && <div className="flex flex-col w-full">
                    <label className="font-medium text-gray-500">
                        Detalhes da Avaliação
                    </label>
                    <textarea className="bg-gray-300 rounded h-36 pt-2 pl-4 shadow" />
                </div>}
            </div>
        </div>
    );
};

export default Rate;