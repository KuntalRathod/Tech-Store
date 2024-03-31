import React from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { AiOutlineStar } from "react-icons/ai";
import styled from 'styled-components';

const Star = ({stars,reviews}) => {
    // console.log("🚀 ~ file: Star.js:4 ~ Star ~ stars:", stars)
    const ratingStar = Array.from({ length: 5 }, (elem, index) => {
             
        let number = index + 0.5;
        // debugger;
        return (
            //i=0, i=1, i=2, i=3, i=4
            // stars =4.4
            <span key={index}>
                {
                    stars >= index + 1 ? ( 
                        <FaStar className='icon' />  
                    ) : stars >= number ? (
                            <FaStarHalfAlt className='icon' />
                        ) : (
                            <AiOutlineStar className='icon' />
                    )  
                }
            </span>
        );
         });
    return (
        <Wrapper>
            <div className="icon-style">
                {ratingStar}
                <p>({reviews} customer reviews)</p>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.section`
  .icon-style {
    display: flex;
    gap: 0.2rem;
    align-items: center;
    justify-content: flex-start;

    .icon {
      font-size: 2rem;
      color: orange;
    }

    .empty-icon {
      font-size: 2.6rem;
    }
    p {
      margin: 0;
      padding-left: 1.2rem;
    }
  }
`;

export default Star;