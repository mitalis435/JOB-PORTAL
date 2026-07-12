import multer from "multer";

const storage = multer.memoryStorage();

// For Company (Only looks for "file" which is the Logo)
export const uploadCompany = multer({ storage }).fields([
    { name: "file", maxCount: 1 } 
]);

// For Student/User (Looks for "profilePhoto" and "resume")
export const uploadStudent = multer({ storage }).fields([
    { name: "profilePhoto", maxCount: 1 },
    { name: "resume", maxCount: 1 }
]);