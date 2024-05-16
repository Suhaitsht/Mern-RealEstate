import React, { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

export default function CreateListing() {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [upload, setUpload] = useState(false);

  // Image uploads functionally
  const handleImageSubmit = () => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        setUpload(true);
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUpload(false);
        })
        .catch((err) => {
          setImageUploadError("Image uploads filed (2 mb per image)");
          setUpload(false);
        });
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getDate() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadsTask = uploadBytesResumable(storageRef, file);
      uploadsTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Uploads is ${progress} % done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadsTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  // Delete uploads images
  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  return (
    <main className="p-3 max-w-4xl max-auto">
      <h1 className="text-xl font-semibold text-center my-7">
        Create A Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="p-3 rounded-xl"
            id="name"
            maxLength={62}
            minLength={10}
          />
          <textarea
            type="text"
            placeholder="Description"
            className="p-3 rounded-xl"
            id="description"
            required
          />
          <input
            type="text"
            placeholder="Address"
            className="p-3 rounded-xl"
            id="address"
            maxLength={62}
            minLength={10}
          />
          <div className="flex gap-4 flex-wrap">
            <div className="flex gap-2 ">
              <input type="checkbox" id="sale" className="w-5 h-5" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5 h-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5 h-5" />
              <span>Parking Spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5 h-5" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5 h-5" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                className="p-3 w-20 border-red-300 rounded-lg"
                min={1}
                maxLength={10}
                required
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bath"
                className="p-3 w-20 border-red-300 rounded-lg"
                min={1}
                maxLength={10}
                required
              />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                className="p-3 w-20 border-red-300 rounded-lg"
                min={1}
                maxLength={10}
                required
              />
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                <span>{"$ / month"}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="discountPrice"
                className="p-3 w-20 border-red-300 rounded-lg"
                min={1}
                maxLength={10}
                required
              />
              <div className="flex flex-col items-center">
                <p>Discount Price</p>
                <span>{"$ / month"}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold"> Images :</p>
          <span>The first image will be cover {"max 6"}</span>
          <div className="flex gap-4">
            <input
              type="file"
              id="images"
              accept="images/*"
              multiple
              className="p-3 border-gray-300 rounded w-full"
              onChange={(e) => {
                setFiles(e.target.files);
              }}
            />
            <button
              type="button"
              className="p-3 text-green-300 border border-green-300 rounded uppercase hover:shadow-lg opacity-85"
              onClick={handleImageSubmit}
              disabled={upload}
            >
              {upload ? "Uploading...." : "Uploads"}
            </button>
          </div>
          <p className="text-red-500">{imageUploadError && imageUploadError}</p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                className="flex justify-between p-3 border items-center"
                key={index}
              >
                <img
                  src={url}
                  alt="listing image"
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <button
                  type="button"
                  className="p-2 text-red-700 font-semibold uppercase hover:opacity-75"
                  onClick={() => {
                    handleRemoveImage(index);
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
          <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-70">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}
