import React, { FC, useEffect, useState } from "react";
import { Link, navigate, type HeadFC, type PageProps } from "gatsby";

import * as cardStyles from "../components/Card.module.css";
import Layout, { MyHead } from "../components/Layout";
import Card from "../components/Card";
import Checkbox from "../components/Checkbox";
import Button from "../components/Button";
import { imgSrc, isNumber } from "../utils";
import type { CategoryDataType, SelectedOptionsType } from "../types";

import { CATEGORY_B, CATEGORY_C } from "../data";

type StudyCardProps = {
    data: CategoryDataType;
    onNextClick: () => void;
    className?: string;
};
const StudyCard: FC<StudyCardProps> = ({ data, onNextClick, className }) => {
    const [correctAnswer, setCorrectAnswer] = useState("");

    const buttonStyle = { maxWidth: 200, marginTop: "auto", alignSelf: "center" };

    return (
        <Card className={className}>
            <div className={cardStyles.studyTitle} style={{ display: "flex", columnGap: 10, rowGap: 20 }}>
                <strong>{data.category}</strong>
                <span style={{ borderRadius: 4, backgroundColor: "var(--bg-darker)", color: "var(--text-light)", padding: "8px 10px" }}>Ερώτηση {data.id}</span>
            </div>

            <p style={{ fontSize: 18 }}>{data.question}</p>

            {data.image &&
                <img src={imgSrc(data.image)} style={{ width: "100%", maxWidth: 400, alignSelf: "center" }} />
            }

            <ul style={{ fontSize: 18, display: "flex", flexDirection: "column", rowGap: 18 }}>
                {data.options.map((option, index) => {
                    const optionIndex = (index + 1).toString() as SelectedOptionsType;
                    const isSelected = Number(correctAnswer) === index + 1;

                    return (
                        <li
                            key={`studycard_${data.id}_option_${index}`}
                            style={{
                                display: "flex",
                                alignItems: "flex-start",
                                fontWeight: isSelected ? 700 : 400,
                            }}
                        >
                            <span>{optionIndex}.</span>
                            &nbsp;
                            <Checkbox
                                id={optionIndex}
                                label={option}
                                value={isSelected}
                            />
                        </li>
                    );
                })}
            </ul>

            <Button
                onClick={correctAnswer === ""
                    ? () => setCorrectAnswer(data.answer)
                    : onNextClick
                }
                style={buttonStyle}
            >
                {correctAnswer === ""
                    ? "Απάντηση"
                    : "Συνέχεια"
                }
            </Button>
        </Card>
    );
};

const StudyCards: FC<PageProps> = ({ location }) => {
    const params = new URLSearchParams(location.search);
    // const ctgA = params.get("ctg_a");
    const ctgB = params.get("ctg_b");
    const ctgC = params.get("ctg_c");

    console.log("--> ctgB:", isNumber(ctgB), ctgB)
    console.log("--> ctgC:", isNumber(ctgC), ctgC)
    // if (!isNumber(ctgA) || !isNumber(ctgB) || !isNumber(ctgC)) {
    if (!isNumber(ctgB) || !isNumber(ctgC)) {
        navigate("/404");
        return null;
    }

    const [data, setData] = useState<CategoryDataType[]>([]);
    const [currCardId, setCurrCardId] = useState("");
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        const _data: CategoryDataType[] = [];
        // if (Boolean(Number(ctgA)))
        //     data.concat(CATEGORY_A);
        if (Boolean(Number(ctgB)))
            _data.push.apply(_data, CATEGORY_B);
        if (Boolean(Number(ctgC)))
            _data.push.apply(_data, CATEGORY_C);

        setData(_data);
        setCurrCardId(_data[0].id);
    }, []);

    if (!data)
        return null;

    return (
        <Layout>
            {!finished
                ? data.map((cardData, index) => {
                    const isLast = index === data.length-1;

                    return (
                        <StudyCard
                            key={`studycard_${cardData.id}`}
                            className={currCardId === cardData.id ? "shown" : "hidden"}
                            data={cardData}
                            onNextClick={isLast ? () => setFinished(true) : () => setCurrCardId(data[index + 1].id)}
                        />
                    )
                })
                : (
                    <Card style={{ rowGap: 20, justifyContent: "center", alignItems: "center" }}>
                        <h1>Τέλος</h1>
                        <Link to="/">Επιστροφή</Link>
                    </Card>
                )
            }
        </Layout>
    );
};

export default StudyCards;

export const Head: HeadFC = () => <MyHead page="/study" title="Εξάσκηση" noIndex={true} />;
