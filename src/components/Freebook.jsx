import list from "../../public/list.json";

const Freebook = () => {
    const filterData = list.filter((data) => data.category === "Free");
    console.log(filterData);
  return (
    <>
     <div>

     </div>
    </>
  )
}

export default Freebook