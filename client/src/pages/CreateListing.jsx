import React from "react";

export default function CreateListing() {
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
            />
            <button className="p-3 text-green-300 border border-green-300 rounded uppercase hover:shadow-lg opacity-85">
              Uploads
            </button>
          </div>
          <button className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-70">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}
