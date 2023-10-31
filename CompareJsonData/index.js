const fs = require("fs");
const path = require("path");

const imagesDirectory = "C:/Users/halil.cakir/Desktop/CXR_png"; // Görsellerin olduğu klasör
const txtDirectory = "C:/Users/halil.cakir/Desktop/ClinicalReadings"; // txt dosyalarının olduğu klasör
const outputDirectory = "C:/Users/halil.cakir/Desktop/jsonMatch"; // Çıktının yazılacağı klasör

if (!fs.existsSync(outputDirectory)) {
  fs.mkdirSync(outputDirectory);
}

let combinedData = [];

fs.readdir(imagesDirectory, (err, imageFiles) => {
  if (err) {
    console.error("Error reading images directory:", err);
    return;
  }

  imageFiles.forEach((imageFile) => {
    const imageFilePath = path.join(imagesDirectory, imageFile);
    const baseName = path.basename(imageFilePath, path.extname(imageFile));

    const matchingTxtPath = path.join(txtDirectory, `${baseName}.txt`);

    if (fs.existsSync(matchingTxtPath)) {
      const txtLines = fs
        .readFileSync(matchingTxtPath, "utf-8")
        .split("\n")
        .map((line) => line.trim());

      let gender, age, diseaseStatus;

      if (txtLines[0] && txtLines[0].startsWith("Patient's Sex:")) {
        gender = txtLines[0].split(":")[1].trim() === "F" ? "0" : "1";
        age =
          txtLines[1] && txtLines[1].split(":")[1]
            ? txtLines[1].split(":")[1].trim().replace("Y", "")
            : undefined;
        age = parseInt(age);
        gender = parseInt(gender);
        diseaseStatus = "";
      } else if (txtLines[0] && txtLines[1]) {
        const genderAge = txtLines[0].split(" ");
        gender = genderAge[0].trim() === "female" ? "0" : "1";
        age = genderAge[1] ? genderAge[1].replace("yrs", "") : undefined;
        age = parseInt(age);
        gender = parseInt(gender);
        diseaseStatus = "";
      }
      if ( (gender == 0 || gender == 1) && age) {
        if (age <= 30) {
          diseaseStatus = 1;
        } else if (age > 30 && age < 50) {
          diseaseStatus = 2;
        } else {
          diseaseStatus = 3;
        }
        combinedData.push(

          [age, gender, diseaseStatus]
        );
      } else {
        fs.unlinkSync(imageFilePath);
        fs.unlinkSync(matchingTxtPath);
      }
    } else {
      fs.unlinkSync(imageFilePath);
      fs.unlinkSync(matchingTxtPath);
    }
  });
  const outputPath = path.join(outputDirectory, "combinedData.json");
  fs.writeFileSync(outputPath, JSON.stringify(combinedData, null, 4), "utf-8");

  console.log(`Combined data written to: ${outputPath}`);
});
