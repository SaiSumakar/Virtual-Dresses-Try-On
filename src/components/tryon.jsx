import { useLocation } from "react-router-dom";
import { useState } from "react";

const TryOnPage = () => {
  const location = useLocation();
  const { selectedDress } = location.state || {}; // Extract passed dress

  const [userDetails, setUserDetails] = useState({
    height: "",
    weight: "",
    bodyType: "",
    uploadedImage: null,
  });

  const [tryOnImage, setTryOnImage] = useState(selectedDress.imageUrl || ""); // Default image

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserDetails({ ...userDetails, uploadedImage: URL.createObjectURL(file) });
    }
  };

  const handleTryOn = async () => {
    if (!userDetails.uploadedImage) {
      alert("Please upload your image before trying on.");
      return;
    }

    setTryOnImage(userDetails.uploadedImage); // Simulated API response (replace with backend)
  };

  return (
    <div className="tryon-container">
      {/* Left Section: User Inputs */}
      <div className="input-section">
        <h2>Customize Your Try-On</h2>
        <label>Size</label>
        <select name="bodyType" value={userDetails.bodyType} onChange={handleChange}>
          <option value="">Select</option>
          <option value="slim">XS</option>
          <option value="slim">S</option>
          <option value="slim">M</option>
          <option value="slim">L</option>
          <option value="slim">XL</option>
          <option value="slim">XXL</option>
        </select>

        <label>Upload Your Image:</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} />

        <button onClick={handleTryOn}>Try It On</button>
      </div>

      {/* Right Section: Display Try-On Image */}
      <div className="result-section">
        <div className="image-preview">
          {selectedDress && <h3>{selectedDress.name}</h3>}
          <img src={tryOnImage} alt="Try-On Result" />
        </div>
      </div>
    </div>
  );
};

export default TryOnPage;
