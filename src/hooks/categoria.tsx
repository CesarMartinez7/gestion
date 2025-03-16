import React, { useState, useRef } from "react";
import { Response } from "../types/response";
import { Data } from "../types/response";

type CategoriaHooksReturn = [
  Response | undefined,
  React.Dispatch<React.SetStateAction<Response | undefined>>,
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
  Data | null,
  React.Dispatch<React.SetStateAction<Data | null>>,
  React.RefObject<HTMLInputElement | null > ,
  React.RefObject<HTMLInputElement | null>,
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>
];

export default function CategoriaHooks(): CategoriaHooksReturn {
  const [data, setData] = useState<Response>();
  const [isChangeSubmit, setIsChangeSubmit] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<Data | null>(null);
  const inputRefDescripcion = useRef<HTMLInputElement | null>(null);
  const inputRefNombre = useRef<HTMLInputElement | null>(null);
  const [isBig,setIsBig] = useState<boolean>(false)

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
    isBig,
    setIsBig
  ];
}
