import React, { useState } from "react";
import SendBatch from "./components/SendBatch";
import CommonButton from "../CommonButton";
import SendBulkBatch from "./components/SendBulkBatch";
import DeleteBatch from "./components/DeleteBatch";
export default function Batch({ macAddress, LockID }) {
  const [batchshow, setBatchshow] = useState(false);
  const [bulkbatchshow, setBulkBatchshow] = useState(false);
  const [deleteBatch, setDeleteBatch] = useState(false);

  const changeBatchView = () => {
    setBatchshow(!batchshow);
    setBulkBatchshow(false);
    setDeleteBatch(false)
  };

  const changeBulkBatchView = () => {
    setBulkBatchshow(!bulkbatchshow);
    setBatchshow(false);
    setDeleteBatch(false)
  };

  const changedeleteBatchView = () => {
    setBulkBatchshow(false);
    setBatchshow(false);
    setDeleteBatch(!deleteBatch)
  };

  return (
    <div>
      <CommonButton
        label="Send Batch"
        backgroundColor="green"
        onClick={changeBatchView}
      />
      <CommonButton
        label="Send Bulk Batch"
        backgroundColor="green"
        onClick={changeBulkBatchView}
      />
      <CommonButton
        label="Delete Batch"
        backgroundColor="red"
        onClick={changedeleteBatchView}
      />
      {batchshow && <SendBatch macAddress={macAddress}
        LockID={LockID} />}

      {bulkbatchshow && <SendBulkBatch
        macAddress={macAddress}
        LockID={LockID} />}
      {deleteBatch && <DeleteBatch
        macAddress={macAddress}
        LockID={LockID}
      />}
    </div>
  );
}
