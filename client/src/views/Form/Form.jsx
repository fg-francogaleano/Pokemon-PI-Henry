import axios from "axios";
import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import style from "./Form.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getTypes } from "../../redux/actions";

function Form() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTypes());
  }, []);
  const { types } = useSelector((state) => state);

  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [form, setForm] = useState({
    name: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    weight: "",
    height: "",
    image: "",
    type1: "",
    type2: "",
  });

  const [error, setError] = useState({
    name: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    weight: "",
    height: "",
    image: "",
    type1: "",
    type2: "",
  });

  const validate = (form) => {
    if (form.name) {
      if (/^[a-z]{0,10}$/.test(form.name)) setError({ ...error, name: "" });
      else setError({ ...error, name: "*only characters-max 10" });
    }

    if (form.hp) {
      if (/^[0-9]{1,3}$/.test(form.hp)) setError({ ...error, hp: "" });
      else setError({ ...error, hp: "*integers-max 3 digits" });
    }

    if (form.attack) {
      if (/^[0-9]{1,3}$/.test(form.attack) || !form.attack)
        setError({ ...error, attack: "" });
      else setError({ ...error, attack: "Integers-max 3 digits" });
    }

    if (form.defense) {
      if (/^[0-9]{1,3}$/.test(form.defense) || !form.defense)
        setError({ ...error, defense: "" });
      else setError({ ...error, defense: "Integers-max 3 digits" });
    }

    if (form.speed) {
      if (/^[0-9]{1,3}$/.test(form.speed) || !form.speed)
        setError({ ...error, speed: "" });
      else setError({ ...error, speed: "Integers-max 3 digits" });
    }

    if (form.weight) {
      if (/^[0-9]{1,3}$/.test(form.weight) || !form.weight)
        setError({ ...error, weight: "" });
      else setError({ ...error, weight: "Integers-max 3 digits" });
    }

    if (form.height) {
      if (/^[0-9]{1,3}$/.test(form.height) || !form.height)
        setError({ ...error, height: "" });
      else setError({ ...error, height: "Integers-max 3 digits" });
    }
  };

  const handleInputChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    validate({ ...form, [property]: value });

    setForm({ ...form, [property]: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post("http://localhost:3001/pokemons", form)
      .then((res) => alert(res.data))
      .catch((err) => alert(err));
    setShouldRedirect(true);
  };

  return (
    <>
      {shouldRedirect ? (
        <Redirect to="/home" />
      ) : (
        <div className={style.contenedor}>
          <div className={style.contenedorForm}>
            <form onSubmit={handleSubmit}>
              <div>
                <h1>CREATE POKEMON</h1>
              </div>
              <div>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleInputChange}
                  className={style.input}
                />
                <label for="" className={style.label}>
                  Name
                </label>
                {error.name && <span>{error.name}</span>}
              </div>
              <div>
                <input
                  type="text"
                  name="hp"
                  value={form.hp}
                  onChange={handleInputChange}
                  className={style.input}
                />
                <label for="" className={style.label}>
                  Hp
                </label>
                {error.hp && <span>{error.hp}</span>}
              </div>
              <div>
                <input
                  type="text"
                  name="attack"
                  value={form.attack}
                  onChange={handleInputChange}
                  className={style.input}
                />
                <label for="" className={style.label}>
                  Attack
                </label>
                {error.attack && <span>{error.attack}</span>}
              </div>
              <div>
                <input
                  type="text"
                  name="defense"
                  value={form.defense}
                  onChange={handleInputChange}
                  className={style.input}
                />
                <label for="" className={style.label}>
                  Defense
                </label>
                {error.defense && <span>{error.defense}</span>}
              </div>
              <div>
                <input
                  type="text"
                  name="speed"
                  value={form.speed}
                  onChange={handleInputChange}
                  className={style.input}
                />
                <label for="" className={style.label}>
                  Speed
                </label>
                {error.speed && <span>{error.speed}</span>}
              </div>
              <div>
                <input
                  type="text"
                  name="weight"
                  value={form.weight}
                  onChange={handleInputChange}
                  className={style.input}
                />
                <label for="" className={style.label}>
                  Weight
                </label>
                {error.weight && <span>{error.weight}</span>}
              </div>
              <div>
                <input
                  type="text"
                  name="height"
                  value={form.height}
                  onChange={handleInputChange}
                  className={style.input}
                />
                <label for="" className={style.label}>
                  Height
                </label>
                {error.height && <span>{error.height}</span>}
              </div>
              <div>
                <input
                  type="text"
                  name="image"
                  value={form.image}
                  onChange={handleInputChange}
                  className={style.input}
                />
                <label for="" className={style.label}>
                  Image
                </label>
              </div>
              <div>
                <select
                  onChange={handleInputChange}
                  value={form.type1}
                  name="type1"
                >
                  <option value="">Select a type</option>
                  {types?.map((type, index) => {
                    return <option key={index}>{type.name}</option>;
                  })}
                </select>
                <label for="" className={style.labelSelect}>
                  Type 1
                </label>
              </div>
              <div>
                <select
                  onChange={handleInputChange}
                  value={form.type2}
                  name="type2"
                >
                  <option value="">Select a type</option>
                  {types?.map((type, index) => {
                    return <option key={index}>{type.name}</option>;
                  })}
                </select>
                <label for="" className={style.labelSelect}>
                  Type 2
                </label>
              </div>
              <button type="submit" className={style.button}>
                CREATE
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Form;
