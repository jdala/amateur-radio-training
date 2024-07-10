import React, { FC, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { navigate, type HeadFC, type PageProps } from "gatsby";

import Layout, { MyHead } from "../components/Layout";
import Card from "../components/Card";
import Input from "../components/Input";
import Checkbox from "../components/Checkbox";
import Button from "../components/Button";

const FormCard: FC<{ title: string; children: ReactNode }> = ({ title, children }) => {
    return (
        <Card style={{ maxWidth: 500, rowGap: 10, minHeight: "auto" }}>
            <h2 style={{ fontSize: 26, textAlign: "center", marginBottom: 20 }}>
                {title}
            </h2>
            {children}
        </Card>
    );
};

type StudyFormFields = {
    // categoryA: boolean;
    categoryB: boolean;
    categoryC: boolean;
    initId: string;
};

const StudyForm: FC  = () => {
    const [url, setUrl] = useState("/study");
    const [isDisabled, setIsDisabled] = useState(false);

    const { current: initFields} = useRef<StudyFormFields>({
        // categoryA: true,
        categoryB: true,
        categoryC: true,
        initId: "",
    })

    const [formFields, setFormFields] = useState<StudyFormFields>(initFields);

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormFields((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.checked
        }))
    };

    const handleTextChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setFormFields((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value.replace(/\D/g,"").replace(/^0+(\d)/gm, "$1")
        }))
    }, []);

    useEffect(() => {
        // const { categoryA, categoryB, categoryC, initId } = formFields;
        const { categoryB, categoryC, initId } = formFields;

        // if (!categoryA && !categoryB && !categoryC) {
        if (!categoryB && !categoryC) {
            setIsDisabled(true);
            setUrl("#");
        } else {
            setIsDisabled(false);
            // setUrl(`/study?ctg_a=${Number(categoryA)}&ctg_b=${Number(categoryB)}&ctg_c=${Number(categoryC)&init_id=${Number(initId)}`)
            setUrl(`/study?ctg_b=${Number(categoryB)}&ctg_c=${Number(categoryC)}&init_id=${Number(initId)}`)
        }

    }, [formFields]);

    return (
        <FormCard title="Εξάσκηση">
            <label>Επέλεξε κατηγορίες ερωτήσεων</label>
            {/* <Checkbox
                id="categoryA"
                fields={formFields}
                onChange={handleCheckboxChange}
                label="Κατηγορία Α"
            /> */}
            <Checkbox
                id="categoryB"
                fields={formFields}
                onChange={handleCheckboxChange}
                label="Κατηγορία Β"
            />
            <Checkbox
                id="categoryC"
                fields={formFields}
                onChange={handleCheckboxChange}
                label="Κατηγορία Γ"
            />

            <Input
                id="initId"
                fields={formFields}
                onChange={handleTextChange}
                label="Αριθμός πρώτης ερώτησης"
                containerStyle={{ marginTop: 7 }}
            />

            <Button isDisabled={isDisabled} onClick={() => navigate(url)} style={{ marginTop: 15 }}>
                Ξεκίνα
            </Button>
        </FormCard>
    )
};

type TestFormFields = {
    // categoryA: string;
    categoryB: string;
    categoryC: string;
    totalFailures: string;
};

const TestForm: FC  = () => {
    const [url, setUrl] = useState("/test");
    const [isDisabled, setIsDisabled] = useState(false);

    const { current: initFields} = useRef<TestFormFields>({
        // categoryA: "50",
        categoryB: "30",
        categoryC: "20",
        totalFailures: "20",
    });

    const [formFields, setFormFields] = useState<TestFormFields>(initFields);

    const handleTextChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setFormFields((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value ? e.target.value.replace(/\D/g,"").replace(/^0+(\d)/gm, "$1") : "0"
        }))
    }, []);

    useEffect(() => {
        // const { categoryA, categoryB, categoryC, totalFailures } = formFields;
        const { categoryB, categoryC, totalFailures } = formFields;

        // if (categoryA === "0" && categoryB === "0" && categoryC === "0") {
        if (categoryB === "0" && categoryC === "0") {
            setIsDisabled(true);
            setUrl("#");
        } else {
            setIsDisabled(false);
            // setUrl(`/test?ctg_a=${categoryA}&ctg_b=${categoryB}&ctg_c=${categoryC}&total_f=${totalFailures}`)
            setUrl(`/test?ctg_b=${categoryB}&ctg_c=${categoryC}&total_f=${totalFailures}`)
        }

    }, [formFields]);

    return (
        <FormCard title="Εξέταση">
            {/* <Input
                id="categoryA"
                fields={formFields}
                onChange={handleTextChange}
                label="Ερωτήσεις από την κατηγορία Α"
            /> */}
            <Input
                id="categoryB"
                fields={formFields}
                onChange={handleTextChange}
                label="Ερωτήσεις από την κατηγορία Β (0-123)"
            />
            <Input
                id="categoryC"
                fields={formFields}
                onChange={handleTextChange}
                label="Ερωτήσεις από την κατηγορία Γ (0-58)"
            />
            <Input
                id="totalFailures"
                fields={formFields}
                onChange={handleTextChange}
                label="Αποδεκτά λάθη"
            />

            <Button isDisabled={isDisabled} onClick={() => navigate(url)} style={{ marginTop: 15 }}>
                Ξεκίνα
            </Button>
        </FormCard>
    )
};

const Home: FC<PageProps> = () => {
    return (
        <Layout mainStyle={{
            display: "flex",
            flexDirection: "column",
            rowGap: 20,
        }}>
            <StudyForm />
            <TestForm />
        </Layout>
    );
};

export default Home;

export const Head: HeadFC = () => <MyHead page="/" title="Αρχική" />;
