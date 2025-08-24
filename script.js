document.getElementById('frontImage').addEventListener('change', function(event) {
    const [file] = event.target.files;
    if (file) {
        const preview = document.getElementById('front-preview');
        preview.src = URL.createObjectURL(file);
        preview.style.display = 'block';
    }
});

document.getElementById('backImage').addEventListener('change', function(event) {
    const [file] = event.target.files;
    if (file) {
        const preview = document.getElementById('back-preview');
        preview.src = URL.createObjectURL(file);
        preview.style.display = 'block';
    }
});


document.getElementById('generatePdf').addEventListener('click', function () {
    const { jsPDF } = window.jspdf;
    const frontImage = document.getElementById('frontImage').files[0];
    const backImage = document.getElementById('backImage').files[0];

    if (frontImage && backImage) {
        const doc = new jsPDF();

        const reader1 = new FileReader();
        reader1.onload = function (e1) {
            const imgData1 = e1.target.result;
            const reader2 = new FileReader();
            reader2.onload = function (e2) {
                const imgData2 = e2.target.result;

                // A4 paper size: 210 x 297 mm
                // You might need to adjust the image size and position
                doc.addImage(imgData1, 'JPEG', 10, 10, 85, 55); // Adjust x, y, width, height
                doc.addImage(imgData2, 'JPEG', 10, 75, 85, 55); // Adjust x, y, width, height

                doc.save('aadhar-card.pdf');
            };
            reader2.readAsDataURL(backImage);
        };
        reader1.readAsDataURL(frontImage);
    } else {
        alert('Please upload both front and back images.');
    }
});
