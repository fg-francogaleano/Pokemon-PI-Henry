import React, { useEffect } from "react";
import Cards from "../../components/Cards1/Cards";
// import Filtered from "../../components/Filtered/Filtered";
import DrawerFiltered from "../../components/DrawerFiltered/DrawerFiltered";

import { useDispatch } from "react-redux";
import { getTypes } from "../../redux/actions";

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  return (
    <>
      {/* <Filtered /> */}
      <DrawerFiltered />
      <Cards />
    </>
  );
}

export default Home;
