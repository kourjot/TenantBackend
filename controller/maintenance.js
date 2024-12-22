import { MaintenanceRequest } from "../model/maintenance.js";
// import cloudinary from "cloudinary";
// import multer from "multer";
// import "dotenv/config";  
// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // console.log('Cloudinary Configuration:', cloudinary.config());

// const storage = multer.memoryStorage();
// const upload = multer({ storage });
// // console.log(storage)
// // console.log(upload)

// const maintenance = async (req, res) => {

//   try {
//     const { name, address, category, urgency, description } = req.body;
//     let imageUrl =null
//     console.log(imageUrl);
//     if (req.file) {
//       imageUrl = req.file.path;

//       const uploadImage = new Promise((resolve, reject) => {
//         const stream = cloudinary.v2.uploader.upload_stream(
//           {
//             folder: "leaseease/maintenance",  
//             allowed_formats: ["jpg", "png", "jpeg"],  
//           },
//           (error, result) => {
//             if (error) {
//               console.error('Cloudinary upload error:', error);  
//               return reject(error);
//             }
//             resolve(result);  
//           }
//         );
 
//         stream.end(req.file.buffer);
//       });

//       const result = await uploadImage;
//       imageUrl = result.secure_url; 
//     }
//     console.log(imageUrl);
//     const maintenanceReq = new MaintenanceRequest({
//       name,
//       address,
//       category,
//       urgency,
//       description,
//       image: imageUrl ? [imageUrl] : [],  
//     });

//     await maintenanceReq.save();

//     res.status(201).json({
//       msg: "Maintenance request created successfully",
//       maintenanceReq,
//     });
//   } catch (err) {
//     console.error('Server error:', err);  
//     res.status(500).json({
//       msg: "Server error while creating maintenance request",
//       error: err.message,  
//     });
//   }
// };

// export { maintenance, upload };


// import { MaintenanceRequest } from "../model/maintenance.js";
// import cloudinary from "cloudinary";
// import multer from "multer";

// // Cloudinary configuration
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // Set up multer to use memory storage
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// // Maintenance request handler
// const maintenance = async (req, res) => {
//   try {
//     const { name, address, category, urgency, description } = req.body;
//     let imageUrl = null;  // Default is no image uploaded

//     // If there's an image in the request
//     if (req.file) {
//       // Promise for Cloudinary upload
//       const uploadImage = new Promise((resolve, reject) => {
//         const stream = cloudinary.v2.uploader.upload_stream(
//           {
//             folder: "leaseease/maintenance",  // Cloudinary folder for the image
//             // allowed_formats: ["jpg", "png", "jpeg"],  // Allowed file formats
//           },
//           (error, result) => {
//             if (error) {
//               console.error('Cloudinary upload error:', error);
//               return reject(error);  // Reject the promise if there's an error
//             }
//             resolve(result);  // Resolve the promise if the upload succeeds
//           }
//         );

//         stream.end(req.file.buffer); // End the stream with the image buffer
//       });

//       // Await the image upload promise and get the result
//       const result = await uploadImage;
//       imageUrl = result.secure_url;  // Get the secure URL of the uploaded image
//     }

//     // Create a new maintenance request
//     const maintenanceReq = new MaintenanceRequest({
//       name,
//       address,
//       category,
//       urgency,
//       description,
//       image: imageUrl ? [imageUrl] : [], // Add the image URL (or empty array if no image)
//     });

//     // Save the request to the database
//     await maintenanceReq.save();

//     // Return a success response
//     res.status(201).json({
//       msg: "Maintenance request created successfully",
//       maintenanceReq,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       msg: "Server error while creating maintenance request",
//       error: err.message, // Send the error message in the response
//     });
//   }
// };

// export { maintenance, upload };
