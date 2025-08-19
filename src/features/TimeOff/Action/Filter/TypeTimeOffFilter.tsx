"use client";
import SelectPromise from "@/features/task/Form/SelectPromise";
import React from "react";
type TypeTimeOff = {
  _id: string;
  name: string;
  Maxduration: number;
};
interface TypeTimeOffFilter {
  typeTimeOff: string | null;
  onChange: (vals: string | null) => void;
  loading: boolean;
  data: Array<TypeTimeOff>;
}
export default function TypeTimeOffFilter({
  typeTimeOff,
  onChange,
  loading,
  data,
}: TypeTimeOffFilter) {
  return (
    <div className="w-full">
      <h1 className="mb-1">Type de congé</h1>
      <SelectPromise
        data={data}
        placeholder="Sélectionner le type congé"
        value={typeTimeOff}
        onChange={(vals) => onChange(vals)}
        loading={loading}
        searchPlaceholder="Recherche ...."
      />
    </div>
  );
}
