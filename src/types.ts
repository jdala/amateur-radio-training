export type SelectedOptionsType = "1" | "2" | "3" | "4";

export type UnitDataType = {
    id: string;
    unit: string;
    question: string;
    image?: string;
    options: string[];
    answer: string;
};