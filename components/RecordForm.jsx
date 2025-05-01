import { useRouter } from "next/router";
import React, { useState } from "react";
import { defaultRecordValues } from "@/utils/constants";

const RecordForm = ({ entry = null, onSubmit }) => {
  const router = useRouter();
  const initialData = entry ?? { ...defaultRecordValues };
  const [data, setData] = useState(initialData);

  const handleChange = (type, value) => {
    setData((prev) => ({ ...prev, [type]: value }));
  };

  const handleCancel = () => {
    router.push("/records");
  };

  return (
    <div className="p-4">
      <div className="flex flex-col mx-auto max-w-80 border p-4 shadow-sm gap-4 w-full">
        <div className="text-center font-bold text-xl">
          {entry?._id ? "Update" : "Create new"} Record
        </div>
        <div>
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Name
          </label>
          <input
            id="name"
            value={data.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Name placeholder"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Description
          </label>
          <textarea
            id="description"
            rows="4"
            value={data.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Write your thoughts here..."
          />
        </div>
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleCancel}
            className="text-white bg-red-500 hover:bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onSubmit(data)}
            className="text-white bg-green-500 hover:bg-green-600 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
          >
            {isEditing ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecordForm;
