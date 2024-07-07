import React, { FC, useCallback, useEffect, useState } from "react";
import { Link, navigate, type HeadFC, type PageProps } from "gatsby";
import { FaAngleDown, FaAngleLeft, FaAngleRight, FaAngleUp } from "react-icons/fa6";

import Layout, { MyHead } from "../components/Layout";
import Card from "../components/Card";
import Checkbox from "../components/Checkbox";
import Button from "../components/Button";
import { imgSrc, isNumber, shuffleArray } from "../utils";
import type { CategoryDataType, SelectedOptionsType } from "../types";

import { CATEGORY_B, CATEGORY_C } from "../data";

type AnswersType = Omit<CategoryDataType, "answer" | "category"> & {
    questionIndex: string;
    correctAnswer: string;
    myAnswer: string;
};

type ResultsType = {
    passed: boolean;
    failCount: number;
    correctCount: number;
    totalCount: number;
    mistakesData: AnswersType[];
};

type TestCardProps = {
    data: CategoryDataType;
    selectedAnswer?: SelectedOptionsType;
    qestionIndex: number;
    onAnswerClick: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onPrevClick?: () => void;
    onNextClick?: () => void;
    onFinish?: () => void;
    className?: string;
};
const TestCard: FC<TestCardProps> = ({
    data,
    selectedAnswer,
    qestionIndex,
    onAnswerClick,
    onPrevClick,
    onNextClick,
    onFinish,
    className
}) => {
    return (
        <Card className={className}>
            <Button
                onClick={() => {
                    if (confirm("Είστε σίγουροι πως θέλετε να υποβάλετε τις απαντήσεις σας;"))
                        onFinish?.();
                }}
                style={{
                    maxWidth: 160,
                    alignSelf: "flex-end",
                    marginBottom: 10
                }}
            >
                Τελική Υποβολή
            </Button>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{ display: "flex", columnGap: 10 }}>
                    <Button
                        onClick={onPrevClick}
                        isDisabled={!onPrevClick}
                        style={{ padding: 10 }}
                    >
                        <FaAngleLeft style={{ fontSize: 20 }} />
                    </Button>

                    <strong style={{ fontSize: 18, minWidth: 200, textAlign: "center", alignSelf: "center" }}>
                        Ερώτηση {qestionIndex}
                    </strong>

                    <Button
                        onClick={onNextClick}
                        isDisabled={!onNextClick}
                        style={{ padding: 10 }}
                    >
                        <FaAngleRight style={{ fontSize: 20 }} />
                    </Button>
                </div>
            </div>

            <p style={{ fontSize: 18 }}>{data.question}</p>

            {data.image &&
                <img src={imgSrc(data.image)} style={{ width: "100%", maxWidth: 400, alignSelf: "center" }} />
            }

            <ul style={{ fontSize: 18, display: "flex", flexDirection: "column", rowGap: 18 }}>
                {data.options.map((option, index) => {
                    const optionIndex = (index + 1).toString() as SelectedOptionsType;

                    return (
                        <li
                            key={`question_${data.id}_option_${index}`}
                            style={{
                                display: "flex",
                                alignItems: "flex-start",
                            }}
                        >
                            <span>{optionIndex}.</span>
                            &nbsp;
                            <Checkbox
                                id={optionIndex}
                                value={selectedAnswer === optionIndex}
                                label={option}
                                onChange={onAnswerClick}
                            />
                        </li>
                    );
                })}
            </ul>
        </Card>
    );
};

const MistakesSection: FC<{ data: AnswersType[] }> = ({ data }) => {
    const [openMistakes, setOpenMistakes] = useState<string[]>([]);

    const handleMistakeClick = (id: string) => {
        setOpenMistakes((prevState) => {
            const _state = [...prevState];
            const idIndex = _state.indexOf(id);

            idIndex > -1
                ? _state.splice(idIndex, 1)
                : _state.push(id)

            return _state;
        });
    };

    return (
        <section style={{ width: "100%", maxWidth: 600, margin: "10px auto 0px" }}>
            <h3 style={{ marginBottom: 20 }}>Λάθη</h3>

            {data.map((mistake) => {
                const isOpen = openMistakes.includes(mistake.id);

                return (
                    <div key={mistake.id} style={{ marginBottom: 20 }}>
                        <div
                            onClick={() => handleMistakeClick(mistake.id)}
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap: 10,
                                color: "var(--red)",
                                cursor: "pointer",
                                borderBottom: "1px solid var(--red)",
                                paddingBottom: 10,
                            }}
                        >
                            <span style={{ fontSize: 18, flex: 1 }}>Ερώτηση {mistake.questionIndex}</span>
                            {isOpen
                                ? <FaAngleUp style={{ fontSize: 18 }} />
                                : <FaAngleDown style={{ fontSize: 18 }} />
                            }
                        </div>

                        <div style={{
                            height: "auto",
                            overflow: "hidden",
                            ...isOpen
                                ? {
                                    maxHeight: 9999,
                                    transition: "max-height 0.2s cubic-bezier(1, 0, 1, 0)",
                                }
                                : {
                                    maxHeight: 0,
                                    transition: "max-height 0.25s cubic-bezier(0, 1, 0, 1)",
                                },
                        }}>
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                rowGap: 30,
                                marginTop: 10,
                                padding: 10,
                                border: "1px solid var(--red)",
                                borderRadius: 8,
                            }}>
                                <p style={{ fontSize: 18 }}>{mistake.question}</p>

                                {mistake.image &&
                                    <img src={imgSrc(mistake.image)} style={{ width: "100%", maxWidth: 400, alignSelf: "center" }} />
                                }

                                <ul style={{ fontSize: 18, display: "flex", flexDirection: "column", rowGap: 18 }}>
                                    {mistake.options?.map((option, index) => {
                                        const optionIndex = (index + 1).toString() as SelectedOptionsType;

                                        return (
                                            <li
                                                key={`question_${mistake.id}_option_${index}`}
                                                style={{
                                                    display: "flex",
                                                    alignItems: "flex-start",
                                                    color: optionIndex === mistake.myAnswer ? "var(--red)" : (optionIndex === mistake.correctAnswer ? "var(--green)" : "inherit"),
                                                    fontWeight: optionIndex === mistake.correctAnswer ? 700 : 400
                                                }}
                                            >
                                                <span>{optionIndex}. {option}</span>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                );
            })}
        </section>
    );
};

const Test: FC<PageProps> = ({ location }) => {
    const [data, setData] = useState<CategoryDataType[]>([]);
    const [answers, setAnswers] = useState<AnswersType[]>([]);
    const [results, setResults] = useState<ResultsType>();
    const [currCardId, setCurrCardId] = useState("");
    const [finished, setFinished] = useState(false);
    const [totalFailures, setTotalFailures] = useState<string | null | undefined>();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        // const ctgA = params?.get("ctg_a");
        const ctgB = params?.get("ctg_b");
        const ctgC = params?.get("ctg_c");
        const totalF = params?.get("total_f");

        // if (!isNumber(ctgA) || !isNumber(ctgB) || !isNumber(ctgC) || !isNumber(totalF)) {
        if (!isNumber(ctgB) || !isNumber(ctgC) || !isNumber(totalF)) {
            navigate("/404");
        }

        setTotalFailures(totalF);

        shuffleArray(CATEGORY_B);
        shuffleArray(CATEGORY_C);

        const _data: CategoryDataType[] = [];
        // if (ctgA)
        //     data.push.apply(data, CATEGORY_A.slice(0, Number(ctgA)));
        if (ctgB)
            _data.push.apply(_data, CATEGORY_B.slice(0, Number(ctgB)));
        if (ctgC)
            _data.push.apply(_data, CATEGORY_C.slice(0, Number(ctgC)));

        setData(_data);
        setAnswers(_data.map((q, index) => ({
            id: q.id,
            questionIndex: (index + 1).toString(),
            question: q.question,
            image: q.image,
            options: q.options,
            correctAnswer: q.answer,
            myAnswer: "",
        })));
        setCurrCardId(_data[0].id);
    }, []);

    const calcResults: (_: AnswersType[]) => void = useCallback((data) => {
        const mistakesData: AnswersType[] = [];

        data.forEach((question) => {
            if (question.myAnswer !== question.correctAnswer) {
                mistakesData.push(question);
            }
        })

        const totalCount = data.length
        const failCount = mistakesData.length;
        const correctCount = totalCount - failCount;

        setResults({
            passed: failCount < Number(totalFailures),
            totalCount,
            failCount,
            correctCount,
            mistakesData
        });
        setFinished(true);
    }, []);

    if (!data)
        return null;

    return (
        <Layout>
            {!finished
                ? data.map((cardData, index) => {
                    const isFirst = index === 0;
                    const isLast = index === data.length-1;

                    return (
                        <TestCard
                            key={`testcard_${cardData.id}`}
                            className={currCardId === cardData.id ? "shown" : "hidden"}
                            data={cardData}
                            selectedAnswer={answers[index].myAnswer as SelectedOptionsType}
                            qestionIndex={index + 1}
                            onAnswerClick={(e) => { setAnswers((prevState) => {
                                const res = [...prevState];
                                res[index] = { ...res[index], myAnswer: e.target.id }
                                return res
                            }) }}
                            onPrevClick={isFirst ? undefined : () => setCurrCardId(data[index - 1].id)}
                            onNextClick={isLast ? undefined : () => setCurrCardId(data[index + 1].id)}
                            onFinish={() => calcResults(answers)}
                        />
                    )
                })
                : results
                    ? (
                        <Card style={{ rowGap: 20, justifyContent: "center", alignItems: "center" }}>
                            <h1 style={{ color: results?.passed ? "var(--green)" : "var(--red)" }}>
                                {results.passed ? "Συγχαρητήρια !" : "Προσπάθησε ξανά"}
                            </h1>
                            <strong style={{ fontSize: 18 }}>
                                Αποτελέσματα: {results.correctCount} / {results.totalCount}
                            </strong>

                            <Link to="/">Επιστροφή</Link>

                            <MistakesSection
                                data={results.mistakesData}
                            />
                        </Card>
                    )
                    : null
            }
        </Layout>
    );
};

export default Test;

export const Head: HeadFC = () => <MyHead page="/test" title="Εξέταση" noIndex={true} />;
