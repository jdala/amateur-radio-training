export type SelectedOptionsType = "1" | "2" | "3" | "4";

export type CategoryDataType = {
    id: string;
    category: string;
    question: string;
    image?: string;
    options: string[];
    answer: string;
};