import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import './App.css';

function App() {
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [frontPreview, setFrontPreview] = useState(null);
  const [backPreview, setBackPreview] = useState(null);

  const handleFrontImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFrontImage(file);
      setFrontPreview(URL.createObjectURL(file));
    }
  };

  const handleBackImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBackImage(file);
      setBackPreview(URL.createObjectURL(file));
    }
  };

  const generatePdf = () => {
    if (frontImage && backImage) {
      const doc = new jsPDF();
      const reader1 = new FileReader();
      reader1.onload = (e1) => {
        const imgData1 = e1.target.result;
        const reader2 = new FileReader();
        reader2.onload = (e2) => {
          const imgData2 = e2.target.result;
          const pageWidth = doc.internal.pageSize.getWidth();
          const pageHeight = doc.internal.pageSize.getHeight();
          const imgWidth = 85;
          const imgHeight = 55;
          const x = (pageWidth - imgWidth) / 2;
          const totalHeight = (imgHeight * 2) + 10;
          const y = (pageHeight - totalHeight) / 2;
          doc.addImage(imgData1, 'JPEG', x, y, imgWidth, imgHeight);
          doc.addImage(imgData2, 'JPEG', x, y + imgHeight + 10, imgWidth, imgHeight);
          doc.save('aadhar-card.pdf');
        };
        reader2.readAsDataURL(backImage);
      };
      reader1.readAsDataURL(frontImage);
    } else {
      alert('Please upload both front and back images.');
    }
  };

  return (
    <div className="container">
      <h1>Aadhar Card to PDF Converter</h1>
      <div className="upload-section">
        <div className="upload-area">
          <label htmlFor="frontImage">
            Upload Front Image
            <input type="file" id="frontImage" accept="image/*" onChange={handleFrontImageChange} />
          </label>
          {frontPreview && <img id="front-preview" className="preview" src={frontPreview} alt="Front Preview" />}
        </div>
        <div className="upload-area">
          <label htmlFor="backImage">
            Upload Back Image
            <input type="file" id="backImage" accept="image/*" onChange={handleBackImageChange} />
          </label>
          {backPreview && <img id="back-preview" className="preview" src={backPreview} alt="Back Preview" />}
        </div>
      </div>
      <button onClick={generatePdf}>Generate PDF</button>
    </div>
  );
}

export default App;
