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
    // unitA: boolean;
    unitB: boolean;
    unitC: boolean;
    initId: string;
};

const StudyForm: FC  = () => {
    const [url, setUrl] = useState("/study");
    const [isDisabled, setIsDisabled] = useState(false);

    const { current: initFields} = useRef<StudyFormFields>({
        // unitA: true,
        unitB: true,
        unitC: true,
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
        // const { unitA, unitB, unitC, initId } = formFields;
        const { unitB, unitC, initId } = formFields;

        // if (!unitA && !unitB && !unitC) {
        if (!unitB && !unitC) {
            setIsDisabled(true);
            setUrl("#");
        } else {
            setIsDisabled(false);
            // setUrl(`/study?unit_a=${Number(unitA)}&unit_b=${Number(unitB)}&unit_c=${Number(unitC)&init_id=${Number(initId)}`)
            setUrl(`/study?unit_b=${Number(unitB)}&unit_c=${Number(unitC)}&init_id=${Number(initId)}`)
        }

    }, [formFields]);

    return (
        <FormCard title="Εξάσκηση">
            <label>Επέλεξε κεφάλαια ερωτήσεων</label>
            {/* <Checkbox
                id="unitA"
                fields={formFields}
                onChange={handleCheckboxChange}
                label="Κεφάλαιο Α"
            /> */}
            <Checkbox
                id="unitB"
                fields={formFields}
                onChange={handleCheckboxChange}
                label="Κεφάλαιο Β"
            />
            <Checkbox
                id="unitC"
                fields={formFields}
                onChange={handleCheckboxChange}
                label="Κεφάλαιο Γ"
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
    // unitA: string;
    unitB: string;
    unitC: string;
    totalFailures: string;
};

const TestForm: FC  = () => {
    const [url, setUrl] = useState("/test");
    const [isDisabled, setIsDisabled] = useState(false);

    const { current: initFields} = useRef<TestFormFields>({
        // unitA: "50",
        unitB: "30",
        unitC: "20",
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
        // const { unitA, unitB, unitC, totalFailures } = formFields;
        const { unitB, unitC, totalFailures } = formFields;

        // if (unitA === "0" && unitB === "0" && unitC === "0") {
        if (unitB === "0" && unitC === "0") {
            setIsDisabled(true);
            setUrl("#");
        } else {
            setIsDisabled(false);
            // setUrl(`/test?unit_a=${unitA}&unit_b=${unitB}&unit_c=${unitC}&total_f=${totalFailures}`)
            setUrl(`/test?unit_b=${unitB}&unit_c=${unitC}&total_f=${totalFailures}`)
        }

    }, [formFields]);

    return (
        <FormCard title="Εξέταση">
            {/* <Input
                id="unitA"
                fields={formFields}
                onChange={handleTextChange}
                label="Ερωτήσεις από το κεφάλαιο Α"
            /> */}
            <Input
                id="unitB"
                fields={formFields}
                onChange={handleTextChange}
                label="Ερωτήσεις από το κεφάλαιο Β (0-123)"
            />
            <Input
                id="unitC"
                fields={formFields}
                onChange={handleTextChange}
                label="Ερωτήσεις από το κεφάλαιο Γ (0-58)"
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
