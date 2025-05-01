import RecordForm from "@/components/RecordForm";
import { createRecord } from "@/utils/recordsFunctions";
import { useRouter } from "next/router";
import React from "react";

const Create = () => {
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const response = await createRecord(data);

      if (response) {
        router.push(`/records/${response._id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return <RecordForm onSubmit={onSubmit} />;
};

export default Create;