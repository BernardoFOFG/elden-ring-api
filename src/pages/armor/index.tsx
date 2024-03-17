/* eslint-disable react-hooks/exhaustive-deps */
import { Pagination } from "@/components/Pagination";
import axios from "axios";
import { useEffect, useState } from "react";
import { ArmorDialog } from "./dialog";

export interface ArmorProps {
  id: string;
  name: string;
  image: string;
  description: string;
  category: string;
  weight: number;
  dmgNegation: DamageNegationProps[];
  resistance: ResistanceProps[];
}

interface DamageNegationProps {
  name: string;
  amount: number;
}

interface ResistanceProps {
  name: string;
  amount: number;
}

export const Armor = () => {
  const [data, setData] = useState<ArmorProps[]>([]);
  const [count, setCount] = useState(16);
  const [page, setPage] = useState(0);

  const getData = async () => {
    try {
      const response = await axios.get(`
      https://eldenring.fanapis.com/api/armors?limit=16&page=${page}
      `);

      setData(response.data.data);
      setCount(response.data.count);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [page]);
  return (
    <div>
      Armor
      <div className="flex overflow-y-auto max-h-[calc(100vh-8rem)] min-h-[calc(100vh-8rem)] p-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
          {data.map((value) => (
            <ArmorDialog data={value.id}>
              <div className="flex flex-col justify-center items-center gap-2">
                <img src={value.image} className="size-32" title={value.name} />
                <p className="font-semibold">{value.name}</p>
              </div>
            </ArmorDialog>
          ))}
        </div>
      </div>
      <Pagination
        itemsPerPage={16}
        page={page}
        setPage={setPage}
        totalCount={count}
      />
    </div>
  );
};
