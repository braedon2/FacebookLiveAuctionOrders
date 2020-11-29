
export const parseOrders = (rawCommentString, designType) => {
    const lines = rawCommentString.split("\n");
    const regex = new RegExp("sold", "i");
    const orders = {};

    /*
    handles the edge case:
    Leah Snyder
    · 36:27
    Sold one sun/moon $15
    Sold one unicorn $10 

    given the index of a line containing "sold" return the associated name
    */
    const getNameAboveLine = (lineIndex) => {
        // starting from lineIndex, work up the the index of the line containing 
        // the associated name
        let nameIndex = lineIndex;
        // search for the line containing the timestamp. The line with the name
        // is just above it
        while (lines[nameIndex].search("· ") === -1) {
            nameIndex = nameIndex - 1;
        }
        // index is at the line containing the timestamp so moving it up one more
        // time gives the name
        nameIndex = nameIndex - 1;
        return lines[nameIndex];
    }

    for (const [i, line] of lines.entries()) {
        if (line.search(regex) !== -1) {
            const name = getNameAboveLine(i);
            const order = line.replace(regex, "").trim();

            if(name === undefined || name === "") {
                orders.warning = `could not associate name with order: "${order}"`;
            }
            if (!orders[name]) {
                orders[name] = [order];
            }
            else {
                orders[name].push(order);
            }
        }
    }
    return orders;
};

export const parseProfileLinks = (rawCommentHtmlFragmentString) => {

};