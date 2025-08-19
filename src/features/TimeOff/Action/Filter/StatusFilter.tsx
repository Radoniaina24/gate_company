import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
interface StatusProps {
  status: string;
  onChange: (value: string) => void;
}
export default function StatusFilter({ status, onChange }: StatusProps) {
  function handleChange(value: string) {
    onChange(value);
  }
  return (
    <div>
      <h1 className="mb-1">Status</h1>
      <Select value={status} onValueChange={(value) => handleChange(value)}>
        <SelectTrigger className="w-full py-5.5 rounded-xl focus:border-blue-500 focus:outline-none  border-blue-500">
          <SelectValue placeholder="Selectionner un status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value={"tout"}>Tout</SelectItem>
            <SelectItem value="pending">En attente</SelectItem>
            <SelectItem value="rejected">Refusé</SelectItem>
            <SelectItem value="approved">Approuvé</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
