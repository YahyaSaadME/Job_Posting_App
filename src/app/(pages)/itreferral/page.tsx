"use client";
import React, { useState } from "react";

export default function page() {
  const [id, setid] = useState<string>("");
  const [search, setsearch] = useState<string>("");

  return (
    <div>
      <div className="flex">
        <div className="w-1/2">
          <input
            type="text"
            value={search}
            onChange={(e) => setsearch(e.target.value)}
            placeholder="Search by title or company..."
            className="w-full p-2 border rounded shadow-md mb-4"
          />
        </div>
        <div className="w-1/2"></div>
      </div>
    </div>
  );
}
