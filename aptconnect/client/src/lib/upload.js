import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "./firebase";

export const uploadToCloudinary = async (file) => {
  const form = new FormData();
  form.append("file", file);

  const res = await fetch("http://localhost:8000/upload", {
    method: "POST",
    body: form
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Upload failed");
  }

  const url = await res.json();
  return url; // Cloudinary image URL
};

export const saveMetadata = async (imageUrl) => {
  if (!auth.currentUser) {
    throw new Error("User not authenticated");
  }
  
  await addDoc(collection(db, "media"), {
    userId: auth.currentUser.uid,
    url: imageUrl,
    createdAt: new Date(),
  });
};

export const handleUpload = async (file) => {
  try {
    const url = await uploadToCloudinary(file);
    await saveMetadata(url);
    return url;
  } catch (error) {
    console.error("Upload failed:", error);
    throw error;
  }
};
