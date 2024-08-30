import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function AddMovieForm() {
  const [movieData, setMovieData] = useState({
    title: "",
    language: "",
    genre: "",
    director: "",
    trailer: "",
    description: "",
    duration: "",
    startDate: "",
    endDate: "",
  });
  const [imageFile, setImageFile] = useState(null);

  const handleInputChange = (e) => {
    setMovieData({
      ...movieData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = "";
      if (imageFile) {
        const storageRef = ref(storage, `movies/${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(storageRef);
      }

      await addDoc(collection(db, "movies"), {
        ...movieData,
        image: imageUrl,
      });

      setMovieData({
        title: "",
        language: "",
        genre: "",
        director: "",
        trailer: "",
        description: "",
        duration: "",
        startDate: "",
        endDate: "",
      });
      setImageFile(null);
      alert("Movie added successfully!");
    } catch (error) {
      console.error("Error adding movie: ", error);
      alert("Failed to add movie.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Movie</h3>
      <input
        name="title"
        value={movieData.title}
        onChange={handleInputChange}
        placeholder="Title"
        required
      />
      <input
        name="language"
        value={movieData.language}
        onChange={handleInputChange}
        placeholder="Language"
        required
      />
      <input
        name="genre"
        value={movieData.genre}
        onChange={handleInputChange}
        placeholder="Genre"
        required
      />
      <input
        name="director"
        value={movieData.director}
        onChange={handleInputChange}
        placeholder="Director"
        required
      />
      <input
        name="trailer"
        value={movieData.trailer}
        onChange={handleInputChange}
        placeholder="Trailer URL"
      />
      <textarea
        name="description"
        value={movieData.description}
        onChange={handleInputChange}
        placeholder="Description"
        required
      ></textarea>
      <input
        name="duration"
        value={movieData.duration}
        onChange={handleInputChange}
        placeholder="Duration (e.g., 2h 30m)"
        required
      />
      <input
        type="date"
        name="startDate"
        value={movieData.startDate}
        onChange={handleInputChange}
        required
      />
      <input
        type="date"
        name="endDate"
        value={movieData.endDate}
        onChange={handleInputChange}
        required
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        required
      />
      <button type="submit">Add Movie</button>
    </form>
  );
}

export default AddMovieForm;
