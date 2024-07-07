export const imgSrc = (name: string) => {
    return "/amateur-radio-training/images/" + name;
}

export const isNumber = (val: string | null | undefined) => {
    const pattern = /^-?[\d.]+(?:e-?\d+)?$/;

    if (val) {
        console.log(val, typeof val === "undefined", val === null, val?.toString().trim() === "", !pattern.test(val.toString().trim()));
    }

    if (typeof val === "undefined" || val === null || val.toString().trim() === "" || !pattern.test(val.toString().trim())) {
        return false;
    }
    return true;
};

export const shuffleArray = (array: any[]) => {
    let currentIndex = array.length;
    while (currentIndex != 0) {

        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
};