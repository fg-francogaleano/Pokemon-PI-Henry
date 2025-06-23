import { useEffect } from "react";
import Cards from "../../components/Cards1/Cards";
import DrawerFiltered from "../../components/DrawerFiltered/DrawerFiltered";
import { useDispatch } from "react-redux";
import { getTypes } from "../../redux/actions";
import { Helmet } from "react-helmet";

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  return (
    <>
      {/* <Filtered /> */}
      <Helmet>
        <title>Home | Pokédex Web</title>
        <meta
          name="description"
          content="Browse all available Pokémon, filter by type, and explore detailed stats in our Pokédex Web app."
        />
      </Helmet>
      <DrawerFiltered />
      <Cards />
    </>
  );
}

export default Home;
