import { useEffect, useState } from "react";

async function fetchProducts(category, keyword) {
  const response = await fetch("products.json");
  const data = await response.json();
  return data.filter((item) => {
    return (
      (category === "all" || category === item.type) &&
      (!keyword || item.name.includes(keyword))
    );
  });
}

export default function App() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  useEffect(() => {
    (async () => {
      const data = await fetchProducts("all");
      setProducts(data);
    })();
  }, []);
  return (
    <>
      <header>
        <h1>The Can Store</h1>
      </header>
      <div>
        <aside>
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              const category = event.target.elements.category.value;
              const keyword = event.target.elements.searchTerm.value;
              const data = await fetchProducts(category, keyword);
              setProducts(data);
              setCategory(category);
              setSearch(keyword);
            }}
          >
            <div>
              <label htmlFor="category">Choose a category:</label>
              <select id="category">
                <option value="all">All</option>
                <option value="vegetables">Vegetables</option>
                <option value="meat">Meat</option>
                <option value="soup">Soup</option>
              </select>
            </div>
            <div>
              <label htmlFor="searchTerm">Enter search term:</label>
              <input type="text" id="searchTerm" placeholder="e.g. beans" />
            </div>
            <div>
              <button>Filter results</button>
            </div>
          </form>
        </aside>
        <main>
          {products.map((jsondata) => {
            if (category === jsondata.type || category === "all") {
              return (
                <section className={jsondata.type}>
                  <h2>{jsondata.name}</h2>
                  <p>${jsondata.price}</p>
                  <img src={"images/" + jsondata.image} alt={jsondata.name} />
                </section>
              );
            }
          })}
          {/* {CSSMathProduct.map((puroduct) => {
            return <section key ={puroduct.name}className = {puroduct.type}>
            <h2>{puroduct.name[0].toUpperCase()}</h2>
          })} */}
        </main>
      </div>
      <footer>
        <p>All icons found at the Noun Project:</p>
        <ul>
          <li>
            Bean can icon by{" "}
            <a href="https://thenounproject.com/yalanis/">Yazmin Alanis</a>
          </li>
          <li>
            Vegetable icon by{" "}
            <a href="https://thenounproject.com/skatakila/">Ricardo Moreira</a>
          </li>
          <li>
            Soup icon by{" "}
            <a href="https://thenounproject.com/ArtZ91/">Arthur Shlain</a>
          </li>
          <li>
            Meat Chunk icon by{" "}
            <a href="https://thenounproject.com/smashicons/">Oliviu Stoian</a>.
          </li>
        </ul>
      </footer>
    </>
  );
}
