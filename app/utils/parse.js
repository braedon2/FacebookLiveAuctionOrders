
export const parseOrders = (rawCommentString, designType) => {
    const lines = rawCommentString.split("\n");
    const regex = new RegExp("sold", "i");
    const orders = {};

    for (const [i, line] of lines.entries()) {
        if (line.search(regex) !== -1) {
            const name = lines[i - 2];
            if (!orders[name]) {
                orders[name] = [line];
            }
            else {
                orders[name].push(line);
            }
        }
    }
    return orders;
};

export const parseProfileLinks = (rawCommentHtmlFragmentString) => {

};