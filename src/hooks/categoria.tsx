import React, { useState, useRef, Dispatch } from "react";
import { Response } from "../types/response";
import { Data } from "../types/response";


interface RetornoProps {
  data: Data
  setData: React.SetStateAction<Dispatch<Data>>
}

export default function CategoriaHooks() {
  const [data, setData] = useState<Response>();
  const [isChangeSubmit, setIsChangeSubmit] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<Data | null>(null);
  const inputRefDescripcion = useRef<HTMLInputElement>(null);
  const inputRefNombre = useRef<HTMLInputElement>(null);
  return [
    data,
    setData,
    isChangeSubmit,
    setIsChangeSubmit,
    isModalOpen,
    setIsModalOpen,
    selectedCategory,
    setSelectedCategory,
    inputRefDescripcion,
    inputRefNombre,
  ];
}
