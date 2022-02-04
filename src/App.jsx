import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import "./App.css";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const [basket, setBasket] = useState([]);

  const handleAddCat = (item) => {
    setBasket([...basket, item]);
  };

  const handleRemoveCat = (index) => {
    let tempCat = [...basket];
    tempCat.splice(index, 1);
    setBasket([...tempCat]);
  };

  useEffect(() => {
    handleFetch();
  }, []);

  const handleFetch = async () => {
    try {
      const response = await fetch(
        "https://api.thecatapi.com/v1/images/search?limit=10&page=100&order=DESC"
      );
      const responseData = await response.json();
      const tempArray = [];
      responseData.forEach(function (it) {
        tempArray.push(it.url);
      });
      setData(tempArray);
      setLoading(!loading);
    } catch (error) {
      setError(true);
    }
  };

  if (error) {
    return <h3>Error: Reload the page</h3>;
  }

  return (
    <div className="App">
      <h1>Cats</h1>

      {loading ? (
        <ClipLoader loading={loading} width={150} height={5} />
      ) : (
        <div>
          <ol className="List">
            {data &&
              data.map((cat, index) => {
                return (
                  <li className="ListItem" key={index}>
                    <img className="catImg" src={data[index]} alt="" />
                    <button onClick={() => handleAddCat(cat)}>
                      add to favourites
                    </button>
                  </li>
                );
              })}
          </ol>
        </div>
      )}

      <div>
        <button onClick={onOpenModal}>Open modal</button>

        <Modal
          open={open}
          onClose={onCloseModal}
          center
          classNames={{ overlay: "customOverlay", modal: "customModal" }}
        >
          <div>
            <h1>Favourites List</h1>
            {basket.map((cat, index) => {
              return (
                <li key={index}>
                  {/* <h4>{movie.original_title}</h4> */}
                  <img className="catImg" src={basket[index]} alt="" />
                  <button onClick={() => handleRemoveCat(index)}>
                    remove to favourites
                  </button>
                </li>
              );
            })}
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default App;
