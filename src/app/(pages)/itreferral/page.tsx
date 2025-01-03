"use client";
import React, { useEffect, useState } from "react";

export default function page() {
  const [id, setid] = useState<string>("uyghj");
  const [search, setsearch] = useState<string>("");

  const handleSearch = async() => {
        try {
            const req = await fetch(`/api/itreferral?id=${id}`);
            const res = await req.json();
            console.log(res);
            
        } catch (error) {
            console.log(error);
            
        }
  }
  useEffect(() => {
    handleSearch();
  }, [search]);
  
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
