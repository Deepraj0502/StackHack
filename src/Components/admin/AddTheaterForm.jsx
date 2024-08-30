// src/components/AddTheaterForm.jsx
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";

function AddTheaterForm() {
  const [theaterData, setTheaterData] = useState({
    name: "",
    city: "",
    ticketPrice: "",
    seats: 100, // Adjust seats as needed
    image: "",
  });

  const handleInputChange = (e) => {
    setTheaterData({
      ...theaterData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "theaters"), theaterData);

      setTheaterData({
        name: "",
        city: "",
        ticketPrice: "",
        seats: 100,
        image: "",
      });
      alert("Theater added successfully!");
    } catch (error) {
      console.error("Error adding theater: ", error);
      alert("Failed to add theater.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Theater</h3>
      <input
        name="name"
        value={theaterData.name}
        onChange={handleInputChange}
        placeholder="Theater Name"
        required
      />
      <input
        name="city"
        value={theaterData.city}
        onChange={handleInputChange}
        placeholder="City"
        required
      />
      <input
        name="ticketPrice"
        value={theaterData.ticketPrice}
        onChange={handleInputChange}
        placeholder="Ticket Price"
        required
      />
      <input
        name="seats"
        value={theaterData.seats}
        onChange={handleInputChange}
        placeholder="Seats"
        type="number"
        required
      />
      <input
        name="image"
        value={theaterData.image}
        onChange={handleInputChange}
        placeholder="Image URL"
      />
      <button type="submit">Add Theater</button>
    </form>
  );
}

export default AddTheaterForm;
