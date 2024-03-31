// import React, { useContext } from 'react';
// import { AppContext } from './context/ProductContext';
import HeroSection from './components/HeroSection';
import { useProductContext } from './context/ProductContext';

const About = () => {
  // const {myName} = useContext(AppContext);  //Instead of thiss using under line code!
    const { myName } = useProductContext();    

  const data = {
    name: "About Section",
  };
  return (
    <>
       {myName}
       <HeroSection myData={data} />
    </>
  );
};
export default About;